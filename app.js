import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import helmet from "helmet";
import { errorMiddleware } from "./middleware/error.js";
import user from "./routes/user.js";


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
            "DELETE /user/delete",
            "GET /user/favourites",
            "POST /api/v1/user/signup",
            "POST /api/v1/user/login",
            "GET /api/v1/user/profile", 
            "GET /api/v1/user/logout",
            "GET /api/v1/user/favourites",
            "DELETE /api/v1/user/delete",
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


