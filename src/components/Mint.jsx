import { ethers } from "ethers";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ABI } from "./ABI";
import Loader from "./Loader";

const Mint = ({ account }) => {
  const [isloading, setIsloading] = useState(false);
  const [number, setNumber] = useState(1);
  const [totalNumber, setTotalNumber] = useState(20000);
  const [count, setCount] = useState(0);
  // const ContactAddress = "0x90d3Ebb0F4e98D3e759EF993eF78e3CFE582734C"; //test
  const ContactAddress = "0x3aC22795304A27edb04Cfe2475DCEf0c5C8B5539"; // main

  // GET TOTAL COUNT
  async function getTokenCount() {
    const testNode = "https://rinkeby.infura.io/v3/22dc00a515804b3fb98cff185e0a3f32"
    const mainNode = "https://crab-rpc.darwinia.network"
    const provider = new ethers.providers.JsonRpcProvider(mainNode)
    const contract = new ethers.Contract(ContactAddress, ABI, provider);
    const result = await contract.totalSupply();
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

      let Price = totalNumber.toFixed(0);
      const options = { value: ethers.utils.parseEther(Price), gasLimit: gas };
      let x = await contract.mint(account, number);
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
        <span className="text-gray-400">Ringo Bingo's are a collection of 1000 burning hot NFTs living in the core of the blockchain. Each individual Ringo is 
    carefully curated from over many diferent traits, Some Ringo's are incredibly rare, and have traits that others could only dream of. 
    Our vision is to create an amazing project for the Darwinia ecosystem that will shed light, joy, love, creativity and ultimately help the ecosystem grow! To the moon Ringo!</span>
          <span className="text-gray-400">Price:</span> <span>20000</span>{" "}
          <span className="text-orange-500">CRAB</span>

        </div>

        <button
          onClick={setCollectibleBulk}
          type="button"
          disabled={isloading}
          className="text-white disabled:opacity-40 max-w-fit text-sm bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-500 font-medium rounded-lg py-2 px-6 mx-auto"
        >
          {isloading ? <Loader /> : "MINT"}
        </button>
        <p className="text-sm font-semibold">{count} out of 1,000 minted</p>
      </div>
    </div>
  );
};

export default Mint;
