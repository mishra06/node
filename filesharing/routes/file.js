const express = require('express');

const router = express.Router();

const fileController = require('../controllers/file');
// console.log(fileController);

router.post("/api/files/",fileController.uploadFile);

router .get("/files/:uuid",fileController.generateDynamic);

router.get("/files/download/:uuid",fileController.downloadFile);

router.post("/api/files/send",fileController.sendFile);

module.exports = router;