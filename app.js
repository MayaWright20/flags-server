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

// Apply helmet first for security
app.use(helmet());

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res, next)=> {
    res.json({
        success: true,
        message: "Server is working",
        availableRoutes: [
            "GET /",
            "POST /user/signup",
            "POST /user/login", 
            "GET /user/profile",
            "GET /user/logout",
            "POST /api/v1/user/signup",
            "POST /api/v1/user/login",
            "GET /api/v1/user/profile", 
            "GET /api/v1/user/logout"
        ]
    })
})

// Mount user routes
app.use("/api/v1/user", user);

// Also mount routes directly under /user for convenience
app.use("/user", user);

// 404 handler for unmatched routes
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

app.use(errorMiddleware);


