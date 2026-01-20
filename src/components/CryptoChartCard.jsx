import { useEffect, useState } from "react";
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
import { API } from "../api";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
);

const periods = [
  { label: "1D", value: "1day" },
  { label: "7D", value: "7days" },
  { label: "1M", value: "1month" },
  { label: "1Y", value: "1year" },
  { label: "All", value: "all" },
];

export default function CryptoChartCard() {
  const [crypto, setCrypto] = useState("BTC");
  const [period, setPeriod] = useState("1day");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch(`${API}/charts/${crypto}/${period}`)
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.sort(
          (a, b) => new Date(a.date) - new Date(b.date),
        );
        setChartData(sortedData);
      })
      .catch((err) => console.error(err));
  }, [crypto, period]);

  const formatLabel = (isoString) => {
    const date = new Date(isoString);
    if (period === "1day") {
      return date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (period === "all") {
      return date.getFullYear();
    } else {
      return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
      });
    }
  };

  const data = {
    labels: chartData.map((d) => formatLabel(d.date)),
    datasets: [
      {
        data: chartData.map((d) => d.price),
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
          autoSkip: true,
          maxTicksLimit: window.innerWidth < 768 ? 6 : 12,
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
    <div className="bg-black rounded-[15px] p-3 lg:p-4 text-white shadow-xl flex flex-col w-full max-w-full lg:w-[890px] h-[350px] lg:h-[410px]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
        <h2 className="text-2xl lg:text-[30px] font-semibold lg:leading-[36px] lg:tracking-[-0.0075em]">
          {crypto}
        </h2>

        <div className="relative w-full sm:w-[122px]">
          <select
            className="appearance-none w-full h-[36px] lg:h-[40px] rounded-[6px] border border-[#CBD5E1] bg-black text-white px-[12px] pr-[36px] py-[8px] text-sm lg:text-base"
            value={crypto}
            onChange={(e) => setCrypto(e.target.value)}
          >
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="BNB">BNB</option>
          </select>
          <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
            <svg
              className="w-4 h-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-[#94A3B8] mb-2" />

      <div className="flex gap-1 lg:gap-2 w-full sm:w-[220px] sm:self-end h-[36px] lg:h-[40px] bg-black rounded-[6px] border border-[#94A3B8] p-[4px_5px_4px_5px] mb-3 lg:mb-4">
        {periods.map((p) => (
          <button
            key={p.value}
            onClick={() => setPeriod(p.value)}
            className={`flex-1 text-center rounded-[6px] text-xs lg:text-sm lg:leading-[32px] ${
              period === p.value
                ? "bg-gray-400 text-white"
                : "bg-transparent text-white"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="relative w-full flex-1 min-h-[200px] lg:h-[250px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
