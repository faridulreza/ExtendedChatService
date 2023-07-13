const blogGenerator = (job, done) => {
    console.log("blogGenerator");
  return done(null, job.data);
};

module.exports = blogGenerator;
