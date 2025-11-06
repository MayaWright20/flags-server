import express from "express";
import { getMyProfile, login, logout, signUp } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";
import { getAllFavourites, setIsFavourite } from "../controllers/flag.js";

const router = express.Router();

router.get("/", isAuthenticated, getAllFavourites);
router.post("/", isAuthenticated, setIsFavourite);


export default router;