import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./main.scss";
import Home from "./pages/Home/Home";
import Signin from "./pages/Signin/Signin";
import User from "./pages/User/User";
import Header from "./components/Header/Header";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sign-in" element={<Signin />}></Route>
        <Route path="/user" element={<User />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
