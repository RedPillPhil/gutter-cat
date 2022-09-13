import Navbar from "./components/Navbar";
import "./components/app.css";
import { useState } from "react";

import Mint from "./components/Mint";
import Card from "./components/Card";

function App() {
  const [account, setAccount] = useState("");

  return (
    <div className="w-full min-h-screen bg-center bg-no-repeat bg-cover backgroundImage">
      <div className="container max-w-[1200px] mx-auto box-border">
        <Navbar account={account} setAccount={setAccount} />
        <div className="w-full min-h-screen pt-[100px] xl:pt-0 relative z-10 grid place-items-center md:grid-cols-2 md:gap-10">
          <Card />
          <Mint account={account} />
        </div>
      </div>
    </div>
  );
}

export default App;
