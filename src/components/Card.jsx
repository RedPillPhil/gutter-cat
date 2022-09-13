import React from "react";
import NFT from "../assets/nft.gif";

const Card = () => {
  return (
    <div className="rounded-xl bg-black/70 w-[350px] md:w-[400px] overflow-hidden backdrop-blur-xl">
      <img className="w-full rounded-lg" src={NFT} alt="" />
      <h3 className="pb-6 text-center text-xl text-gray-300 font-bold">
        DNA-2 Gutter Juice
      </h3>
    </div>
  );
};

export default Card;
