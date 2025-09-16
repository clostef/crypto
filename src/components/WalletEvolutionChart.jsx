import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler
);

const periods = [
  { label: "1D", value: "1day" },
  { label: "7D", value: "7days" },
  { label: "1M", value: "1month" },
  { label: "1Y", value: "1year" },
  { label: "All", value: "all" },
];

export default function WalletEvolutionChart({ wallet }) {
  const [period, setPeriod] = useState("1day");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!wallet || !wallet.evolutions) return;

    const dataForPeriod =
      wallet.evolutions[period]?.map((d) => ({
        date: d.date,
        totalValue: d.amount,
      })) || [];

    setChartData(dataForPeriod);
  }, [wallet, period]);

  const data = {
    labels: chartData.map((d) => d.date),
    datasets: [
      {
        data: chartData.map((d) => d.totalValue),
        borderColor: "#FFD700",
        backgroundColor: "rgba(255, 215, 0, 0.1)",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#FFFFFF",
          autoSkip: false,
          callback: function (value, index) {
            const label = chartData[index]?.date;
            if (!label) return "";
            if (period === "1day") {
              const dateObj = new Date(label);
              const hours = dateObj.getHours().toString().padStart(2, "0");
              const minutes = dateObj.getMinutes().toString().padStart(2, "0");
              return `${hours}:${minutes}`;
            }
            return label;
          },
        },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: {
        ticks: { color: "#FFFFFF" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#222",
        titleColor: "#FFD700",
        bodyColor: "#fff",
      },
      datalabels: { display: false },
    },
  };

  return (
    <div className="bg-black rounded-2xl p-4 text-white shadow-xl flex flex-col w-[870px] h-[413px]">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-[30px] font-semibold leading-[36px] tracking-[-0.0075em] w-[250px] h-[36px]">
          Wallet Evolution
        </h2>
      </div>

      <div className="w-full h-px bg-[#94A3B8] mb-2" />

      <div className="flex gap-2 w-[220px] self-end h-[40px] bg-black rounded-[6px] border border-[#94A3B8] p-[4px_5px_4px_5px] mb-4">
        {periods.map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value)}
            className={`flex-1 text-center rounded-[6px] text-sm leading-[32px] ${
              period === p.value
                ? "bg-gray-400 text-white"
                : "bg-transparent text-white"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="relative w-full h-[320px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
