import express from 'express';
import cors from 'cors';
import router from './routes/routes';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}.`);
});
