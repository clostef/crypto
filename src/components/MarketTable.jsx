import { useEffect, useState } from "react";
import axios from "axios";

function MarketTable({ token }) {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await axios.get("http://localhost:3111/wallets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const rankedCryptos = res.data.cryptocurrencies.map(
          (crypto, index) => ({
            ...crypto,
            rank: index + 1,
            price: (Math.random() * 50000 + 0.1).toFixed(2),
            percentChange1h: parseFloat((Math.random() * 10 - 5).toFixed(1)),
            percentChange24h: parseFloat((Math.random() * 10 - 5).toFixed(1)),
            marketCap: Math.floor(Math.random() * 1_000_000_000_000),
          })
        );

        setCryptos(rankedCryptos);
      } catch (err) {
        console.error("Erreur chargement portefeuille:", err);
      }
    };

    if (token) fetchWallet();
  }, [token]);

  const getColorClass = (value) =>
    value > 0 ? "text-green-500" : value < 0 ? "text-red-500" : "text-gray-400";

  return (
    <div className="w-[1250px] h-[520px] overflow-y-auto border border-gray-200">
      <table className="w-full text-white text-sm border-separate border-spacing-0">
        <thead className="bg-gray-800 text-gray-400">
          <tr>
            <th className="p-4 border border-gray-200 text-left">#</th>
            <th className="p-4 border border-gray-200 text-left">Name</th>
            <th className="p-4 border border-gray-200 text-left">Price</th>
            <th className="p-4 border border-gray-200 text-left">1h %</th>
            <th className="p-4 border border-gray-200 text-left">24h %</th>
            <th className="p-4 border border-gray-200 text-left">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto, index) => (
            <tr
              key={crypto.symbol + index}
              className={index % 2 === 0 ? "bg-gray-900" : "bg-black"}
            >
              <td className="p-4 border border-gray-200">{crypto.rank}</td>
              <td className="p-4 border border-gray-200">
                <div className="flex items-center gap-2">
                  <img
                    src={crypto.icon}
                    alt={crypto.name}
                    className="w-5 h-5"
                  />
                  <span className="font-bold">{crypto.name}</span>
                  <span className="text-gray-400">{crypto.symbol}</span>
                </div>
              </td>
              <td className="p-4 border border-gray-200">
                ${parseFloat(crypto.price).toLocaleString()}
              </td>
              <td
                className={`p-4 border border-gray-200 ${getColorClass(
                  crypto.percentChange1h
                )}`}
              >
                {crypto.percentChange1h > 0 ? "+" : ""}
                {crypto.percentChange1h}%
              </td>
              <td
                className={`p-4 border border-gray-200 ${getColorClass(
                  crypto.percentChange24h
                )}`}
              >
                {crypto.percentChange24h > 0 ? "+" : ""}
                {crypto.percentChange24h}%
              </td>
              <td className="p-4 border border-gray-200">
                ${crypto.marketCap.toLocaleString("en-US")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MarketTable;
