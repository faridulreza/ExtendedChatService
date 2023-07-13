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
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chatbot" element={<ChatBotPage />} />
        <Route path="/pdfshare" element={<PdfShare />} />
        <Route path="/pdf/:id" element={<SinglePdf />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
