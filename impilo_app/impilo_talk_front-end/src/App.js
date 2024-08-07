import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import SignInPage from "./pages/signin";
import About from "./pages/About";
import Testimonials from "./pages/Testimonials";
import AppointmentSetter from "../src/components/Appoinment"; // Adjust the path if necessary
import Navbar from "./components/Navbar"; // Adjust the path if necessary

function App() {
  return (
    <Router>
      <Navbar /> {/* Ensure Navbar is rendered on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/appointment" element={<AppointmentSetter />} />{" "}
        {/* Add the new route */}
      </Routes>
    </Router>
  );
}

export default App;
