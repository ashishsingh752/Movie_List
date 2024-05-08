import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    const updateActiveTab = () => {
      if (location.pathname === "/") {
        setActiveTab("Home");
      } else if (location.pathname === "/add") {
        setActiveTab("AddMovie");
      }
    };

    window.addEventListener("popstate", updateActiveTab);

    return () => window.removeEventListener("popstate", updateActiveTab);
  }, [location.pathname]);

  return (
    <header className="bg-gradient-to-r from-cyan-500 to-blue-500 py-4 flex justify-between items-center px-10">
      <div className="text-white text-xl font-bold flex items-center">
        Movie List
      </div>
      <nav className="space-x-4 text-white font-medium">
        <Link
          to="/"
          className={`hover:underline ${
            activeTab === "Home" ? "text-cyan-200" : ""
          }`}
          onClick={() => setActiveTab("Home")}
        >
          Home
        </Link>
        <Link
          to="/add"
          className={`hover:underline ${
            activeTab === "AddMovie" ? "text-cyan-200" : ""
          }`}
          onClick={() => setActiveTab("AddMovie")}
        >
          Add New Movie
        </Link>
      </nav>
    </header>
  );
}
