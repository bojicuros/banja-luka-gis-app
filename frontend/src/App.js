import React from "react";
import Map from "./pages/Map/Map";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/Home";
import MainNavigation from "./components/MainNav/MainNavigation";
import NotFound from "./pages/NotFound/NotFound";

function App() {

  return (
    <BrowserRouter>
      <div className="wrapper">
        <MainNavigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
