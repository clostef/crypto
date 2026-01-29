import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../features/user/userSlice";
import { LogOut, Menu, X } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const menuItems = [
    { label: "Home", path: "/home", icon: LayoutIcon },
    { label: "Market", path: "/market", icon: MarketIcon },
    { label: "Transactions", path: "/transactions", icon: TransactionsIcon },
    { label: "Wallet", path: "/wallet", icon: WalletIcon },
    { label: "Profile", path: "/profile", icon: ProfileIcon },
  ];

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
      <aside className="w-[300px] bg-black flex flex-col items-center py-6 space-y-4 max-md:hidden">
        <h1 className="text-yellow-500 text-4xl font-bold tracking-wide">
          CRYPTO
        </h1>
        <img src={CryptoLogo} alt="Logo" className="w-[90px] h-[90px]" />

        <nav className="mt-8 w-full flex flex-col gap-4 px-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
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
                  alt=""
                  className={`w-7 h-7 ${
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

      <main className="flex-1 bg-gray-900 md:rounded-xl md:m-4 md:ml-2 p-6 overflow-y-auto relative">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-6">
          <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-gray-900 p-4 shadow-xl rounded-b-lg">
            <button onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-7 h-7 text-white" />
            </button>

            <h1 className="text-yellow-500 text-xl font-bold tracking-wide">
              Wallet
            </h1>

            <img
              src={userData?.profileImage || ProfileLogo}
              alt="Profil"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>

          <div className="h-[64px] md:hidden" />

          <div
            className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 transition-opacity duration-300
              ${
                isMobileMenuOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div
            className={`fixed top-0 left-0 z-50 h-full w-64 bg-black flex flex-col justify-between py-8 px-4 shadow-lg
            transform transition-transform duration-300
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="mb-8 text-white"
              >
                <X className="w-7 h-7" />
              </button>

              <img
                src={CryptoLogo}
                alt="Logo"
                className="w-[60px] h-[60px] mb-8"
              />

              <nav className="flex flex-col gap-4 w-full">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-semibold transition
                        ${
                          isActive
                            ? "bg-yellow-500 text-black"
                            : "text-zinc-400 hover:bg-gray-700 hover:text-white"
                        }`}
                    >
                      <img src={item.icon} alt="" className="w-6 h-6" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-lg font-semibold text-red-500 hover:bg-gray-700 hover:text-white transform transition duration-200 hover:scale-105 hover:shadow-lg"
            >
              <LogOut className="w-6 h-6" />
              Log Out
            </button>
          </div>

          <div className="hidden md:flex justify-between items-center">
            <h1 className="text-white text-3xl font-semibold">Wallet</h1>

            <div className="flex items-center gap-4">
              <img
                src={userData?.profileImage || ProfileLogo}
                alt="Profil"
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-gray-300 transform transition duration-200 hover:scale-105 hover:shadow-lg"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-lg font-bold">Log out</span>
              </button>
            </div>
          </div>

          <TotalBalanceWallet totalBalance={wallet.totalBalance} />

          <div className="flex flex-wrap gap-6 md:gap-10 justify-center">
            <div className="flex-grow min-w-[250px] max-w-[450px] w-full md:w-auto transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl">
              <WalletPieChart wallet={wallet} />
            </div>

            <div className="flex-grow min-w-[250px] max-w-[950px] w-full md:w-auto flex flex-col gap-6 transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl">
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
