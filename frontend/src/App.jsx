import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./App.css";
import About from "./pages/About";
import ChatBotPage from "./pages/ChatBotPage";
import PdfShare from "./pages/PdfShare";
import SinglePdf from "./pages/SinglePdf";

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<PdfShare />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chatbot" element={<ChatBotPage />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
