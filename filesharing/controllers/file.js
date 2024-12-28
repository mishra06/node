
const fileupload = require("../service/uploadService");
const FileModel = require("../models/file");
const transporter = require("../service/mailService");
const dotenv = require("dotenv");

dotenv.config();


const uploadFile = async (req, res) => {

  const upload = fileupload.single("file");
  upload(req, res, async(err) => {
    if (err) {
      console.log("Error while uploading file", err);
      return res.status(500).json({
        success: false,
        message: "Error uploading file",
        error: err.message,
      });
    }

    // save the file in db
     console.log(req.file);
    const file = new FileModel({
      originalFilename: req.file.originalname,
      newFilename: req.file.filename,
      path: req.file.path,
    });
    const newlyInsertedFile = await file.save();

    console.log("File Uploaded Successfully");
    return res.json({
      success: true,
      message: "Uploaded file successfully",
      fileId: newlyInsertedFile._id,
    });
  });
};

const generateDynamic = async (req,res) => {
  try {
    const fileId = req.params.uuid;
    console.log(fileId);
    const file = await FileModel.findById(fileId);
    if(!file){
      return res.status(404).json({
        success:false,
        message:"File not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "File generated successfully",
      result: `http://localhost:4000/files/download/${fileId}`,
      fileId: file._id,
    });
    
  } catch (err) {
    res.status(500).json({
      success:false,
      message:"Some thing is wrong , please enter valid id",
    });
  }
};

const downloadFile = async (req,res) => {
  try {
    const fileId = req.params.uuid;
    // console.log(fileId);
    const file = await FileModel.findById(fileId);
    if(!file){
      return res.end("File not found please check");
    }
    res.download(file.path,file.originalFilename);
    
  } catch (err) {
    res.end("Some thing is wrong, please enter valid id");
  }
};

const sendFile = async (req,res) => {
  const { fileId, shareTo } = req.body;
  console.log(req.body);
const downloadablelink = "http://localhost:4000/files/download/"+ fileId;
const mailOptions = {
  from: process.env.USER_NAME, // Sender address
  to: shareTo, // List of recipients
  message:"file is shared from file-sharing app",
  // fileId:fileId,
  html : `
  <html>
  <head>
  </head>
  <body>
  This mail is generated for sharing the file-sharing app file with your application.
  <br />
  <a href="${downloadablelink}">Download File</a>
  </body>
  </html>
  `
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.error("Error occurred:", error.message);
  } else {
    res.send({ email: "Email sent !" });
    console.log("Message ID:", info.messageId);
  }
});
};

const fileController = {
  uploadFile,
  generateDynamic,
  downloadFile,
  sendFile,
};

module.exports = fileController;