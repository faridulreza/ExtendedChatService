const {
  ERROR_FILE_PROSESSING,
  PROCESSING_FILE,
} = require("../status_codes.js");
const tesseract = require("node-tesseract-ocr");
const Downloader = require("nodejs-file-downloader");
const { OpenAIApi, Configuration } = require("openai");
const { getDatabase } = require("firebase-admin/database");
const fs = require("fs");

//function informs error
const FileError = (res, req, err) => {
  console.log(err);
  res.status(400).json({
    message: "Sorry could not process your file :(",
    code: ERROR_FILE_PROSESSING,
  });

  getDatabase().ref(req.updatePath).update({
    message: "Sorry could not process your file :(",
    code: ERROR_FILE_PROSESSING,
  });
};

//create openAi for audio transcription
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

//tessract config for imageToText
const tesrConfig = {
  lang: "eng",
  oem: 1,
  psm: 3,
};

function removeFile(path) {
  try {
    fs.unlinkSync(path);
  } catch (e) {}
}

//convert the pdf , image or audio to file to text
const FileToText = async (req, res, next) => {
  if (req.body.file && req.body.fileType) {
    console.log("path: " + req.updatePath);
    await getDatabase().ref(req.updatePath).update({
      message: "Processing file...",
      code: PROCESSING_FILE,
    });
    const fileURL = req.body.file;
    const fileType = req.body.fileType;

    try {
      //convert image to text
      if (fileType == "image") {
        let text = await tesseract.recognize(fileURL, tesrConfig);
        req.body.text = text;
        next();
        return;
      }

      //convert pdf/text/audio to image

      //downlaod the file
      const downloader = new Downloader({
        url: fileURL, //If the file name already exists, a new file with the name 200MB1.zip is created.
        directory: "./downloads", //This folder will be created, if it doesn't exist.
      });
      const { filePath, downloadStatus } = await downloader.download();

      //transcribe audio
      if (fileType == "audio") {
        let resp = await openai.createTranscription(
          fs.createReadStream(filePath),
          "whisper-1"
        );
        req.body.text = resp.data.text;
        next();

        //remove the file
        removeFile(filePath);
        return;
      }

      //get text from text file
      if (fileType == "txt") {
        //read the text file
        var data = fs.readFileSync(filePath, "utf8");
        req.body.text = data.toString();

        removeFile(filePath);
        next();
        return;
      }

      //get text from pdf
      if (fileType == "pdf") {
        var pdf_extract = require("pdf-extract");

        var options = {
          type: "text", // extract searchable text
        };

        var processor = pdf_extract(filePath, options, function (err) {
          if (err) {
            //remove the file
            removeFile(filePath);
            return FileError(res, req);
          }
        });
        processor.on("complete", function (data) {
          let text = data.text_pages.join("\n");

          req.body.text = text;
          //remove the file
          removeFile(filePath);
          next();
        });
        processor.on("error", function (err) {
          //remove the file
          removeFile(filePath);
          return FileError(res, req);
        });

        return;
      }

      next();
      removeFile(filePath);
    } catch (err) {
      FileError(res, req, err);
    }
  } else next();
};

module.exports = FileToText;
