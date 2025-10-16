import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-x-4 text-center">
      <div className="mb-4 font-bold text-xl">Home</div>
      <div className="flex gap-4">
        <button
          className="border-2 px-3 text-center rounded-sm py-1 bg-blue-500 border-white text-white hover:bg-blue-700 hover:scale-105 hover:shadow-lg hover:transition duration-300"
          onClick={() => navigate("/login")}
        >
          Sign in
        </button>
        <button
          className="border-2 px-3 text-center rounded-sm py-1 bg-blue-500 border-white text-white hover:bg-blue-700 hover:scale-105 hover:shadow-lg hover:transition duration-300"
          onClick={() => navigate("/register")}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Home;
