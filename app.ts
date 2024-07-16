import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './src/route';
import wss from './services/wsService';
import { connectDb } from './services/connectDb';
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(PORT, () => {
    console.log(`server on in ${PORT}`);
})
wss();
connectDb();