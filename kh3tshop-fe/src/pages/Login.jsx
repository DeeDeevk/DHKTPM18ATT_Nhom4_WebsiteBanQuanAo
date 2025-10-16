import React from "react";

const Register = () => {
  return (
    <div className="grid place-items-center min-h-screen bg-gray-50">
      <form className="grid gap-4 p-6 bg-white rounded-lg shadow-md w-80">
        <h2 className="font-bold text-2xl text-center">Đăng nhập</h2>
        <div className="grid gap-1">
          <label className="font-semibold text-sm">Tên đăng nhập: </label>
          <input
            type="text"
            name="username"
            className="border-2 rounded-sm px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Tên đăng nhập..."
          ></input>
        </div>
        <div className="grid gap-1">
          <label className="font-semibold text-sm">Mật khẩu: </label>
          <input
            type="password"
            name="password"
            className="border-2 rounded-sm px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Mật khẩu..."
          ></input>
        </div>
        <div>
          <button className="border-2 w-full text-center rounded-sm py-1 bg-blue-500 border-white text-white hover:bg-blue-700 hover:scale-105 hover:shadow-lg hover:transition duration-300">
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
