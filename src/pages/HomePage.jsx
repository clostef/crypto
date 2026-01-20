import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/user/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import CryptoCard from "../components/CryptoCard";
import WalletSummary from "../components/WalletSummary";
import CryptoChartCard from "../components/CryptoChartCard";
import CryptoLogo from "../assets/crypto/crypto-logo.png";
import ProfileLogo from "../assets/crypto/profile-logo.png";
import LayoutIcon from "../assets/icons/layout-board.svg";
import MarketIcon from "../assets/icons/trending-up.svg";
import TransactionsIcon from "../assets/icons/table.svg";
import WalletIcon from "../assets/icons/wallet.svg";
import ProfileIcon from "../assets/icons/user.svg";
import { API } from "../api";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.user.userData);

  const [cryptos, setCryptos] = useState([]);
  const [wallet, setWallet] = useState(null);
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
    const fetchCryptos = async () => {
      const res = await axios.get(`${API}/cryptos-cards-home`);
      setCryptos(res.data);
    };

    const fetchWallet = async () => {
      const res = await axios.get(`${API}/wallets`, {
        headers: { Authorization: `Bearer ${userData?.token}` },
      });
      setWallet(res.data);
    };

    fetchCryptos();
    if (userData?.token) fetchWallet();
  }, [userData]);

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
              Crypto
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
              ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
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
            <div className="flex items-center gap-4">
              <h1 className="text-white text-3xl font-semibold">Home</h1>
            </div>

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

          {wallet?.totalBalance !== undefined && (
            <div className="flex items-center gap-3 max-md:flex-col max-md:items-start">
              <span className="text-lg text-gray-400">Total balance :</span>
              <span className="text-5xl font-extrabold text-white">
                $
                {wallet.totalBalance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          )}

          <div className="flex flex-wrap gap-6 justify-center">
            {cryptos.map((crypto) => (
              <div
                key={crypto.id}
                className="flex-grow min-w-[250px] max-w-[450px] w-full lg:w-auto transform transition duration-200 hover:scale-105 hover:shadow-lg"
              >
                <CryptoCard crypto={crypto} />
              </div>
            ))}
          </div>

          <div className="flex gap-6 flex-wrap justify-center">
            <div className="flex-grow min-w-[250px] max-w-[450px] transform transition duration-200 hover:scale-105 hover:shadow-lg">
              <WalletSummary wallet={wallet} />
            </div>

            <div className="flex-grow min-w-[300px] max-w-[950px] transform transition duration-200 hover:scale-105 hover:shadow-lg">
              <CryptoChartCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
