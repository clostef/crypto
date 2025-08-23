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

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.user.userData);

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
        <div className="w-full flex flex-col gap-6 items-center">
          <div className="w-full flex justify-between items-center max-w-[1314px]">
            <h1 className="text-white text-3xl font-semibold">Profile</h1>
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

          <div className="flex justify-center w-full">
            <div className="w-full max-w-[725px] h-[674px] bg-black rounded-xl p-6 flex flex-col gap-6 shadow-lg mt-12">
              <div className="flex justify-center">
                <img
                  src={userData?.profileImage || ProfileLogo}
                  alt="Profile avatar"
                  className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] rounded-full object-cover"
                />
              </div>

              <p className="text-gray-500 text-lg text-center mt-1">
                See and save your profile information.
              </p>

              <form className="flex flex-col gap-4 items-center">
                <div className="flex flex-col w-[250px] sm:w-[350px]">
                  <label className="text-white mb-1 text-xs sm:text-sm">
                    Name
                  </label>
                  <input
                    type="text"
                    value={userData?.name || ""}
                    disabled
                    className="w-full bg-white border border-zinc-700 rounded-md px-2 py-3 text-xs sm:text-sm text-black"
                  />
                  <p className="text-gray-500 text-[11px] sm:text-xs mt-2">
                    Enter your name
                  </p>
                </div>

                <div className="flex flex-col w-[250px] sm:w-[350px]">
                  <label className="text-white mb-1 text-xs sm:text-sm">
                    Firstname
                  </label>
                  <input
                    type="text"
                    value={userData?.firstname || ""}
                    disabled
                    className="w-full bg-white border border-zinc-700 rounded-md px-2 py-3 text-xs sm:text-sm text-black"
                  />
                  <p className="text-gray-500 text-[11px] sm:text-xs mt-2">
                    Enter your firstname
                  </p>
                </div>

                <div className="flex flex-col w-[250px] sm:w-[350px]">
                  <label className="text-white mb-1 text-xs sm:text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    value={userData?.email || ""}
                    disabled
                    className="w-full bg-white border border-zinc-700 rounded-md px-2 py-3 text-xs sm:text-sm text-black"
                  />
                  <p className="text-gray-500 text-[11px] sm:text-xs mt-2">
                    Enter your email
                  </p>
                </div>

                <button
                  type="button"
                  className="w-[250px] sm:w-[350px] bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition mt-5"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
