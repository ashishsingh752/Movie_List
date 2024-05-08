import { v4 as uuid } from "uuid";

let users = [];
export const getUsers = (req, res) => {
  res.send(users);
};
export const createUser = (req, res) => {
  const user = req.body;
  users.push({ ...user, id: uuid() });
  res.send("user added successfully");
};

export const getUser = (req, res) => {
  const singleUser = users.filter((user) => user.id === req.params.id);
  res.send(singleUser);
};

export const deleteUser = (req, res) => {
  users.filter((user) => user.id !== req.params.id);
  res.send("User deleted successfully! ");
};
export const updateUser = (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  user.movieName = req.body.movieName;
  user.genre = req.body.genre;
  user.releaseDate = req.body.releaseDate;
  user.studio = req.body.studio;
  user.score = req.body.score;

  res.send("User updated successfully! ");
};
