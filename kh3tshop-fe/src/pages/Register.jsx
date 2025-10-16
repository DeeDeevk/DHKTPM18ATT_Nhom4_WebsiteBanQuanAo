import React from "react";

const Register = () => {
  return (
    <div className="grid place-items-center min-h-screen bg-gray-50">
      <form className="grid gap-4 p-6 bg-white rounded-lg shadow-md w-90">
        <h2 className="font-bold text-2xl text-center">Đăng ký</h2>
        <div className="grid gap-1">
          <label className="font-semibold text-sm">Họ và tên: </label>
          <input
            type="text"
            name="full_name"
            className="border-2 rounded-sm px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Họ và tên..."
          ></input>
        </div>
        <div className="grid gap-1">
          <label className="font-semibold text-sm">Số điện thoại: </label>
          <input
            type="text"
            name="phone_number"
            className="border-2 rounded-sm px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Số điện thoại..."
          ></input>
        </div>
        <div className="grid gap-1">
          <label className="font-semibold text-sm">Email: </label>
          <input
            type="email"
            name="email"
            className="border-2 rounded-sm px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email..."
          ></input>
        </div>
        <div className="grid gap-1">
          <label className="font-semibold text-sm">Giới tính: </label>
          <div className="flex gap-5">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="gender"
                value="Male"
                className="accent-blue-500"
                defaultChecked
              />
              Nam
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="gender"
                value="Female"
                className="accent-pink-500"
              />
              Nữ
            </label>
          </div>
        </div>
        <div className="grid gap-1">
          <label className="font-semibold text-sm">Sinh nhật: </label>
          <input
            type="date"
            name="date"
            className="border-2 rounded-sm px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></input>
        </div>
        <div className="grid gap-1">
          <label className="font-semibold text-sm">Mật khẩu: </label>
          <input
            type="text"
            name="password"
            className="border-2 rounded-sm px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Mật khẩu..."
          ></input>
        </div>
        <div className="grid gap-1">
          <label className="font-semibold text-sm">Nhập lại mật khẩu: </label>
          <input
            type="text"
            name="password_confirmed"
            className="border-2 rounded-sm px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nhập lại mật khẩu..."
          ></input>
        </div>
        <div>
          <button className="border-2 w-full text-center rounded-sm py-1 bg-blue-500 border-white text-white hover:bg-blue-600 hover:scale-105 hover:shadow-lg hover:transition duration-300">
            Đăng ký
          </button>
          <button className="border-2 w-full text-center rounded-sm py-1 bg-gray-500 border-white text-white hover:bg-gray-500 hover:scale-105 hover:shadow-lg hover:transition duration-300">Quay lại</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
