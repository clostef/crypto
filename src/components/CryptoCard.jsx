import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function CryptoCard({
  icon,
  name,
  symbol,
  price,
  lastVariation,
  tendency,
  chartColor,
  prices,
}) {
  const isUp = tendency === "up";

  const chartData = {
    labels: prices.map((_, index) => index),
    datasets: [
      {
        data: prices,
        borderColor: chartColor,
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: false },
      y: { display: false },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="bg-[#1C1C1E] p-4 rounded-xl w-64 shadow-md text-white relative">
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-2 items-center">
          <img src={icon} alt={name} className="w-8 h-8" />
          <div>
            <h2 className="text-sm font-semibold">{name}</h2>
            <p className="text-xs text-gray-400">{symbol}</p>
          </div>
        </div>
        <div
          className={`rounded-full w-6 h-6 flex items-center justify-center ${
            isUp ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {isUp ? <FaArrowUp size={12} /> : <FaArrowDown size={12} />}
        </div>
      </div>

      <p className="text-lg font-bold mb-1">${price.toLocaleString()}</p>
      <p className={`text-sm ${isUp ? "text-green-500" : "text-red-500"}`}>
        {isUp ? "+" : "-"}
        {Math.abs(lastVariation).toFixed(1)}%
      </p>

      <div className="h-16 mt-4">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default CryptoCard;
