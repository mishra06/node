const express = require('express');

const fs =  require('fs');

const PORT = 4000;

const srver = express();


Server.get("/product",(request,response)=>{
    const PATH = "daa/products.json";
    let data = fs.readFileSync(PATH, {encoding: 'utf-8'});
    data = JSON.parse(data);

    response.status(200).json(data);
})

Server.post("/product",(request,response)=>{
    let {name,price} = request.param
    const PATH = "data/products.json";
    let data = fs.readFileSync(PATH,{encoding:'utf-8'});
    data=JSON.parse(data);
    data.push({
        "name":name,
        "price":price
    })

    fs.writeFileSync(PATH,JSON.stringify(data));
    response.status(201).json({
        message: "product succesfully created";
    })
})
Server.listen(PORT,()=>{
    console.log("server is running on port"+PORT)
})