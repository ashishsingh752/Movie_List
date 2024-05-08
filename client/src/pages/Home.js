import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/movies");
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/movie/${id}`);
      if (response.status === 200) {
        toast.success(response.data);
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
      } else {
        console.error("Delete movie failed:", response.data);
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2">Movie Name</th>
            <th className="px-4 py-2">Genre</th>
            <th className="px-4 py-2">Release Date</th>
            <th className="px-4 py-2">Studio</th>
            <th className="px-4 py-2">Score</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((movie) => (
              <tr key={movie.id}>
                <td className="border px-4 py-2">{movie.movieName}</td>
                <td className="border px-4 py-2">{movie.genre}</td>
                <td className="border px-4 py-2">{movie.releaseDate}</td>
                <td className="border px-4 py-2">{movie.studio}</td>
                <td className="border px-4 py-2">{movie.score}</td>
                <td className="border px-4 py-2">
                  <Link to={`/add/${movie.id}`}>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700">Edit</button>
                  </Link>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 ml-2" onClick={() => handleDelete(movie.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
