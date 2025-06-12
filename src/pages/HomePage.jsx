import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import CryptoCard from "../components/CryptoCard";
import WalletSummary from "../components/WalletSummary";

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
    <div className="h-full min-h-screen bg-gray-900 text-white px-6 py-4 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-300">Home</h1>

        <div className="flex items-center gap-4">
          <img
            src={
              userData?.profileImage ||
              "https://firebasestorage.googleapis.com/v0/b/code-up-31d9f.appspot.com/o/pro-projects-ressources%2Fcrypto%2Fprofile_crypto.png?alt=media"
            }
            alt="Profil"
            className="w-12 h-12 rounded-full object-cover"
          />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-gray-300 hover:underline"
          >
            <LogOut className="w-5 h-5" />
            Log out
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 mb-8">
        {cryptos.map((crypto) => (
          <CryptoCard key={crypto.id} crypto={crypto} />
        ))}
      </div>

      {wallet && <WalletSummary wallet={wallet} />}
    </div>
  );
}

export default HomePage;
