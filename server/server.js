import express from "express";
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express'
import connectDB from "./configs/db.js";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

const app = express();
const port = 3000;
await connectDB() 

app.use(express.json());
app.use(clerkMiddleware())
app.use(cors());


app.get('/' , (req , res) =>{res.send('Server is Live');});
app.use("/api/inngest", serve({ client: inngest, functions }));


if (process.env.NODE_ENV !== "production") {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

// ✅ Export for Vercel
export default app;


// app.listen(port , ()=> console.log(`server is listening at http://localhost:${port}`));


