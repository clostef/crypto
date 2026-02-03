import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { logout, editUser } from "../features/user/userSlice";
import { Menu, X, LogOut } from "lucide-react";

import CryptoLogo from "../assets/crypto/crypto-logo.png";
import ProfileLogo from "../assets/crypto/profile-logo.png";
import LayoutIcon from "../assets/icons/layout-board.svg";
import MarketIcon from "../assets/icons/trending-up.svg";
import TransactionsIcon from "../assets/icons/table.svg";
import WalletIcon from "../assets/icons/wallet.svg";
import ProfileIcon from "../assets/icons/user.svg";

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.user.userData);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    firstname: "",
    email: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name,
        firstname: userData.firstname,
        email: userData.email,
      });
    }
  }, [userData]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSave = () => {
    if (!formData.name || !formData.firstname || !formData.email) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Invalid email format.");
      return;
    }

    setError("");

    dispatch(editUser(formData))
      .unwrap()
      .then(() => {
        setSuccessMessage("Profile updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch((err) => setError(err || "Failed to update profile."));
  };

  const menuItems = [
    { label: "Home", path: "/home", icon: LayoutIcon },
    { label: "Market", path: "/market", icon: MarketIcon },
    { label: "Transactions", path: "/transactions", icon: TransactionsIcon },
    { label: "Wallet", path: "/wallet", icon: WalletIcon },
    { label: "Profile", path: "/profile", icon: ProfileIcon },
  ];

  return (
    <div className="flex h-screen w-full bg-black text-white font-sans">
      <aside className="w-[300px] bg-black flex flex-col items-center py-6 space-y-4 max-md:hidden">
        <h1 className="text-yellow-500 text-4xl font-bold">CRYPTO</h1>
        <img src={CryptoLogo} className="w-[90px] h-[90px]" />

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
        <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-gray-900 p-4 shadow-xl rounded-b-lg">
          <button onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-7 h-7 text-white" />
          </button>

          <h1 className="text-yellow-500 text-xl font-bold">Profile</h1>

          <img
            src={userData?.profileImage || ProfileLogo}
            className="w-10 h-10 rounded-full"
          />
        </div>

        <div className="h-[64px] md:hidden" />

        <div
          className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 transition-opacity duration-300
            ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={`fixed top-0 left-0 z-50 h-full w-64 bg-black flex flex-col justify-between py-8 px-4 shadow-lg
            transform transition-transform duration-300
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="mb-8">
              <X className="w-7 h-7" />
            </button>

            <img src={CryptoLogo} className="w-[60px] h-[60px] mb-8" />

            <nav className="flex flex-col gap-4">
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
                    <img src={item.icon} className="w-6 h-6" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-gray-700 rounded-lg transition transform hover:scale-105"
          >
            <LogOut className="w-6 h-6" />
            Log Out
          </button>
        </div>

        <div className="hidden md:flex justify-between items-center max-w-[1400px] mx-auto">
          <h1 className="text-3xl font-semibold">Profile</h1>

          <div className="flex items-center gap-4">
            <img
              src={userData?.profileImage || ProfileLogo}
              className="w-[50px] h-[50px] rounded-full"
            />
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 transform transition hover:scale-105"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-lg font-bold">Log out</span>
            </button>
          </div>
        </div>

        <div className="flex justify-center w-full mt-12">
          <div className="w-full max-w-[725px] h-[674px] bg-black rounded-xl p-6 flex flex-col gap-6 shadow-lg">
            <div className="flex justify-center">
              <img
                src={userData?.profileImage || ProfileLogo}
                className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] rounded-full"
              />
            </div>

            <p className="text-gray-500 text-center text-lg">
              See and save your profile information.
            </p>

            <form className="flex flex-col gap-4 items-center">
              {["name", "firstname", "email"].map((field) => (
                <div
                  key={field}
                  className="flex flex-col w-[250px] sm:w-[350px]"
                >
                  <label className="mb-1 text-sm capitalize">{field}</label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="bg-white text-black px-2 py-3 rounded-md"
                  />
                </div>
              ))}

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {successMessage && (
                <p className="text-green-500 text-sm">{successMessage}</p>
              )}

              <button
                type="button"
                onClick={handleSave}
                className="w-[250px] sm:w-[350px] bg-green-600 hover:bg-green-700 transition py-2 rounded-md font-semibold mt-4"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
