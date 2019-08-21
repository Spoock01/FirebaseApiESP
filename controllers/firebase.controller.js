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

const mainRoute = async (req, res) => {

    const roomList = await getRegisteredList();
	// const roomList = getFilteredRooms(getRegisteredList( getEspList));
	// const message = `Room list.\n ${roomList}`;
	// console.log('Room list: \n', roomList);
	res.status(200).json({ "Room": roomList });

}


const loginRoute = (req, res) => {
    res.status(200).json({ "request_status" : "Not implemented" });
}

const registerRoute = (req, res) => {

	const { roomName, macAddress } = req.body;
	// console.log(roomName, macAddress);
	handleUserData(roomName, macAddress, res);
}

const handleUserData = async (roomName, macAddress, res) => {

	macAddress = macAddress.toLowerCase()

	var espList = getEspList();
	var registeredList = getRegisteredList();

	console.log(espList)

	const exists = espList.find((obj) => {
		return obj.MAC.toLowerCase() == macAddress;
	});

	console.log(`Exists ${exists}`);

	if (exists === undefined){
		res.status(404).json({
			"request_status": "Mac Address not found!"
		});
		return;
	}else{

		const isDuplicate = registeredList.find((obj) => {
			return obj.macAddress == macAddress;
		});

		console.log(`isDuplicate ${isDuplicate}`);

		if(isDuplicate !== undefined){

			res.status(409).json({
				"request_status": "Mac Address already exists!"
			});
			return;

		}
		else {
			const ref = database.ref('Registered');
			var newRoom = ref.push();
			try{
				await newRoom.set({
					"roomName": roomName,
					"macAddress": macAddress
				});

				res.status(201).json({
					"request_status": "Registered"
				});

				return;
			}catch(e){
				res.status(500).json({
					"request_status": "An error occurred while trying to save the data."
				});
			}	
		}
	}
}

export { mainRoute, loginRoute, registerRoute };