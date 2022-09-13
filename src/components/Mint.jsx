import { useState } from "react";

const Mint = () => {
  const [number, setNumber] = useState(1);
  const [totalNumber, setTotalNumber] = useState(0.1);
  return (
    <div className="text-center w-[350px] md:w-[400px] pt-10 xl:pt-0 pb-20 xl:pb-0 text-white">
      <h1 className="font-bold text-gray-200 text-2xl mb-4">
        DNA-2 GUTTER JUICE
      </h1>
      <div className="bg-black/70 rounded-xl backdrop-blur-xl flex flex-col gap-6 px-6 py-10 text-xl">
        <div className="font-semibold">
          <span className="text-gray-400">Price:</span> <span>0.1</span>{" "}
          <span className="text-green-500">ETH</span>
          <br />
          <span className="text-gray-400">Total Price: </span>
          <span>{totalNumber.toFixed(1)} </span>
          <span className="text-green-500">ETH</span>
        </div>
        <div className="flex items-center justify-around px-6 my-2">
          Select Quantity :
          <button
            disabled={number == 1 ? true : false}
            className="w-8 h-8 bg-blue-600 grid place-items-center rounded-full disabled:opacity-60"
            onClick={() => {
              setNumber((e) => e - 1);
              setTotalNumber((e) => e - 0.1);
            }}
          >
            -
          </button>
          <span className="font-bold text-lg"> {number} </span>
          <button
            disabled={number == 5 ? true : false}
            className="w-8 h-8 bg-blue-600 grid place-items-center rounded-full disabled:opacity-60"
            onClick={() => {
              setNumber((e) => e + 1);
              setTotalNumber((e) => e + 0.1);
            }}
          >
            +
          </button>
        </div>
        <button
          type="button"
          className="text-white max-w-fit text-sm bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg py-2 px-6 mx-auto"
        >
          MINT PAUSED
        </button>
        <p className="text-sm font-semibold">0 out of 4000 minted</p>
        <p className="text-sky-400 text-sm font-semibold">Drop Mechanics</p>
      </div>
    </div>
  );
};

export default Mint;
