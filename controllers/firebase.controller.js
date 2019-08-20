import { getRegisteredList, getEspList, database } from '../FirebaseConnection';


// const roomRoute = (req, res) => {

//     const { roomName } = req.params;
// 	const roomList = getRegisteredList(getEspList);

// 	if (roomList.length > 0) {
// 		const result = roomList.filter(rn => rn.roomName === roomName);

// 		if (result.length > 0) {
// 			console.log(`Room "${roomName}" has been found.`);
// 			res.status(200).send(result[0].macAddress);
// 		} else {
// 			const responseText = `Room "${roomName}" not found.`;
// 			console.log(responseText);
// 			res.status(404).send(responseText);
// 		}
// 	} else {
// 		console.log('There are no data in the database.');
// 		res.status(404).send();
// 	}
// }

const mainRoute = (req, res) => {

    const roomList = getRegisteredList(getEspList);
	// const roomList = getFilteredRooms(getRegisteredList( getEspList));
	// const message = `Room list.\n ${roomList}`;
	console.log('Room list: \n', roomList);
	res.status(200).json({ "Room": roomList });

}


const loginRoute = (req, res) => {
    res.status(200).send("Ainda não foi feito.");
}

const registerRoute = (req, res) => {

    var status = writeUserData(req.body.roomName, req.body.macAddress);
	res.status(200).json(status);

}

const writeUserData = async (roomName, macAddress) => {

	var espList = getEspList();
	var registeredList = getRegisteredList();

	const exists = espList.find((obj) => {
		return obj.macAddress == macAddress;
	});

	if (exists === undefined){
		return {"status": "Mac Address not found!"};
	}else{

		const isDuplicate = registeredList.find((obj) => {
			return obj.macAddress == macAddress;
		});

		if(isDuplicate !== undefined){
			return {"status": "Mac Address already exists!"};
		}
		else {
			const ref = database.ref('Registered');
			var newRoom = ref.push();
	
			await newRoom.set({
				"roomName": roomName,
				"macAddress": macAddress
			});
		}
	}
	
	return {"status": "OK"};
}

export { mainRoute, loginRoute, registerRoute };