import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="h-screen bg-gray-900 text-white px-6 py-4 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-300">Home</h1>

        <div className="flex items-center gap-4">
          <img
            src={user.photoURL || "https://via.placeholder.com/40"}
            alt="Profil"
            className="w-10 h-10 rounded-full object-cover"
          />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-gray-300 hover:underline"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <p className="text-gray-500">Bienvenue sur la page d'accueil</p>
      </div>
    </div>
  );
}

export default HomePage;
