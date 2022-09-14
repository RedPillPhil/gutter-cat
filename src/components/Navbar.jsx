import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = ({ account, setAccount }) => {
  window.ethereum.on("accountsChanged", function (accounts) {
    setAccount(accounts[0]);
  });

  // CONNET WALLET
  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (err) {
      console.log("Could't connect!", err);
    }
  };

  // logout meta
  const logoutMeta = async () => {
    toast.success("Wallet Disconnected!");
    setAccount("");
  };

  return (
    <div className="w-full max-w-[1200px] xl:mt-4 fixed z-20">
      <ToastContainer position="top-center" theme="colored" />
      <div className="flex justify-between p-4">
        <h2 className="font-bold text-2xl text-white">Punk Rats Club</h2>
        <div className="flex gap-4">
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
          {account ? (
            <button
              className="text-white bg-gradient-to-br from-orange-500 to-red-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 py-2 px-4 font-semibold rounded-full disabled:opacity-80"
              onClick={logoutMeta}
            >
              Disconnect
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
