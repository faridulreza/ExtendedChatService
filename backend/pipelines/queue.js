const blogGenerator = require("./blogGenerator");
const bookGenerator = require("./bookGenerator");
const kidsBookGenerator = require("./kidBookGenerator");
const Queue = require("bee-queue");
// Generation tasks
const generationTarget = ["book", "kid's book", "blog"]; //<-- add more brunches here to make the system be able to generate more things
// functions that handles these tasks in order
const generationProcessor = [bookGenerator, kidsBookGenerator, blogGenerator]; //<-- add more functions here to make the system be able to generate more things

const queues = {};

generationTarget.forEach((target, index) => {
  queues[target] = new Queue(target);
  queues[target].process(generationProcessor[index]);
});

module.exports = { generationTarget, queues };
