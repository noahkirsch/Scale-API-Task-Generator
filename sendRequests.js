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
