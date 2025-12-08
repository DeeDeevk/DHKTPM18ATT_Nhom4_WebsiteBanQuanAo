import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Layout from "./components/Layout";
import ForgotPassword from "./pages/ForgetPassword";
import About from "./pages/AboutUs";
import WishList from "./pages/WishList";
import WishlistDetail from "./pages/WishListDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Product from "./pages/Product";
import AdminRoute from "./pages/admin/AdminRoute";
import Policy from "./pages/Policy";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import { Toaster } from "sonner";
import QrPayment from "./pages/QrPayment";
import ComparePage from "./pages/ComparePage.jsx";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile.jsx";
import StaffOrdersPage from "./pages/staff/StaffOrderPage";
import StaffInvoicesPage from "./pages/staff/StaffInvoicePage"; // ← THÊM IMPORT
import StaffRoute from "./pages/staff/StaffRoute";
import Order from "./pages/Order.jsx";
function App() {
  return (
    <>
      <Toaster richColors closeButton position="top-right" />
      <Routes>
        {/* Pages with Header and Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlists" element={<WishList />} />
          <Route path="/wishlists/:id" element={<WishlistDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<QrPayment />} />
          <Route path="/orders" element={<Order />} />
        </Route>
        {/* Pages without Header and Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget_password" element={<ForgotPassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        {/* --- ĐÂY LÀ THAY ĐỔI QUAN TRỌNG --- */}
        {/* Bọc AdminDashboard bên trong AdminRoute */}

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Staff Routes - THÊM 2 ROUTES MỚI */}
        <Route
          path="/staff/orders"
          element={
            <StaffRoute>
              <StaffOrdersPage />
            </StaffRoute>
          }
        />
        <Route
          path="/staff/invoices"
          element={
            <StaffRoute>
              <StaffInvoicesPage />
            </StaffRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
