import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const WalletPieChart = ({ wallet }) => {
  if (!wallet || !wallet.cryptocurrencies) return null;

  const distributions = wallet.cryptocurrencies.map((c) => ({
    symbol: c.symbol,
    percentage: ((c.amount / wallet.totalBalance) * 100).toFixed(2),
    amountInDollars: c.amount,
  }));

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
      legend: { display: false },
      datalabels: {
        color: "#fff",
        font: { weight: "bold", size: 14 },
        formatter: (value, context) =>
          context.chart.data.labels[context.dataIndex],
      },
    },
  };

  return (
    <div className="bg-black p-6 rounded-lg flex flex-col gap-6 w-[332px] h-[628px] items-center">
      <div className="w-full border border-white rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Distributions</h2>
        <div className="space-y-4 text-white">
          {distributions.map(({ symbol, percentage, amountInDollars }) => (
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
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center mt-8">
        <div className="w-64 h-64">
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default WalletPieChart;
