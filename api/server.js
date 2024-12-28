const http = require('http');
const PORT = 4000;
const fs = require("fs");

const server = http.createServer((request,response)=>{
    if(request.url ==="/greet" && request.method==="GET"){
        response.writeHead(200, {'context-type':'application/json'})
        const data = {

            message: "Hello WORLD"

        }
        response.end(JSON.stringify(data));
    }
    else if(request.url.includes("/greet") && request.method==="POST"){
        const url = request.url;
        const name = url.split("=")[1]
        response.writeHead(200,{'context-type':'application/json'})
        const newName = {
            message:'hello '+ name.toUpperCase()
        }
        response.end(JSON.stringify(newName))
    }
    else if(request.url==="/product" && request.method==="GET"){
         const PATH =  "data/product.json";

         let data = fs.readFileSync(PATH,{encoded:'utf-8'});

         data = JSON.parse(data);
         response.writeHead(200,{'context-type':'application/json'})
         response.end(JSON.stringify(data));
         console.log(data);
    }

    else if(request.url.includes("/product") && request.method==="POST"){
        let name ;
        let price ;
        request.url.split("?")[1].split("&").forEach((ele)=>{
            const key = ele.split("=")[0]
            const value = ele.split("=")[1]
            if(key==="name"){
                name = value
            }
            else if(key==="price"){
                price = value
            }
        })

        // read the data

        const PATH = "data/product.json";
        let data = fs.readFileSync(PATH,{encoding:"utf-8"});
        data = JSON.parse(data);

        // update the product.json with recived product

        data.push({
            "name": name,
            "price": price
        })

        fs.writeFileSync(PATH, JSON.stringify(data))

        // close the process

        response.writeHead(201,{'content-type':'application/json'});
        response.end(JSON.stringify({
            message: "Product added successfully"
        }));

    }
    
    else{
        response.writeHead(404, {'context-type':'application/json'})
        const data = {

            message: "Page not found"

        }
        response.end(JSON.stringify(data));
    }
})

server.listen(4000,()=>{
    console.log("server running on port: " +PORT);
});