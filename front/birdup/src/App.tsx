import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/home";
import Signup from "./pages/signup";
import SignIn from "./pages/signin";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* wrap all other routes in parent layout with navbar */}
        <Route element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/flow/signup/" element={<Signup />} />
          <Route path="/flow/signin/" element={<SignIn />} />
        </Route>
      </Routes>
    </Router>
  );
}
