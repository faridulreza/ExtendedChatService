const kidsBookGenerator = (job, done) => {
  console.log("kidsBookGenerator");
  return done(null, job.data);
};

module.exports = kidsBookGenerator;
