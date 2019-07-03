var firebase = require("firebase");

var express = require('express');
var app = express();

inputEmail = 'abc@gmail.com';
inputPassword = 'minduin';

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
    console.log("Usuário Conectado!");
    ref.on('value', gotData, errData);
    return;
}).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorMessage);

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
            console.log('Object: ', redes[k]);

            if(redes[k] !== undefined){
                
                lista.push(redes[k]);
           
                var intensidade = redes[k].Intensidade_RSSI;
                var MAC = redes[k].MAC;
                var nome = redes[k].Nome; 
                console.log(intensidade, MAC, nome);

            }else{
                console.log('Undefined object.');
            }   
        }

    }catch(err){
        console.log('Erro: ', err);
    }
    return;
}

function errData(err){
    console.log('Erro: ' + err);
}

module.exports = function(){
    console.log('____________________________________________');
    console.log(lista)
    console.log('____________________________________________');
    return lista;
}