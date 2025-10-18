import React from "react";
import HeroSlider from "./components/HeroSlider";
import "./index.css";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <HeroSlider />
    </div>
  );
}
