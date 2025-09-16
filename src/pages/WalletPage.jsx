import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../features/user/userSlice";
import { LogOut } from "lucide-react";

import CryptoLogo from "../assets/crypto/crypto-logo.png";
import ProfileLogo from "../assets/crypto/profile-logo.png";
import LayoutIcon from "../assets/icons/layout-board.svg";
import MarketIcon from "../assets/icons/trending-up.svg";
import TransactionsIcon from "../assets/icons/table.svg";
import WalletIcon from "../assets/icons/wallet.svg";
import ProfileIcon from "../assets/icons/user.svg";
import WalletPieChart from "../components/WalletPieChart";
import WalletLimitations from "../components/WalletLimitations";

function WalletPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.user.userData);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const wallet = {
    totalBalance: 50000,
    cryptocurrencies: [
      { symbol: "BTC", amount: 25000 },
      { symbol: "ETH", amount: 15000 },
      { symbol: "BNB", amount: 10000 },
    ],
    weeklySpent: 160,
    weeklyLimit: 200,
    monthlySpent: 2900,
    monthlyLimit: 3000,
  };

  const menuItems = [
    { label: "Home", path: "/home", icon: LayoutIcon },
    { label: "Market", path: "/market", icon: MarketIcon },
    { label: "Transactions", path: "/transactions", icon: TransactionsIcon },
    { label: "Wallet", path: "/wallet", icon: WalletIcon },
    { label: "Profile", path: "/profile", icon: ProfileIcon },
  ];

  const locationPath = location.pathname;

  return (
    <div className="flex h-screen w-full bg-black text-white font-sans">
      <aside className="w-[300px] bg-black flex flex-col items-center py-6 space-y-4">
        <h1 className="text-yellow-500 text-4xl font-bold tracking-wide">
          CRYPTO
        </h1>
        <img src={CryptoLogo} alt="Logo" className="w-[90px] h-[90px]" />
        <nav className="mt-8 w-full flex flex-col gap-4 px-4">
          {menuItems.map((item) => {
            const isActive = locationPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 px-4 py-3 rounded-md font-semibold text-2xl transition
                ${
                  isActive
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-500 hover:bg-gray-300 hover:bg-opacity-30 hover:text-white"
                }`}
              >
                <img
                  src={item.icon}
                  alt={`${item.label} icon`}
                  className={`w-7 h-7 transition ${
                    isActive
                      ? "filter brightness-150 sepia hue-rotate-10 saturate-200"
                      : ""
                  }`}
                />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 bg-gray-900 rounded-xl m-4 ml-2 p-6 overflow-y-auto flex flex-col items-center">
        <div className="w-[1314px] flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-3xl font-semibold">Wallet</h1>
            <div className="flex items-center gap-4">
              <img
                src={userData?.profileImage || ProfileLogo}
                alt="Profil"
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-gray-300 hover:text-gray-300 transition text-sm"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-lg font-bold hover:underline">
                  Log out
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-lg text-gray-400">Total balance :</span>
            <span className="text-5xl font-extrabold text-white">
              $
              {wallet.totalBalance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>

          <div className="flex gap-7 items-start">
            <WalletPieChart wallet={wallet} />

            <WalletLimitations
              weekly={wallet.weeklySpent}
              weeklyMax={wallet.weeklyLimit}
              monthly={wallet.monthlySpent}
              monthlyMax={wallet.monthlyLimit}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default WalletPage;
