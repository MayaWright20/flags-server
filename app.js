import cookieParser from "cookie-parser";
// const cookieParser = require("cookie-parser");
// const config = require("dotenv");
import { config } from "dotenv";
// const express = require("express");
import express from "express";
// const helmet = require("helmet")
import helmet from "helmet";
// const errorMiddleware = require("./middleware/error.js");
import { errorMiddleware } from "./middleware/error.js";
import user from "./routes/user.js";
// const  user = require("./routes/user.js");

config({
    path: "./data/config.env"
});

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res, nex)=> {
    res.send("Working")
})

app.use("/api/v1/user", user);

app.use(helmet())
app.use(errorMiddleware);


