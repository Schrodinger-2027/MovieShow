import express from "express";
import { addShow, getNowPlayingMovies } from "../controllers/showController.js";
import { protectAdmin } from "../middlewares/auth.js";

const showRouter = express.Router();

showRouter.get('/now-playing', protectAdmin, getNowPlayingMovies)
showRouter.post('add', protectAdmin, addShow)

export default showRouter;