import morgan from "morgan";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

import router from "./routes/userroutes.js";
import path from "path";
import { CronJob } from "cron";


const app = express();
dotenv.config();


app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));


const _dirname = path.resolve();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1',router);

var job = new CronJob('* * */7 * *', () => {
    console.log("Excecuted in cron job;..")
})
job.start();

app.get("/ping", (req, res) => {
    return res.sendFile(__dirname + '/public/index.html');
})


app.get("/urlencoded", (req, res) => {
    res.send(
        `<form method='post' action='/login'>
            <input name="email" placeholder="text" />
            <input name="password"  placeholder="password"/>
            <input type='submit' value="LOgin"/>
        </form>`
    )
})

app.post('/login', (req, res) => {
    console.log(req.body.email)
    console.log(req.body.password)
    // db store 
    res.send(`Your email ${req.body.email} and passsword is ${req.body.password}`)
})





mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB Error => ", err));


app.listen(process.env.PORT, () => console.log("Working on port 4000")); // port