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
<<<<<<< HEAD
import ComparePage from "./pages/ComparePage.jsx";
import ResetPassword from "./pages/ResetPassword";
=======
import ResetPassword from "./pages/ResetPassword";
import StaffOrdersPage from "./pages/staff/StaffOrderPage";
import StaffInvoicesPage from "./pages/staff/StaffInvoicePage"; // ← THÊM IMPORT
import StaffRoute from "./pages/staff/StaffRoute";
import ComparePage from "./pages/ComparePage.jsx";
>>>>>>> 61f0a6484b78d23a511441a38f59462b474488e3
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
          <Route path="/wishlists" element={<WishList />} />
          <Route path="/wishlists/:id" element={<WishlistDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<QrPayment />} />
        </Route>
<<<<<<< HEAD
=======
        
>>>>>>> 61f0a6484b78d23a511441a38f59462b474488e3
        {/* Pages without Header and Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget_password" element={<ForgotPassword />} />
<<<<<<< HEAD
         <Route path="/reset_password" element={<ResetPassword />} />
        {/* --- ĐÂY LÀ THAY ĐỔI QUAN TRỌNG --- */}
        {/* Bọc AdminDashboard bên trong AdminRoute */}
=======
        <Route path="/reset_password" element={<ResetPassword />} />
        
        {/* Admin Routes */}
>>>>>>> 61f0a6484b78d23a511441a38f59462b474488e3
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
<<<<<<< HEAD
=======

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
>>>>>>> 61f0a6484b78d23a511441a38f59462b474488e3
      </Routes>
    </>
  );
}

export default App;