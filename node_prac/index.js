const express = require("express");
const server = express();
server.use(express.json());

server.use(express());




server.post("/api/orders",(req,res)=>{

    const {orderId,quantity} = req.body;

    console.log(req.body);

    const order = {
        orderId,
        quantity
    }


    const array = [];
    
    array.push(order);
    return res.status(200).json({
        success:true,
        data:order
        
    })
});
server.listen(4000,()=>{
    console.log("server is running on port 4000");
})