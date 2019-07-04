const express = require('express');

var getRoomList = require('./FirebaseConnection');

const app = express();

app.get("/:roomName", function(req, res, next){

    const {roomName} = req.params;
    roomList = getRoomList();
    const result = roomList.filter(rn => rn.Nome === roomName );
    res.status(200).send(result[0].MAC);
});

app.get("/", function(req, res, next){

    roomList = getRoomList();
    message = "Room's list.\n", roomList;
    res.status(200).send(roomList);

});


app.listen(8081, function(){
    console.log('Servidor rodando. localhost:8081/"roomName"');
})



