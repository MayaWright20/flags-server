import express from "express";
import {  getMyProfile, login, logout, readAllFavourites, signUp, updateFavourites } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";



const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);

router.get("/profile", isAuthenticated, getMyProfile);
router.get("/logout", isAuthenticated, logout);

router.patch("/favourites", isAuthenticated, updateFavourites);

router.get("/favourites", isAuthenticated, readAllFavourites);


export default router;