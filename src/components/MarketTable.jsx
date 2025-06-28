import { useEffect, useState } from "react";
import axios from "axios";

function MarketTable({ currentPage, itemsPerPage }) {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get("http://localhost:3111/market");
        const data = response.data.map((crypto, index) => ({
          ...crypto,
          rank: index + 1,
          percentChange1h: crypto.priceChange.hour,
          percentChange24h: crypto.priceChange.day,
        }));
        setCryptos(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données du marché:",
          error
        );
      }
    };

    fetchMarketData();
  }, []);

  const getColorClass = (value) =>
    value > 0 ? "text-green-500" : value < 0 ? "text-red-500" : "text-gray-400";

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCryptos = cryptos.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-[1250px] overflow-y-auto border border-gray-200">
      <table className="w-full text-white text-sm border-separate border-spacing-0">
        <thead className="bg-gray-800 text-gray-400">
          <tr>
            <th className="p-6 text-base border border-gray-200 text-left">
              #
            </th>
            <th className="p-6 text-base border border-gray-200 text-left">
              Name
            </th>
            <th className="p-6 text-base border border-gray-200 text-left">
              Price
            </th>
            <th className="p-6 text-base border border-gray-200 text-left">
              1h %
            </th>
            <th className="p-6 text-base border border-gray-200 text-left">
              24h %
            </th>
            <th className="p-6 text-base border border-gray-200 text-left">
              Market Cap
            </th>
          </tr>
        </thead>
        <tbody>
          {currentCryptos.map((crypto, index) => (
            <tr
              key={crypto.symbol + index}
              className={index % 2 === 0 ? "bg-gray-900" : "bg-black"}
            >
              <td className="p-6 text-base border border-gray-200">
                {crypto.rank}
              </td>
              <td className="p-6 text-base border border-gray-200">
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
              <td className="p-6 text-base border border-gray-200">
                ${parseFloat(crypto.price).toLocaleString()}
              </td>
              <td
                className={`p-6 text-base border border-gray-200 ${getColorClass(
                  crypto.percentChange1h
                )}`}
              >
                {crypto.percentChange1h > 0 ? "+" : ""}
                {crypto.percentChange1h}%
              </td>
              <td
                className={`p-6 text-base border border-gray-200 ${getColorClass(
                  crypto.percentChange24h
                )}`}
              >
                {crypto.percentChange24h > 0 ? "+" : ""}
                {crypto.percentChange24h}%
              </td>
              <td className="p-6 text-base border border-gray-200">
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
