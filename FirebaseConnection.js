import firebase from 'firebase';

const inputEmail = 'abc@gmail.com';
const inputPassword = 'minduin';
var espList = [];
var registeredList = [];

const firebaseConfig = {
	apiKey: "AIzaSyBmsCvaUtFUSmIGIr2uZWl_6yQ5whAHMsQ",
	authDomain: "sistemasembarcados20191-64dd3.firebaseapp.com",
	databaseURL: "https://sistemasembarcados20191-64dd3.firebaseio.com",
	projectId: "sistemasembarcados20191-64dd3",
	storageBucket: "sistemasembarcados20191-64dd3.appspot.com",
	messagingSenderId: "93476806039",
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
var redeRef = database.ref('/');

firebase.auth().signInWithEmailAndPassword(inputEmail, inputPassword).then(() => {
	console.log("User connected.");
	redeRef.on('value', gotData, errData);
	return;
}).catch(function (error) {
	var errorCode = error.code;
	var errorMessage = error.message;
	console.log('Err code: ', errorCode);
	console.log('Err Message: ', errorMessage);
});

const gotData = (data) => {
	espList = [];
	registeredList = [];

	var redes = data.val();

	readDatabase("Rede", espList, redes);
	readDatabase("Registered", registeredList, redes);

}

const errData = (err) => {
	console.log('Erro: ' + err);
}


const getEspList = () => {
	return espList;
}

const getRegisteredList = () => {
	return registeredList;
}

const readDatabase = (key, list, redes) => {

	try {
		var objKeys = Object.keys(redes[key]);

		objKeys.forEach((roomName) => {

			list.push(redes[key][roomName]);
		});
	} catch (e) {
		console.log(`Exception while trying to read '${key}' database.`);
		console.log(`'${key}' database started with an empty array!`);
		list = [];
	}
}

export { getEspList, getRegisteredList, database };