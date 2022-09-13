import { ethers } from "ethers";

const Navbar = ({ account, setAccount }) => {
  // CONNET WALLET
  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (err) {
      console.log("Could't connect!");
    }
  };

  return (
    <div className="w-full max-w-[1200px] xl:mt-4 fixed z-20">
      <div className="flex justify-between p-4">
        <h2 className="font-bold text-2xl text-white">Collections</h2>
        <button
          onClick={connectWallet}
          type="button"
          disabled={account ? true : false}
          className="text-white bg-gradient-to-br from-orange-500 to-red-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 py-2 px-4 font-semibold rounded-full disabled:opacity-80"
        >
          {account
            ? account.slice(0, 4) +
              "..." +
              account.slice(account.length - 4, account.length)
            : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
