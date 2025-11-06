import { asyncError } from "../middleware/error.js";
import { Flag } from "../models/flag.js";
import { User } from "../models/user.js";
import ErrorHandler from "../utils/error.js";
import { cookieOptions, sendToken } from "../utils/feature.js";

export const setIsFavourite = asyncError(async(req, res, next) => {
    const {name} = req.body;

    await Flag.create({user: req.user._id, name});

    
    res.status(200).json({
        success: true,
        message: "Favourite created successfully"
    });
});

export const getAllFavourites = asyncError(async(req, res, next)=> {
    const favourites = await Flag.find({});
    
    res.status(200).json({
        success: true,
        favourites
    });
})