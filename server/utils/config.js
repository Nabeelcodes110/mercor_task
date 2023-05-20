const admin = require("firebase-admin");

firebaseConfiguration = JSON.parse(process.env.FIREBASE_ADMIN_CONFIG);
firebaseConfiguration["private_key"] = process.env.FIREBASE_PRIVATE_KEY.replace(
  /\\n/g,
  "\n"
);

const serviceAccount = firebaseConfiguration;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = { admin };
