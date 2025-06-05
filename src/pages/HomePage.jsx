import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import CryptoCard from "../components/CryptoCard";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [cryptos, setCryptos] = useState([]);

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
    fetchCryptos();
  }, []);

  return (
    <div className="h-screen bg-gray-900 text-white px-6 py-4 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-300">Home</h1>

        <div className="flex items-center gap-4">
          <img
            src={user.photoURL || "https://via.placeholder.com/40"}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-auto">
        {cryptos.map((crypto) => (
          <CryptoCard key={crypto.id} crypto={crypto} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
