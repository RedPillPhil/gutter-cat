import { ethers } from "ethers";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ABI } from "./ABI";
import Loader from "./Loader";

const Mint = ({ account }) => {
  const [isloading, setIsloading] = useState(false);
  const [number, setNumber] = useState(1);
  const [totalNumber, setTotalNumber] = useState(0.1);
  const [count, setCount] = useState(0);
  // const ContactAddress = "0x90d3Ebb0F4e98D3e759EF993eF78e3CFE582734C"; //test
  const ContactAddress = "0xE6d8133fE48781FDD9DCC036689DF049139b6cbd"; // main

  // GET TOTAL COUNT
  async function getTokenCount() {
    const testNode = "https://rinkeby.infura.io/v3/22dc00a515804b3fb98cff185e0a3f32"
    const mainNode = "https://mainnet.infura.io/v3/22dc00a515804b3fb98cff185e0a3f32"
    const provider = new ethers.providers.JsonRpcProvider(mainNode)
    const contract = new ethers.Contract(ContactAddress, ABI, provider);
    const result = await contract.tokenCounter();
    setCount(result.toNumber());
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

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(ContactAddress, ABI, signer);
      const gas = 250000 * 5;

      let Price = totalNumber.toFixed(1);
      const options = { value: ethers.utils.parseEther(Price), gasLimit: gas };
      let x = await contract.createCollectible(number, options);
      console.log(x)

      setTimeout(getTokenCount, 5000);
      toast.success("Successfully Collected!");
    } catch (err) {
      toast.error("There is an error!");
      console.log("Error: ", err);
    }
    setIsloading(false);
  }

  return (
    <div className="text-center w-[350px] md:w-[400px] pt-10 xl:pt-0 pb-20 xl:pb-0 text-white">
      <ToastContainer position="top-center" theme="colored" />
      <h1 className="font-bold text-gray-200 text-2xl mb-4 tracking-widest">
        MINT NOW
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
          {isloading ? <Loader /> : "MINT"}
        </button>
        <p className="text-sm font-semibold">{count} out of 10,000 minted</p>
      </div>
    </div>
  );
};

export default Mint;
