import { v4 as uuid } from "uuid";

let movies = [];

export const getMovies = (req, res) => {
  res.send(movies);
};

export const createMovie = (req, res) => {
  const movie = req.body;
  movies.push({ ...movie, id: uuid() });
  res.send("Movie added successfully");
};

export const getMovie = (req, res) => {
  const singleMovie = movies.filter((movie) => movie.id === req.params.id);
  res.send(singleMovie);
};

export const deleteMovie = (req, res) => {
  movies = movies.filter((movie) => movie.id !== req.params.id);
  res.send("Movie deleted successfully!");
};

export const updateMovie = (req, res) => {
  const movie = movies.find((movie) => movie.id === req.params.id);
  movie.movieName = req.body.movieName;
  movie.genre = req.body.genre;
  movie.releaseDate = req.body.releaseDate;
  movie.studio = req.body.studio;
  movie.score = req.body.score;

  res.send("Movie updated successfully!");
};
