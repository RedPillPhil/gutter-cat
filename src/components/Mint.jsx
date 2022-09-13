import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ethers } from "ethers";
import { ABI } from "./ABI";

import Loader from "./Loader";

const Mint = ({ account }) => {
  const [isloading, setIsloading] = useState(false);
  const [number, setNumber] = useState(1);
  const [totalNumber, setTotalNumber] = useState(0.1);
  const [DBcontract, setDBcontract] = useState("");
  const [count, setCount] = useState(0);

  /**
   * CONTRACT ADDRESS
   */
  const ContactAddress = "0xb1786d8de19aAc74aC1490F63ecdb3041F8BB5c1";

  const Init = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = await provider.getSigner();
    let Contract = new ethers.Contract(ContactAddress, ABI, signer);
    setDBcontract(Contract);
  };

  // GET TOTAL COUNT
  async function getTokenCount() {
    if (!account) {
      return;
    }
    if (DBcontract && account) {
      const result = await DBcontract.tokenCounter();
      setCount(result.toNumber());
    }
  }
  getTokenCount();

  // CREATE COLLECTION
  async function setCollectibleBulk() {
    setIsloading(true);
    if (!account) {
      toast.info("Please connect your Wallet first!");
      setIsloading(false);
      return;
    }
    if (DBcontract) {
      try {
        let Price = totalNumber.toFixed(1);

        console.log(number, Price); // CHECK BEFORE SEND

        const options = { value: ethers.utils.parseEther(Price) };
        await DBcontract.createCollectibleBulk(number, options);

        getTokenCount();
        toast.success("Successfully Collected!");
        setIsloading(false);
      } catch (err) {
        toast.error("There is an error!");
        console.log("Error: ", err);
        setIsloading(false);
      }
    }
  }

  useEffect(() => {
    Init();
  }, []);

  return (
    <div className="text-center w-[350px] md:w-[400px] pt-10 xl:pt-0 pb-20 xl:pb-0 text-white">
      <ToastContainer position="top-center" theme="colored" />
      <h1 className="font-bold text-gray-200 text-2xl mb-4">
        DNA-2 GUTTER JUICE
      </h1>
      <div className="bg-black/70 rounded-xl backdrop-blur-xl flex flex-col gap-6 px-6 py-10 text-xl">
        <div className="font-semibold">
          <span className="text-gray-400">Price:</span> <span>0.1</span>{" "}
          <span className="text-orange-500">ETH</span>
          <br />
          <span className="text-gray-400">Total Price: </span>
          <span>{totalNumber.toFixed(1)} </span>
          <span className="text-orange-500">ETH</span>
        </div>
        <div className="flex items-center justify-around px-6 my-2">
          Select Quantity :
          <button
            disabled={number == 1 ? true : false}
            className="w-8 h-8 bg-red-600 grid place-items-center rounded-full disabled:opacity-60"
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
            className="w-8 h-8 bg-red-600 grid place-items-center rounded-full disabled:opacity-60"
            onClick={() => {
              setNumber((e) => e + 1);
              setTotalNumber((e) => e + 0.1);
            }}
          >
            +
          </button>
        </div>
        <button
          onClick={setCollectibleBulk}
          type="button"
          disabled={isloading}
          className="text-white disabled:opacity-40 max-w-fit text-sm bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-500 font-medium rounded-lg py-2 px-6 mx-auto"
        >
          {isloading ? <Loader /> : "MINT PAUSED"}
        </button>
        <p className="text-sm font-semibold">{count} out of 4000 minted</p>
      </div>
    </div>
  );
};

export default Mint;
