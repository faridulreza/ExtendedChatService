const { initializeApp, cert } = require("firebase-admin/app");

initializeApp({
  credential: cert("firebase_cert.json"),
  databaseURL: "https://buet-hackathon-bdf5e-default-rtdb.firebaseio.com",
});


