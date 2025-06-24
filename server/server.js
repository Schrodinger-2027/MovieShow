import express from "express";
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express'
import connectDB from "./configs/db.js";

const app = express();
const port = 3000;
await connectDB() 

app.use(express.json());
app.use(clerkMiddleware())
app.use(cors());


app.get('/' , (req , res) =>{
    res.send('Server is Live');
});



app.listen(port , ()=> console.log(`server is listening at http://localhost:${port}`));


