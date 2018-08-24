const scaleapi = require('scaleapi');

const client = scaleapi.ScaleClient('ADD_API_KEY');
const filePath = './interview1.csv';
let requests = [];
let csvData = [];

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(filePath)
});

lineReader.on('line', (line) => {
  // Splits csv row into each seperate data point, handling commas within double quotes
  csvData.push(line.match(/(".*?"|[^\s",][^",]+[^\s",])(?=\s*,|\s*$)/g));
});

lineReader.on('close', () => {
  parseData(csvData);
  makeRequests(requests);
});

let parseData = (data) => {
  for (let i = 1; i < data.length; i++) {
    //  Test to see if data row is incomplete
    if (data[i].length === data[0].length) {
      let newEntry = {};

      data[0].forEach((item, index) => {
        // Remove double quotes from the string of objects to annotate
        if (index === 3) {
          let cleanString = data[i][index].replace(/"/g, '');
          newEntry[item] = cleanString;
        } else {
          newEntry[item] = data[i][index];
        }
      });
      requests.push(newEntry);
    }
  }
};

let makeRequests = (requests) => {
  requests.forEach((requestData) => {
    let instructions = requestData.instruction;
    let objects = requestData.objects_to_annotate.split(',');

    //  Formats instructions to include markdown formatting around objects to format
    objects.forEach((word) => {
      instructions = instructions.replace(word, '**' + word + '**');
    });

    client.createAnnotationTask({
      'callback_url': requestData.callback_url,
      'instruction': instructions,
      'attachment_type': requestData.attachment_type,
      'attachment': requestData.attachment,
      'objects_to_annotate': requestData.objects_to_annotate.split(','),
      'with_labels': requestData.with_labels === 'TRUE',
      'min_width': '30',
      'min_height': '30',
    }, (err, task) => {
      if (err) throw err;
      console.log(task);
    });
  });
};
