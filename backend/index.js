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

// CORS middleware setup
app.use(cors({
    origin: "https://twitter-mern-frontend.vercel.app",
    credentials: true
}));

// api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/tweet", tweetRoute);
 
app.get("/", (req, res) => {
    res.send("<h1>twitter app backend</h1>");
});

// Manually set CORS headers for a specific route
app.get("/test", (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://twitter-mern-frontend.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send("Test route");
});

app.listen(process.env.PORT, () => {
    console.log(`Server listen at port ${process.env.PORT}`);
});
