import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./lib/db.js";
import applicationRouter from './routes/application.route.js'

const app = express();

dotenv.config();
const PORT = process.env.PORT;

app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    })
);
app.use(express.json());

app.use("/api/v1/applications", applicationRouter);

app.listen(PORT, ()=>{
    console.log("server is running on PORT:" + PORT);
    connectDB();
})