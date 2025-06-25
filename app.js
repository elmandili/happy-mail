
import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import route from './routes/userRoute.js'
import path from 'path';
import bodyParser from 'body-parser';
import ejs from 'ejs'
import aiRoute from './routes/aiRoute.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';




const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();


app.set("view engine", "ejs")
app.set('views', path.join(process.cwd(), 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
dotenv.config();


const PORT = process.env.PORT || 3000;
const MONGOURL = process.env.MONGO_URL;
app.get('/', (req,res)=>{
  res.render('index')
})



mongoose.connect(MONGOURL).then(()=>{
  console.log("db is connected .... ");
  app.listen(PORT, ()=>{
    console.log("server is running on port : " + PORT);
  }
)}).catch((error)=>console.log(error));


app.use('/api/user', route);
app.use('/api/ai', aiRoute)



// filepath: c:\Users\one\Documents\Projects\Happy-Daily-Mail\app.js
