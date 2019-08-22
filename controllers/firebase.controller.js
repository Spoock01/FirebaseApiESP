import { getRegisteredList, getEspList, database } from '../FirebaseConnection';

const mainRoute = async (req, res) => {
	const roomList = await getRegisteredList();
	res.status(200).json({ "Room": roomList });
}

const loginRoute = (req, res) => {
	res.status(200).json(response("Not implemented!"));
}

const registerRoute = (req, res) => {
	const { roomName, macAddress } = req.body;
	handleUserData(roomName, macAddress, res);
}

const handleUserData = async (roomName, macAddress, res) => {

	macAddress = macAddress.toLowerCase()

	var espList = getEspList();
	var registeredList = getRegisteredList();

	const exists = espList.find((obj) => {
		return obj.MAC.toLowerCase() == macAddress;
	});

	if (exists === undefined) {
		res.status(409).json(response("Mac Address not found!"));
		return;
	} else {

		const isDuplicate = registeredList.find((obj) => {
			return obj.macAddress == macAddress;
		});

		if (isDuplicate !== undefined) {
			res.status(409).json(response("Mac Address already exists!"));
			return;
		}
		else {
			const ref = database.ref('Registered');
			var newRoom = ref.push();
			try {
				await newRoom.set({
					"roomName": roomName,
					"macAddress": macAddress
				});

				res.status(201).json(response("Registered."));

				return;
			} catch (e) {
				res.status(500).json(response("An error occurred while trying to save the data."));
			}
		}
	}
}

const response = (message) => {
	return {"request_status": message};
}

export { mainRoute, loginRoute, registerRoute };