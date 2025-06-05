import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";
import arrowUp from "../assets/crypto/arrow-up.png";
import arrowDown from "../assets/crypto/arrow-down.png";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function CryptoCard({ crypto }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3111/charts/${crypto.symbol}/all`
        );
        const prices = res.data.map((point) => point.price);
        const dates = res.data.map((point) => point.date);

        setChartData({
          labels: dates,
          datasets: [
            {
              data: prices,
              borderColor:
                crypto.symbol === "BTC"
                  ? "#f7931a"
                  : crypto.symbol === "ETH"
                  ? "#ccc"
                  : crypto.symbol === "BNB"
                  ? "#f3ba2f"
                  : "#22c55e",
              borderWidth: 2,
              pointRadius: 0,
              tension: 0.4,
            },
          ],
        });
      } catch (err) {
        console.error("Erreur de chargement du graphique:", err);
      }
    };

    fetchChart();
  }, [crypto.symbol]);

  return (
    <div className="relative bg-[#0f0f0f] rounded-2xl w-64 h-40 text-white p-4 shadow-lg overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <img
            src={crypto.icon || "/default-icon.png"}
            alt={crypto.name}
            className="w-12 h-12 rounded-full bg-gray-800 p-1"
          />
          <div className="leading-tight">
            <h2 className="text-base font-semibold">{crypto.name}</h2>
            <p className="text-xs text-gray-500">{crypto.symbol}</p>
          </div>
        </div>
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            crypto.tendency === "up" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          <img
            src={crypto.tendency === "up" ? arrowUp : arrowDown}
            alt="Tendance"
            className="w-12 h-12"
          />
        </div>
      </div>

      <div className="absolute bottom-2 left-4">
        <p className="text-lg font-bold mb-1">
          $
          {crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
        <p
          className={`text-sm font-medium ${
            crypto.lastVariation >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {crypto.lastVariation >= 0 ? "+" : ""}
          {crypto.lastVariation} %
        </p>
      </div>

      <div className="absolute bottom-2 right-2 w-28 h-14">
        {chartData && (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                x: { display: false },
                y: { display: false },
              },
              elements: {
                line: { borderCapStyle: "round" },
              },
            }}
          />
        )}
      </div>
    </div>
  );
}

export default CryptoCard;
