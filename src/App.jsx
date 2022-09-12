import Navbar from "./components/Navbar";
import BG from "./assets/bg.webp";
import "./components/app.css";

import { useState } from "react";
import Mint from "./components/Mint";
import Card from "./components/Card";

function App() {
  return (
    <div className="w-full h-screen bg-center bg-no-repeat bg-cover backgroundImage">
      <div className="container max-w-[1200px] mx-auto">
        <Navbar />
        <div className="relative z-10 xl:mt-32 grid place-items-center mt-6 md:grid-cols-2 gap-10">
          <Card />
          <Mint />
        </div>
      </div>
    </div>
  );
}

export default App;
