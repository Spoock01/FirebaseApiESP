const firebase = require("firebase");

const inputEmail = 'abc@gmail.com';
const inputPassword = 'minduin';
var lista = [];

const firebaseConfig = {
    apiKey: "AIzaSyBmsCvaUtFUSmIGIr2uZWl_6yQ5whAHMsQ",
    authDomain: "sistemasembarcados20191-64dd3.firebaseapp.com",
    databaseURL: "https://sistemasembarcados20191-64dd3.firebaseio.com",
    projectId: "sistemasembarcados20191-64dd3",
    storageBucket: "sistemasembarcados20191-64dd3.appspot.com",
    messagingSenderId: "93476806039",
};

firebase.initializeApp(firebaseConfig);

firebase.auth().signInWithEmailAndPassword(inputEmail, inputPassword).then(function (result) {
    console.log("User connected.");
    ref.on('value', gotData, errData);
    return;
}).catch(function (error) {

    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('Err code: ', errorCode);
    console.log('Err Message: ', errorMessage);

});


var database = firebase.database();
var ref =  database.ref('Rede');

function gotData(data){
    var redes = data.val();

    try{

        lista = [];

        var keys = Object.keys(redes);

        for(var i = 0; i < keys.length; i++){

            var k = keys[i];
            if(redes[k] !== undefined)    
                lista.push(redes[k]);       
            else
                console.log('Undefined object received.');   
        }
        
    }catch(err){
        console.log('Erro no try: ', err);
    }
}

function errData(err){
    console.log('Erro: ' + err);
}

module.exports = function(){
    return lista;
}


// var intensidade = redes[k].Intensidade_RSSI;
// var MAC = redes[k].MAC;
// var nome = redes[k].Nome; 
// console.log(intensidade, MAC, nome);