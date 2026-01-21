import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../api";

function MarketTable({ currentPage, itemsPerPage }) {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await axios.get(`${API}/market`);
        const data = response.data.map((crypto, index) => ({
          ...crypto,
          rank: index + 1,
          percentChange1h: crypto.priceChange.hour,
          percentChange24h: crypto.priceChange.day,
        }));
        setCryptos(data);
      } catch (error) {
        console.error("Failed to fetch market data:", error);
      }
    };

    fetchMarketData();
  }, []);

  const getColorClass = (value) =>
    value > 0 ? "text-green-500" : value < 0 ? "text-red-500" : "text-gray-400";

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCryptos = cryptos.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full">
      <div className="hidden 2xl:block overflow-x-auto">
        <div className="min-w-[1100px] mx-auto border border-white">
          <table className="w-full text-white text-sm border-separate border-spacing-0">
            <thead className="bg-gray-800 text-gray-400">
              <tr>
                <th className="p-6 text-base border border-white text-left">
                  #
                </th>
                <th className="p-6 text-base border border-white text-left">
                  Name
                </th>
                <th className="p-6 text-base border border-white text-left">
                  Price
                </th>
                <th className="p-6 text-base border border-white text-left">
                  1h %
                </th>
                <th className="p-6 text-base border border-white text-left">
                  24h %
                </th>
                <th className="p-6 text-base border border-white text-left">
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
                  <td className="p-6 border border-white">{crypto.rank}</td>
                  <td className="p-6 border border-white">
                    <div className="flex items-center gap-2">
                      <img src={crypto.icon} alt="" className="w-5 h-5" />
                      <span className="font-bold">{crypto.name}</span>
                      <span className="text-gray-400">{crypto.symbol}</span>
                    </div>
                  </td>
                  <td className="p-6 border border-white">
                    ${Number(crypto.price).toLocaleString()}
                  </td>
                  <td
                    className={`p-6 border border-white ${getColorClass(
                      crypto.percentChange1h,
                    )}`}
                  >
                    {crypto.percentChange1h > 0 && "+"}
                    {crypto.percentChange1h}%
                  </td>
                  <td
                    className={`p-6 border border-white ${getColorClass(
                      crypto.percentChange24h,
                    )}`}
                  >
                    {crypto.percentChange24h > 0 && "+"}
                    {crypto.percentChange24h}%
                  </td>
                  <td className="p-6 border border-white">
                    ${crypto.marketCap.toLocaleString("en-US")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="2xl:hidden flex flex-col gap-4">
        {currentCryptos.map((crypto) => (
          <div
            key={crypto.symbol}
            className="bg-black border border-white rounded-xl p-4 flex flex-col gap-3 shadow-md transform transition-all duration-200 active:scale-[0.97] hover:shadow-xl"
          >
            <div className="flex items-center gap-3">
              <img src={crypto.icon} alt="" className="w-8 h-8" />
              <div>
                <p className="font-bold text-white">
                  {crypto.name}{" "}
                  <span className="text-gray-400">{crypto.symbol}</span>
                </p>
                <p className="text-sm text-gray-400">Rank #{crypto.rank}</p>
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Price</span>
              <span className="font-semibold">
                ${Number(crypto.price).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">1h</span>
              <span className={getColorClass(crypto.percentChange1h)}>
                {crypto.percentChange1h > 0 && "+"}
                {crypto.percentChange1h}%
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">24h</span>
              <span className={getColorClass(crypto.percentChange24h)}>
                {crypto.percentChange24h > 0 && "+"}
                {crypto.percentChange24h}%
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Market Cap</span>
              <span className="font-semibold">
                ${crypto.marketCap.toLocaleString("en-US")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketTable;
