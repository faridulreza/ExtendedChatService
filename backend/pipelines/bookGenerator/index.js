const bookGenerator = (job, done) => {
  console.log("bookGenerator");
  return done(null, job.data);
};

module.exports = bookGenerator;
