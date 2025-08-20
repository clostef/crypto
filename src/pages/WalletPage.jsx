import React from "react";
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

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // ✅ import plugin

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels); // ✅ activation plugin

function WalletPageMock() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.user.userData);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Données mock
  const wallet = {
    totalBalance: 50000,
    cryptocurrencies: [
      { symbol: "BTC", amount: 25000 },
      { symbol: "ETH", amount: 15000 },
      { symbol: "BNB", amount: 10000 },
    ],
  };

  // Données pour le camembert
  const chartData = {
    labels: wallet.cryptocurrencies.map((c) => c.symbol),
    datasets: [
      {
        data: wallet.cryptocurrencies.map((c) => c.amount),
        backgroundColor: ["#f7931a", "#627eea", "#f3ba2f"],
        borderWidth: 0,
      },
    ],
  };

  // ✅ Modif ici : labels à l'intérieur du camembert
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // ❌ on enlève la légende externe
      },
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold",
          size: 14,
        },
        formatter: (value, context) => {
          return context.chart.data.labels[context.dataIndex]; // ✅ affiche BTC, ETH, BNB
        },
      },
    },
  };

  // Calcul pourcentages
  const distributions = wallet.cryptocurrencies.map((c) => ({
    symbol: c.symbol,
    percentage: ((c.amount / wallet.totalBalance) * 100).toFixed(2),
    amountInDollars: c.amount,
  }));

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
      {/* Sidebar */}
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

      {/* Main content avec largeur fixe et centrée comme Transactions */}
      <main className="flex-1 bg-gray-900 rounded-xl m-4 ml-2 p-6 overflow-y-auto flex flex-col items-center">
        {/* Conteneur centré avec largeur fixe identique */}
        <div className="w-[1314px] flex flex-col gap-10">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-white text-3xl font-semibold">Wallet</h1>
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

          {/* Total Balance */}
          <div className="flex items-center gap-3">
            <span className="text-lg text-gray-400">Total balance :</span>
            <span className="text-5xl font-extrabold text-white">
              $
              {wallet.totalBalance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>

          {/* Distribution + Pie Chart */}
          <div className="bg-black p-6 rounded-lg flex flex-col gap-6 w-[332px] h-[628px] items-center">
            {/* Distributions list avec encadré blanc */}
            <div className="w-full border border-white rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Distributions</h2>
              <div className="space-y-4 text-white">
                {distributions.map(
                  ({ symbol, percentage, amountInDollars }) => (
                    <div
                      key={symbol}
                      className="flex justify-between border-b border-gray-700 pb-2"
                    >
                      <span>{symbol}</span>
                      <span>{percentage}%</span>
                      <span>
                        $
                        {amountInDollars.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Pie Chart descendu */}
            <div className="flex justify-center items-center mt-8">
              <div className="w-64 h-64">
                <Pie data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WalletPageMock;
