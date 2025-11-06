import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import helmet from "helmet";
import { errorMiddleware } from "./middleware/error.js";
import user from "./routes/user.js";
import flag from "./routes/flag.js";


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
            "GET /favourites",
            "POST /api/v1/user/signup",
            "POST /api/v1/user/login",
            "GET /api/v1/user/profile", 
            "GET /api/v1/user/logout",
            "GET /api/v1/favourites",
        ]
    })
})

// Mount user routes
app.use("/api/v1/user", user);
app.use("/api/v1/favourites", flag);

// Also mount routes directly under /user for convenience
app.use("/user", user);
app.use("/favourites", flag);

// 404 handler for unmatched routes
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

app.use(errorMiddleware);


