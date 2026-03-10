const fs = require('fs');
const pdf = require('pdf-parse');

let path = process.argv[2];
let dataBuffer = fs.readFileSync(path);

pdf(dataBuffer).then(function (data) {
    console.log(data.text);
}).catch(function (error) {
    console.error("Error reading PDF: ", error);
});
