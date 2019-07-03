const express = require('express');
var getLista = require('./test');

const app = express();

app.get("/:roomName", function(req, res, next){

    const {roomName} = req.params;

    lista = getLista();

    console.log(lista);

    const result = lista.filter(rn => rn.Nome === roomName );

    res.status(200).send(result[0].MAC);
    console.log(result[0]);

});


app.listen(8081, function(){
    console.log('Servidor rodando na porta (8081).');
})



