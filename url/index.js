import express from 'express';
import {nanoid} from "nanoid";
import fs from 'fs';

const app = express();
const PORT = 4000;
app.use(express.json());
import path from "node:path";
import { fileURLToPath } from "node:url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

const isUrlValid =(url)=>{
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
};


app.post('/url',(req,res)=>{
    if(!isUrlValid(req.body.url)){

        return res.status(400).json({
            success: false,
            message: "Invalid URL",
        });
    }
    const Original_url = req.body.url;
    const short_url = nanoid(8);

    const urlFileData = fs.readFileSync("urlMap.json",{encoding: 'utf-8'});
    const fileData = JSON.parse(urlFileData);
    fileData[short_url]=req.body.url;
    fs.writeFileSync('urlMap.json', JSON.stringify(fileData));
    
   res.json({
        success:true,
        data:`http://localhost:4000/${short_url}`,
   })
})

app.get('/:short_url',(req,res)=>{
    const urlFileData = fs.readFileSync("urlMap.json",{encoding: 'utf-8'});
    const fileDataJson = JSON.parse(urlFileData);
    const short_url = req.params.short_url;
    const longUrl = fileDataJson[short_url];
    res.redirect(longUrl);

})


app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`);
})

// import express from 'express';
// import mongoose from 'mongoose';
// import { nanoid } from 'nanoid';

// const app = express();
// const PORT = 4000;

// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/shortUrls', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch(err => {
//   console.error('MongoDB connection error:', err);
// });

// // Create a URL schema
// const urlSchema = new mongoose.Schema({
//   originalUrl: { type: String, required: true },
//   shortUrl: { type: String, required: true, unique: true },
// });

// const Url = mongoose.model('Url', urlSchema);

// // POST route to create a short URL
// app.post('/url', async (req, res) => {
//   try {
//     const originalUrl = req.body.url;
//     const shortUrl = nanoid(8);

//     // Save the URL to MongoDB
//     const url = new Url({ originalUrl, shortUrl });
//     await url.save();

//     res.json({
//       success: true,
//       data: `http://localhost:4000/${shortUrl}`,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // GET route to redirect using the short URL
// app.get('/:short_url', async (req, res) => {
//   try {
//     const shortUrl = req.params.short_url;

//     // Find the original URL from MongoDB
//     const url = await Url.findOne({ shortUrl });

//     if (url) {
//       res.redirect(url.originalUrl);
//     } else {
//       res.status(404).json({ success: false, message: 'URL not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

