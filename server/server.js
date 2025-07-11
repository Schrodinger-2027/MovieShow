import express from "express";
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express'
import connectDB from "./configs/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import showRouter from "./routes/showRoute.js";

const app = express();
const port = 3000;
await connectDB() 

app.use(express.json());
app.use(clerkMiddleware())
app.use(cors());


app.get('/' , (req , res) =>{res.send('Server is Live');});
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use('/api/show', showRouter)



app.listen(port , ()=> console.log(`server is listening at http://localhost:${port}`));


