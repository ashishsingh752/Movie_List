import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Add() {
  const [formData, setFormData] = useState({
    movieName: "",
    genre: "",
    releaseDate: "",
    studio: "",
    score: "",
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleMovie(id);
    }
  }, [id]);

  const getSingleMovie = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/movie/${id}`);
      if (response.status === 200) {
        setFormData({ ...response.data });
      }
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const addMovie = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/movie", data);
      if (response.status === 200) {
        toast.success(response.data);
      }
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  const updateMovie = async (data) => {
    try {
      const response = await axios.put(`http://localhost:5000/movie/${id}`, data);
      if (response.status === 200) {
        toast.success(response.data);
      }
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.movieName || !formData.genre) {
      toast.error("Please enter a value in each field");
    } else {
      if (id) {
        updateMovie(formData);
      } else {
        addMovie(formData);
      }
      setFormData({
        movieName: "",
        genre: "",
        releaseDate: "",
        studio: "",
        score: "",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-center mb-4">Movie Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Movie Name:
            </label>
            <input
              type="text"
              id="name"
              name="movieName"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Enter movie name"
              value={formData.movieName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="genre"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Genre:
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Enter genre (e.g., Comedy, Drama)"
              value={formData.genre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="releaseDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Release Date:
            </label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="YYYY-MM-DD"
              value={formData.releaseDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="studio"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Studio:
            </label>
            <input
              type="text"
              id="studio"
              name="studio"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Enter studio name"
              value={formData.studio}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="score"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Score (0-10):
            </label>
            <input
              type="number"
              id="score"
              name="score"
              min="0"
              max="10"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Enter score (optional)"
              value={formData.score}
              onChange={handleChange}
            />
          </div>
          <input
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            value={id ? "Update" : "Add"}
          ></input>
        </form>
      </div>
    </div>
  );
}
