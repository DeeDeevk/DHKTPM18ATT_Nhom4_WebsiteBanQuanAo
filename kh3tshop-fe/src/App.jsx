import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout"
<<<<<<< HEAD
import About from "./pages/AboutUs";
=======
<<<<<<< HEAD
import ForgotPassword from "./pages/ForgetPassword";
=======
import About from "./pages/AboutUs";
>>>>>>> 029ff79ef83b4cc03934b8aa4a1618e2982ef677
>>>>>>> d6adf18d0274ecb0dd59f51a326419f72dbd7b36
function App() {
  return (
    <>
      <Routes>
       {/* Pages with Header and Footer */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
      </Route>
      {/* Pages without Header and Footer */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget_password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
