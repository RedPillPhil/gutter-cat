import { useState } from "react";

const Navbar = () => {
  const [account, setAccount] = useState("");
  // CONNET WALLET
  const connectWallet = async () => {
    if (!account) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (err) {
        console.log("Could't connect!");
      }
    }
  };

  return (
    <div className="flex justify-between p-4 relative z-10">
      <h2 className="font-bold text-2xl text-white">Gutter Cat Logo</h2>
      <button
        onClick={connectWallet}
        type="button"
        disabled={account ? true : false}
        class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 py-2 px-4 font-semibold rounded-full disabled:opacity-80"
      >
        {account
          ? account.slice(0, 4) +
            "..." +
            account.slice(account.length - 4, account.length)
          : "Connect Wallet"}
      </button>
    </div>
  );
};

export default Navbar;
