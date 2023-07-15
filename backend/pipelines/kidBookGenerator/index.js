const { Configuration, OpenAIApi } = require("openai");
const getFullMessage = require("../fullMessageGetter");
const systemDescription = `You are a kids book generator. You take any topic and generate a kids book. 
 The book has less description. Images are described in one line with keywords.
  Add image as IMAGE: <description>. THIS IMAGE DESCRIPTION MUST BE ON A NEW LINE.
   One chapter has at most 2 images.
  One chapter must have less than 4 paragraph. Finish the book in less than 8 chapter.`;
const imageToBase64 = require("image-to-base64");
const PdfPrinter = require("pdfmake");
const fs = require("fs");
const { getDatabase } = require("firebase-admin/database");
const { getStorage } = require("firebase-admin/storage");
const { GENERATION_ERROR, ALL_DONE } = require("../../status_codes");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const kidsBookGenerator = async (job, done) => {
  console.log("Running job/ for kids book");
  let data = job.data;
  let statusUpdater = getDatabase().ref(data.updatePath);
  try {
    await statusUpdater.update({
      message: "Generating the book as raw text..",
    });
    let fullRespone = await getFullMessage(
      openai,
      systemDescription,
      data.text
    );

    await statusUpdater.update({
      message: "Generating images...",
    });

    fullRespone = fullRespone.split("\n");
    let contents = [];

    for (let i = 0; i < fullRespone.length; i++) {
      let line = fullRespone[i].trim();
      if (line.startsWith("Title")) {
        contents.push({
          text: line.split(":")[1],
          style: "header",
          alignment: "center",
          fontSize: 23,
        });
        contents.push("\n");
      } else if (line.startsWith("Chapter")) {
        contents.push("\n");
        contents.push({
          text: line,
          style: "header",
          fontSize: 18,
        });
        contents.push("\n");
      } else if (line.startsWith("IMAGE")) {
        const response = await openai.createImage({
          prompt: line.split(":")[1],
          n: 1,
          size: "256x256",
        });

        let image_url = response.data.data[0].url;

        let base64_img =
          "data:image/png;base64," + (await imageToBase64(image_url));
        contents.push("\n");
        contents.push({
          image: base64_img,
          width: 256,
          height: 256,
        });
        contents.push("\n");
      } else {
        contents.push(line);
      }
    }

    await statusUpdater.update({
      message: "Generating pdf...",
    });

    let printer = new PdfPrinter({
      Courier: {
        normal: "Courier",
        bold: "Courier-Bold",
        italics: "Courier-Oblique",
        bolditalics: "Courier-BoldOblique",
      },
    });

    let dd = {
      content: contents,
      defaultStyle: {
        font: "Courier",
        lineHeight: 1.5,
        alignment: "justify",
      },
      styles: {
        header: {
          lineHeight: 1.5,
          alignment: "justify",
        },
      },
    };

    let pdfDoc = printer.createPdfKitDocument(dd);

    const buffs = [];
    pdfDoc.on("data", function (d) {
      buffs.push(d);
    });
    pdfDoc.on("end", async function () {
      let buff = Buffer.concat(buffs);

      let bucket = getStorage().bucket("buet-hackathon-bdf5e.appspot.com");
      let file = bucket.file("generated/" + Date.now() + ".pdf");

      await file.save(buff, {
        contentType: "application/pdf",
      });

      await file.makePublic();
      let pubURL = file.publicUrl();
      await statusUpdater.update({
        code: ALL_DONE,
        file: pubURL,
        fileType: "pdf",
        message: "Generated!",
        title: data.text,
      });
    });
    pdfDoc.end();
  } catch (e) {
    console.log(e);
    await statusUpdater.update({
      code: GENERATION_ERROR,
      message: "Could not generate your book :(",
    });
  }
};

module.exports = kidsBookGenerator;
