import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import arrowUp from "../assets/crypto/arrow-up.png";
import arrowDown from "../assets/crypto/arrow-down.png";
import { API } from "../api";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function CryptoCard({ crypto }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await axios.get(`${API}/charts/${crypto.symbol}/all`);
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
    <div className="relative bg-[#0f0f0f] rounded-2xl w-full max-w-full lg:w-[420px] h-[180px] lg:h-[222px] text-white p-3 lg:p-4 shadow-lg overflow-hidden">
      <div className="flex justify-between items-center mb-3 lg:mb-4">
        <div className="flex items-center gap-3 lg:gap-5">
          <img
            src={crypto.icon || "/default-icon.png"}
            alt={crypto.name}
            className="w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-gray-800 p-1"
          />
          <div className="leading-tight">
            <h2 className="text-base lg:text-lg font-semibold">
              {crypto.name}
            </h2>
            <p className="text-xs text-gray-500">{crypto.symbol}</p>
          </div>
        </div>
        <div
          className={`w-10 h-10 lg:w-14 lg:h-14 rounded-full flex items-center justify-center ${
            crypto.tendency === "up" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          <img
            src={crypto.tendency === "up" ? arrowUp : arrowDown}
            alt="Tendance"
            className="w-8 h-8 lg:w-12 lg:h-12"
          />
        </div>
      </div>

      <div className="absolute bottom-2 left-3 lg:left-4">
        <p className="text-lg lg:text-xl font-bold mb-1">
          $
          {crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
        <p
          className={`text-base lg:text-lg font-medium ${
            crypto.lastVariation >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {crypto.lastVariation >= 0 ? "+" : ""}
          {crypto.lastVariation} %
        </p>
      </div>

      <div className="absolute bottom-2 right-2 w-20 h-10 lg:w-28 lg:h-14">
        {chartData && (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: { enabled: false },
                datalabels: { display: false },
              },
              scales: {
                x: { display: false },
                y: { display: false },
              },
              elements: {
                line: { borderCapStyle: "round" },
                point: { radius: 0 },
              },
            }}
          />
        )}
      </div>
    </div>
  );
}

export default CryptoCard;
