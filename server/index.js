const express = require("express");
const multer  = require("multer");

const app = express();

const upload = multer({ dest:"files" });

app.post("/upload", upload.single("file"), function (req, res) {
    const { file } = req;

    if (file) {
        res.send("File uploaded successfully");
    } else {
        res.error("Error");
    }

});

app.listen(3000);
