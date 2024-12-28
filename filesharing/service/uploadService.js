const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadDiectoryPath = path.join(__dirname, "..", "files");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDiectoryPath);
    },
    filename:(req,file,cb)=>{
      console.log(file.originalname);  // using file.originalnamewe can get file name
      const fileName = uuidv4() + path.extname(file.originalname);  // uploading file name diyamically using "uuidv4()" npm package , we can use this method because when we use simple file,originalname then if user uplode same same filename then its overrigted . 
      cb(null,fileName);
  },
  });

  const upload = multer({
    storage: storage,
  })

  module.exports = upload;