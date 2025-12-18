import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/user/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
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
      try {
        const res = await axios.get(`${API}/cryptos-cards-home`);
        setCryptos(res.data);
      } catch (err) {
        console.error("Erreur chargement cryptos:", err);
      }
    };

    const fetchWallet = async () => {
      try {
        const res = await axios.get(`${API}/wallets`, {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        });
        setWallet(res.data);
      } catch (err) {
        console.error("Erreur chargement wallet:", err.response || err.message);
      }
    };

    fetchCryptos();
    if (userData?.token) {
      fetchWallet();
    }
  }, [userData]);

  return (
    <div className="flex h-screen w-full bg-black text-white font-sans">
      <aside className="w-[300px] bg-black flex flex-col items-center py-6 space-y-4">
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
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-3xl font-semibold">Home</h1>
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

          {wallet?.totalBalance !== undefined && (
            <div className="flex items-center gap-3">
              <span className="text-lg text-gray-400">Total balance :</span>
              <span className="text-5xl font-extrabold text-white">
                $
                {wallet.totalBalance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          )}

          <div className="flex gap-6 flex-wrap justify-center">
            {cryptos.map((crypto) => (
              <div
                key={crypto.id}
                className="flex-grow min-w-[250px] max-w-[450px]"
              >
                <CryptoCard crypto={crypto} />
              </div>
            ))}
          </div>

          <div className="flex gap-6 flex-wrap justify-center">
            <div className="flex-grow min-w-[250px] max-w-[550px]">
              <WalletSummary wallet={wallet} />
            </div>
            <div className="flex-grow min-w-[300px] max-w-[1015px]">
              <CryptoChartCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
