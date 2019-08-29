import firebase from "firebase";
import dotenv from "dotenv";

var espList = [];
var registeredList = [];

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
var redeRef = database.ref("/");

firebase
  .auth()
  .signInWithEmailAndPassword(
    process.env.INPUT_EMAIL,
    process.env.INPUT_PASSWORD
  )
  .then(() => {
    console.log("User connected.");
    redeRef.on("value", gotData, errData);
    return;
  })
  .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Err code: ", errorCode);
    console.log("Err Message: ", errorMessage);
  });

const gotData = data => {
  espList = [];
  registeredList = [];

  var redes = data.val();

  readDatabase("Rede", espList, redes);
  readDatabase("Registered", registeredList, redes);
};

const errData = err => {
  console.log("Erro: " + err);
};

const getEspList = () => {
  return espList;
};

const getRegisteredList = () => {
  return registeredList;
};

const readDatabase = (key, list, redes) => {
  try {
    var objKeys = Object.keys(redes[key]);

    objKeys.forEach(roomName => {
      list.push(redes[key][roomName]);
    });
  } catch (e) {
    console.log(`Exception while trying to read '${key}' database.`);
    console.log(`'${key}' database started with an empty array!`);
    list = [];
  }
};

export { getEspList, getRegisteredList, database };
