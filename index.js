import express from 'express';
import {registerRoute, mainRoute, loginRoute,} from './controllers/firebase.controller'

const app = express();
app.use(express.json());


// const registeredRooms = [{
// 	name: 'Sala Synchro',
// 	macAddress: 'B0:BE:76:F8:98:3F'
// }, {
// 	name: 'Sala ConductorLab',
// 	macAddress: '30:B5:C2:6D:33:B6'
// }, {
// 	name: 'Sala CAEDC',
// 	macAddress: 'C8:E7:D8:9A:C2:AC'
// }, {
// 	name: 'Celular Arthur',
// 	macAddress: '06:D6:AA:FC:7A:DB'
// }]

// const getFilteredRooms = roomList => {
// 	let filteredRooms = [];
// 	for (let i = 0; i < registeredRooms.length; i++) {
// 		for (let j = 0; j < roomList.length; j++) {
// 			if (roomList[j].macAddress === registeredRooms[i].macAddress) {
// 				filteredRooms.push(registeredRooms[i]);
// 				break;
// 			}
// 		}
// 	}

// 	if (filteredRooms.length > 0)
// 		return filteredRooms;

// 	return null;
// }

// app.get("/:roomName", roomRoute);

app.get("/", mainRoute);

app.post('/login/:user/:password', loginRoute);

app.post('/register', registerRoute);

const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}.`);
});
