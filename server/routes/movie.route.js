import express from "express";
import {
  getMovies,
  createMovie,
  getMovie,
  deleteMovie,
  updateMovie,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/movies", getMovies);
router.post("/movie", createMovie);
router.get("/movie/:id", getMovie);
router.delete("/movie/:id", deleteMovie);
router.put("/movie/:id", updateMovie);

export default router;
