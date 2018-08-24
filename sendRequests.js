var scaleapi = require('scaleapi');
var client = scaleapi.ScaleClient('ADD_API_KEY');
const filePath = './interview1.csv';

var requests = [];
var csvData = [];

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(filePath)
});

lineReader.on('line', (line) => {
	//Splits csv row into each seperate data points, handling commas within double quotes
  csvData.push(line.match(/(".*?"|[^\s",][^",]+[^\s",])(?=\s*,|\s*$)/g));
});

lineReader.on('close', () => {
	parseData(csvData);
});

let parseData = (csvData) => {
	for (let i = 1; i < csvData.length; i++) {
		//Rest to see if data row is incomplete
		if (csvData[i].length !== csvData[0].length) {
			continue;
		} else {
			var newEntry = {};

			csvData[0].forEach((item, index) => {
				//Remove double quotes from the string of objects to annotate
				if (index === 3) {
					let cleanString = csvData[i][index].replace(/"/g, '');
					newEntry[item] = cleanString;
				} else {
					newEntry[item] = csvData[i][index];
				}
			});
			requests.push(newEntry);
		}
	}
};