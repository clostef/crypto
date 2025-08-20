<<<<<<< HEAD
<<<<<<< HEAD
=======
import React from "react";
>>>>>>> 5ea2cec (feat/17-wallet-overview)
=======
>>>>>>> 63daa22 (feat/17-wallet-overview)
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../features/user/userSlice";
import { LogOut } from "lucide-react";
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 5ea2cec (feat/17-wallet-overview)
=======

>>>>>>> 63daa22 (feat/17-wallet-overview)
import CryptoLogo from "../assets/crypto/crypto-logo.png";
import ProfileLogo from "../assets/crypto/profile-logo.png";
import LayoutIcon from "../assets/icons/layout-board.svg";
import MarketIcon from "../assets/icons/trending-up.svg";
import TransactionsIcon from "../assets/icons/table.svg";
import WalletIcon from "../assets/icons/wallet.svg";
import ProfileIcon from "../assets/icons/user.svg";
<<<<<<< HEAD
<<<<<<< HEAD
import WalletPieChart from "../components/WalletPieChart";
import WalletLimitations from "../components/WalletLimitations";
import WalletEvolutionChart from "../components/WalletEvolutionChart";

function WalletPage() {
=======

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function WalletPageMock() {
>>>>>>> 5ea2cec (feat/17-wallet-overview)
=======
import WalletPieChart from "../components/WalletPieChart";

function WalletPage() {
>>>>>>> 63daa22 (feat/17-wallet-overview)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.user.userData);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

<<<<<<< HEAD
<<<<<<< HEAD
=======
  // Données mock
>>>>>>> 5ea2cec (feat/17-wallet-overview)
=======
>>>>>>> eb07ade (feat/17-wallet-overview)
  const wallet = {
    totalBalance: 50000,
    cryptocurrencies: [
      { symbol: "BTC", amount: 25000 },
      { symbol: "ETH", amount: 15000 },
      { symbol: "BNB", amount: 10000 },
    ],
<<<<<<< HEAD
    weeklySpent: 160,
    weeklyLimit: 200,
    monthlySpent: 2900,
    monthlyLimit: 3000,
  };

=======
  };

<<<<<<< HEAD
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

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold",
          size: 14,
        },
        formatter: (value, context) => {
          return context.chart.data.labels[context.dataIndex];
        },
      },
    },
  };

  const distributions = wallet.cryptocurrencies.map((c) => ({
    symbol: c.symbol,
    percentage: ((c.amount / wallet.totalBalance) * 100).toFixed(2),
    amountInDollars: c.amount,
  }));

>>>>>>> 5ea2cec (feat/17-wallet-overview)
=======
>>>>>>> 63daa22 (feat/17-wallet-overview)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
      {/* Sidebar */}
>>>>>>> 5ea2cec (feat/17-wallet-overview)
=======
>>>>>>> eb07ade (feat/17-wallet-overview)
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

<<<<<<< HEAD
<<<<<<< HEAD
      <main className="flex-1 bg-gray-900 rounded-xl m-4 ml-2 p-6 overflow-y-auto flex flex-col items-center">
        <div className="w-[1314px] flex flex-col gap-6">
=======
      {/* Main content avec largeur fixe et centrée comme Transactions */}
=======
>>>>>>> eb07ade (feat/17-wallet-overview)
      <main className="flex-1 bg-gray-900 rounded-xl m-4 ml-2 p-6 overflow-y-auto flex flex-col items-center">
        <div className="w-[1314px] flex flex-col gap-10">
<<<<<<< HEAD
          {/* Header */}
>>>>>>> 5ea2cec (feat/17-wallet-overview)
=======
>>>>>>> eb07ade (feat/17-wallet-overview)
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

<<<<<<< HEAD
<<<<<<< HEAD
=======
          {/* Total Balance */}
>>>>>>> 5ea2cec (feat/17-wallet-overview)
=======
>>>>>>> eb07ade (feat/17-wallet-overview)
          <div className="flex items-center gap-3">
            <span className="text-lg text-gray-400">Total balance :</span>
            <span className="text-5xl font-extrabold text-white">
              $
              {wallet.totalBalance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          <div className="flex gap-7 items-start">
            <WalletPieChart wallet={wallet} />

            <WalletLimitations
              weekly={wallet.weeklySpent}
              weeklyMax={wallet.weeklyLimit}
              monthly={wallet.monthlySpent}
              monthlyMax={wallet.monthlyLimit}
            />
=======
          {/* Distribution + Pie Chart */}
=======
>>>>>>> eb07ade (feat/17-wallet-overview)
          <div className="bg-black p-6 rounded-lg flex flex-col gap-6 w-[332px] h-[628px] items-center">
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

            <div className="flex justify-center items-center mt-8">
              <div className="w-64 h-64">
                <Pie data={chartData} options={chartOptions} />
              </div>
            </div>
>>>>>>> 5ea2cec (feat/17-wallet-overview)
=======
          <div className="flex gap-6 items-start">
            <WalletPieChart wallet={wallet} />

            <div className="flex flex-col gap-6 flex-1">
              <WalletLimitations
                weekly={wallet.weeklySpent}
                weeklyMax={wallet.weeklyLimit}
                monthly={wallet.monthlySpent}
                monthlyMax={wallet.monthlyLimit}
              />

              <WalletEvolutionChart wallet={wallet} />
            </div>
>>>>>>> 2b709ed (feat/19-wallet-evolution-graph)
          </div>
=======
          <WalletPieChart wallet={wallet} />
>>>>>>> 63daa22 (feat/17-wallet-overview)
        </div>
      </main>
    </div>
  );
}

<<<<<<< HEAD
<<<<<<< HEAD
export default WalletPage;
=======
export default WalletPageMock;
>>>>>>> 5ea2cec (feat/17-wallet-overview)
=======
export default WalletPage;
>>>>>>> 63daa22 (feat/17-wallet-overview)
