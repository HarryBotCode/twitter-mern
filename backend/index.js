import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import tweetRoute from "./routes/tweetRoute.js";
import cors from "cors";

dotenv.config({
    path:".env"
})
databaseConnection();
const app = express(); 

// middlewares
app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());
app.use(cookieParser());
// const corsOptions = {
//     origin:"https://twitter-mern-wqom.vercel.app",
//     credentials:true
// }

app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.use(cors({
    origin: 'https://twitter-mern-wqom.vercel.app',
    methods: ["POST", "GET", "PUT"],
    credentials: true
  }));

// api
app.use("/api/v1/user",userRoute);
app.use("/api/v1/tweet", tweetRoute);

const PORT = 8080;

app.listen(PORT,() => {
    console.log(`Server listen at port ${PORT}`);
})