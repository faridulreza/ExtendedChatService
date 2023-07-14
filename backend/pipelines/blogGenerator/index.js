const { Configuration, OpenAIApi } = require("openai");
const getFullMessage = require("../fullMessageGetter");
const systemDescription = `You are a blog generator. 
You will  generate simple blog with HTML/CSS/JS on given topic. 
Insert images where necessary. Add the description of the images in 'alt' property.`;

const { getDatabase } = require("firebase-admin/database");
const { getStorage } = require("firebase-admin/storage");
const { GENERATION_ERROR, ALL_DONE } = require("../../status_codes");
const { parse } = require("node-html-parser");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const blogGenerator = async (job, done) => {
  console.log("Running job/ for blog");
  let data = job.data;
  let statusUpdater = getDatabase().ref(data.updatePath);

  try {
    await statusUpdater.update({
      message: "Generating the blog as raw text..",
    });
    let fullRespone = await getFullMessage(
      openai,
      systemDescription,
      data.text
    );

    let rootDoc = parse(fullRespone);

    let image = rootDoc.querySelectorAll("img");

    await statusUpdater.update({
      message: "Generating images...",
    });
    for (let i = 0; i < image.length; i++) {
      const response = await openai.createImage({
        prompt: image[i].getAttribute("alt"),
        n: 1,
        size: "256x256",
      });

      let image_url = response.data.data[0].url;

      image[i].setAttribute("src", image_url);
    }

    rootDoc = rootDoc.toString();

    let bucket = getStorage().bucket("buet-hackathon-bdf5e.appspot.com");
    let file = bucket.file("generated/" + Date.now() + ".html");

    await file.save(rootDoc, {
      contentType: "text/html",
    });

    await file.makePublic();
    let pubURL = file.publicUrl();
    await statusUpdater.update({
      code: ALL_DONE,
      file: pubURL,
      fileType: "txt",
      message: "Generated!",
    });
  } catch (e) {
    console.log(e);
    await statusUpdater.update({
      code: GENERATION_ERROR,
      message: "Could not generate your blog :(",
    });
  }
};

module.exports = blogGenerator;
