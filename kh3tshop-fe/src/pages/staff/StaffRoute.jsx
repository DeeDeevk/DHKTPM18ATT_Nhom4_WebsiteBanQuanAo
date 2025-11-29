import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // npm install jwt-decode

/**
 * StaffRoute - Chỉ cho phép user có role STAFF truy cập
 */
const StaffRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  // 1. Không có token → về login
  if (!token) {
    alert("Bạn cần đăng nhập để truy cập khu vực nhân viên.");
    return <Navigate to="/login" replace />;
  }

  try {
    // 2. Giải mã token
    const decoded = jwtDecode(token);

    // Nhiều backend lưu role ở các key khác nhau, mình check cả các trường hợp phổ biến
    const role = 
      decoded.scope ||           // Spring Boot thường dùng scope = "ROLE_STAFF"
      decoded.role || 
      decoded.authorities || 
      decoded.roles || 
      null;

    // Nếu backend trả về mảng (ví dụ: ["ROLE_STAFF", "ROLE_USER"])
    const rolesArray = Array.isArray(role) ? role : (role ? [role] : []);

    // Kiểm tra có chứa STAFF không (không phân biệt chữ hoa/thường và tiền tố ROLE_)
    const isStaff = rolesArray.some(r => 
      r.toString().toUpperCase().includes("STAFF")
    );

    if (!isStaff) {
      alert("Bạn không có quyền truy cập khu vực nhân viên. Chỉ STAFF mới được phép.");
      return <Navigate to="/" replace />;
    }

    // Đã là STAFF → cho qua
    return children;

  } catch (error) {
    console.error("Token không hợp lệ hoặc đã hết hạn:", error);
    alert("Phiên đăng nhập không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại.");
    localStorage.removeItem("accessToken");
    return <Navigate to="/login" replace />;
  }
};

export default StaffRoute;