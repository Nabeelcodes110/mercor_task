const admin = require("firebase-admin");

const firebaseConfiguration = JSON.parse(
  process.env.REAC_APP_FIREBASE_ADMIN_CONFIG
);
firebaseConfiguration["private_key"] =
  process.env.REACT_APP_FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");

const serviceAccount = firebaseConfiguration;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export { admin };
