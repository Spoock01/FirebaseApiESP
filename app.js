import express from 'express';
import {getRoomList, database} from './FirebaseConnection';

const app = express();

const registeredRooms = [{
    name: 'Sala Synchro',
    macAddress: 'B0:BE:76:F8:98:3F' 
}, {
    name: 'Sala ConductorLab',
    macAddress: '30:B5:C2:6D:33:B6'
}, {
    name: 'Sala CAEDC',
    macAddress: 'C8:E7:D8:9A:C2:AC'
}, {
    name: 'Celular Arthur',
    macAddress: '06:D6:AA:FC:7A:DB'
}]

const getFilteredRooms = roomList => {
    let filteredRooms = [];
    for(let i = 0; i < registeredRooms.length; i++) {
        for(let j = 0; j < roomList.length; j++) {
            if(roomList[j].MAC === registeredRooms[i].macAddress) {
                filteredRooms.push(registeredRooms[i]);
                break;
            }
        }
    }

    if(filteredRooms.length > 0)
        return filteredRooms;

    return null;
}

app.get("/:roomName", (req, res, next) => {

    const { roomName } = req.params;
    const roomList = getRoomList();
    
    if(roomList.length > 0) {
        const result = roomList.filter(rn => rn.Nome === roomName );
        
        if(result.length > 0) {
            console.log(`Room "${roomName}" has been found.`);
            res.status(200).send(result[0].MAC);
        } else {
            const responseText = `Room "${roomName}" not found.`;
            console.log(responseText);
            res.status(404).send(responseText);
        }
    } else {
        console.log('There are no data in the database.');
        res.status(404).send();
    }
});

app.get("/", (req, res, next) => {

    // const roomList = getRoomList();
    const roomList = getFilteredRooms(getRoomList());
    // const message = `Room list.\n ${roomList}`;
    console.log('Room list: \n', roomList);
    res.status(200).send(roomList);

});

app.post('/login/:user/:password', (req, res, next) => {

    res.status(200).send("Ainda não foi feito.");


});


app.listen(3000, function(){
    console.log(`Server started on port 3000.`);
    writeUserData(1, "Sala1", "mac1");
    console.log("Write");
});



function writeUserData(userId, roomName, macAddress) {
    database.ref('Rede/' + userId).set({
      "Nome": roomName,
      "MAC": macAddress
    });
  }



