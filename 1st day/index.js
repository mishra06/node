const http = require("http");
const fs = require('fs');
// const { log } = require("console");
var path = require("path");
const PORT = 4000;
const {findMissingNumber} = require("mishra-array-missing-number");
const DATA_PATH =path.join ("data","prod.json");
// console.log(DATA_PATH);

console.log(findMissingNumber([1,2,3,4,6]))

// function handleServer(request, response) {
//     console.log(request.url, "URL");
//     console.log(request.method, "METHOD");

//     if (request.url === "/product" && request.method === "GET") {
//         // console.log(request);
//             const DATA_PATH = "data/prod.json";
//             const data = JSON.parse(fs.readFileSync(DATA_PATH, { encoding: 'utf-8' }));
//             response.writeHead(200, { "content-type": "application/json" });
//             response.end(JSON.stringify(data));
//         }
// }

// const server = http.createServer(handleServer);

// server.listen(PORT, () => {
//     console.log("Server is running at port " + PORT);
// });