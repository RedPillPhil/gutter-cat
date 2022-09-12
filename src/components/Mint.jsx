import { useState } from "react";

const Mint = () => {
  const [number, setNumber] = useState(1);
  return (
    <div className="text-center max-w-[400px] text-white">
      <h1 className="font-bold text-gray-200 text-2xl mb-4">
        DNA-2 GUTTER JUICE
      </h1>
      <div className="bg-black/70 rounded-xl backdrop-blur-xl flex flex-col gap-6 px-6 py-10 text-lg">
        <div className="font-semibold">
          Price: <span>---</span> ETH &nbsp; Total Price: <span>---</span> ETH
        </div>
        <div className="flex items-center justify-around px-6 my-2">
          Select Quantity :
          <button
            disabled={number == 1 ? true : false}
            className="w-8 h-8 bg-blue-600 grid place-items-center rounded-full disabled:opacity-60"
            onClick={() => {
              setNumber((e) => e - 1);
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
            }}
          >
            +
          </button>
        </div>
        <button
          type="button"
          class="text-white max-w-fit text-md bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg py-2 px-6 mx-auto"
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
