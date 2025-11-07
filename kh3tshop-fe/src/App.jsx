import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout"
function App() {
  return (
    <>
      <Routes>
       {/* Pages with Header and Footer */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Pages without Header and Footer */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
