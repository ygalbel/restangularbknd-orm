var bowerJson = require('bower-json');


if (process.argv.length <= 2){
	console.log("Usage: node check_ngback_bower /path/to/bower.json");
	process.exit(1);
}

var bowerFileName = process.argv[2];

// Can also be used by simply calling bowerJson()
bowerJson.read(bowerFileName, function (err, json) {
    if (err) {
        console.error('There was an error reading the file');
        console.error(err.message);
        return;
    }

    console.log('JSON: ', json);
});