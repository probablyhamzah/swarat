const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(5000, () => {
    console.log(`Server started...`);
});

app.post("/upload_files", upload.single("files"), uploadFiles);

function uploadFiles(req, res) {
    console.log(req.body);
    console.log(req.files);
    res.json({ message: "Successfully uploaded files" });
}