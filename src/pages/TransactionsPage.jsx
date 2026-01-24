import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../features/user/userSlice";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import CryptoLogo from "../assets/crypto/crypto-logo.png";
import ProfileLogo from "../assets/crypto/profile-logo.png";
import LayoutIcon from "../assets/icons/layout-board.svg";
import MarketIcon from "../assets/icons/trending-up.svg";
import TransactionsIcon from "../assets/icons/table.svg";
import WalletIcon from "../assets/icons/wallet.svg";
import ProfileIcon from "../assets/icons/user.svg";
import TransactionTable from "../components/TransactionTable";

function TransactionsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.user.userData);

  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const itemsPerPage = 6;
  const totalPages = 3;

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

      <main className="flex-1 bg-gray-900 md:rounded-xl md:m-4 md:ml-2 p-6 overflow-y-auto flex flex-col items-center w-full">
        <div className="w-full max-w-[1400px] flex flex-col gap-10">
          <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-gray-900 p-4 shadow-xl rounded-b-lg">
            <button onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-7 h-7 text-white" />
            </button>

            <h1 className="text-yellow-500 text-xl font-bold tracking-wide">
              Transactions
            </h1>

            <img
              src={userData?.profileImage || ProfileLogo}
              alt="Profil"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>

          <div className="h-[64px] md:hidden" />

          <div
            className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity
              ${
                isMobileMenuOpen
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div
            className={`fixed top-0 left-0 z-50 h-full w-64 bg-black flex flex-col justify-between py-8 px-4
              transform transition-transform duration-300
              ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="mb-8"
              >
                <X className="w-7 h-7 text-white" />
              </button>

              <img
                src={CryptoLogo}
                alt="Logo"
                className="w-[60px] h-[60px] mb-8"
              />

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
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold
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
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-red-500 hover:bg-gray-700 hover:text-white"
            >
              <LogOut className="w-6 h-6" />
              Log Out
            </button>
          </div>

          <div className="hidden md:flex justify-between items-center">
            <h1 className="text-white text-3xl font-semibold">Transactions</h1>

            <div className="flex items-center gap-4">
              <img
                src={userData?.profileImage || ProfileLogo}
                alt="Profil"
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-gray-300 hover:scale-105 transition"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-lg font-bold">Log out</span>
              </button>
            </div>
          </div>

          <div className="w-full bg-black border border-gray-700 rounded-xl p-6 shadow-2xl">
            <TransactionTable
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />

            <div className="flex justify-center mt-9 mb-8">
              <div className="hidden md:flex gap-3">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                >
                  &lt; Previous
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded border font-bold ${
                      currentPage === i + 1
                        ? "bg-black text-white border-white"
                        : "text-white border-gray-600 hover:border-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                >
                  Next &gt;
                </button>
              </div>

              <div className="flex md:hidden gap-3">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded border font-bold ${
                      currentPage === i + 1
                        ? "bg-black text-white border-white"
                        : "text-white border-gray-600 hover:border-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TransactionsPage;
