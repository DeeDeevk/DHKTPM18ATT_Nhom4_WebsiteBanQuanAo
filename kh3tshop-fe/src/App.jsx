import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout"
import ForgotPassword from "./pages/ForgetPassword";
import About from "./pages/AboutUs";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Product from "./pages/Product";
import AdminRoute from "./pages/admin/AdminRoute";
function App() {
  return (
    <>
      <Routes>
        {/* Pages with Header and Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
        </Route>
        {/* Pages without Header and Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget_password" element={<ForgotPassword />} />
       {/* --- ĐÂY LÀ THAY ĐỔI QUAN TRỌNG --- */}
        {/* Bọc AdminDashboard bên trong AdminRoute */}
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } 
        />
      </Routes>
    </>
  );
}

export default App;
