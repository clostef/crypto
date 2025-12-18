import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../features/user/userSlice";
import { LogOut } from "lucide-react";
import { API } from "../api";

import CryptoLogo from "../assets/crypto/crypto-logo.png";
import ProfileLogo from "../assets/crypto/profile-logo.png";
import LayoutIcon from "../assets/icons/layout-board.svg";
import MarketIcon from "../assets/icons/trending-up.svg";
import TransactionsIcon from "../assets/icons/table.svg";
import WalletIcon from "../assets/icons/wallet.svg";
import ProfileIcon from "../assets/icons/user.svg";
import WalletPieChart from "../components/WalletPieChart";
import WalletLimitations from "../components/WalletLimitations";
import WalletEvolutionChart from "../components/WalletEvolutionChart";
import TotalBalanceWallet from "../components/TotalBalanceWallet";

function WalletPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.user.userData);

  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    if (!userData?.token) return;

    fetch(`${API}/wallets`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur API");
        return res.json();
      })
      .then((data) => {
        setWallet(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur fetch wallets:", err);
        setLoading(false);
      });
  }, [userData]);

  const menuItems = [
    { label: "Home", path: "/home", icon: LayoutIcon },
    { label: "Market", path: "/market", icon: MarketIcon },
    { label: "Transactions", path: "/transactions", icon: TransactionsIcon },
    { label: "Wallet", path: "/wallet", icon: WalletIcon },
    { label: "Profile", path: "/profile", icon: ProfileIcon },
  ];

  const locationPath = location.pathname;

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-white">
        Chargement...
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-red-500">
        Impossible de charger le wallet
      </div>
    );
  }

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

          <TotalBalanceWallet totalBalance={wallet.totalBalance} />

          <div className="flex gap-6 items-start">
            <WalletPieChart wallet={wallet} />

            <div className="flex flex-col gap-6 flex-1">
              <WalletLimitations
                weekly={wallet.limitations.weekly.current}
                weeklyMax={wallet.limitations.weekly.limit}
                monthly={wallet.limitations.monthly.current}
                monthlyMax={wallet.limitations.monthly.limit}
              />

              <WalletEvolutionChart wallet={wallet} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WalletPage;
