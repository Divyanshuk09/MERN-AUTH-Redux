import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

import connectDB from './DB/index.js';
import authRoute from './routes/auth.routes.js'

dotenv.config();

const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json());
app.use(cookieParser())


app.get('/', (req, res) => {
    res.send("API Is working!")
})

app.use('/api/auth', authRoute);

connectDB()

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})