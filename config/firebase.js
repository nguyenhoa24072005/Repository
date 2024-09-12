const admin = require('firebase-admin');
const serviceAccount = require(process.env.FIREBASE_CONFIG_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-database-name.firebaseio.com"
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
