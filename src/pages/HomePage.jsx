import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import CryptoCard from "../components/CryptoCard";
import WalletSummary from "../components/WalletSummary";
import CryptoChartCard from "../components/CryptoChartCard";
import CryptoLogo from "../assets/crypto/crypto-logo.png";
import ProfileLogo from "../assets/crypto/profile-logo.png";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const [cryptos, setCryptos] = useState([]);
  const [wallet, setWallet] = useState(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const res = await axios.get("http://localhost:3111/cryptos-cards-home");
        setCryptos(res.data);
      } catch (err) {
        console.error("Erreur chargement cryptos:", err);
      }
    };

    const fetchWallet = async () => {
      try {
        const res = await axios.get("http://localhost:3111/wallets", {
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
      {/* Sidebar */}
      <aside className="w-[350px] bg-black flex flex-col items-center py-6 space-y-4">
        <h1 className="text-yellow-500 text-4xl font-bold tracking-wide">
          CRYPTO
        </h1>
        <img src={CryptoLogo} alt="Logo" className="w-[90px] h-[90px]" />
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 bg-gray-900 rounded-xl m-4 ml-2 p-6 overflow-y-auto flex flex-col items-center">
        {/* Wrapper centré sans largeur fixe */}
        <div className="mx-auto inline-block">
          <div className="flex justify-between items-center mb-6">
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
            <div className="mb-6 flex items-center gap-3">
              <span className="text-lg text-gray-400">Total balance :</span>
              <span className="text-5xl font-extrabold text-white">
                $
                {wallet.totalBalance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          )}

          <div className="flex gap-6 mb-6 flex-wrap justify-center">
            {cryptos.map((crypto) => (
              <div
                key={crypto.id}
                className="flex-grow min-w-[250px] max-w-[350px]"
              >
                <CryptoCard crypto={crypto} />
              </div>
            ))}
          </div>

          <div className="flex gap-6 flex-wrap justify-center">
            <div className="flex-grow min-w-[250px] max-w-[350px]">
              <WalletSummary wallet={wallet} />
            </div>
            <div className="flex-grow min-w-[300px] max-w-[700px]">
              <CryptoChartCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
