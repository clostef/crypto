import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const WalletPieChart = ({ wallet }) => {
  if (!wallet || !wallet.cryptocurrencies) return null;

<<<<<<< HEAD
  const colors = ["#f7931a", "#627eea", "#f3ba2f"];

  const distributions = wallet.cryptocurrencies.map((c, index) => ({
    symbol: c.symbol,
    percentage: ((c.amount / wallet.totalBalance) * 100).toFixed(2),
    amountInDollars: c.amount,
    color: colors[index % colors.length],
=======
  const distributions = wallet.cryptocurrencies.map((c) => ({
    symbol: c.symbol,
    percentage: ((c.amount / wallet.totalBalance) * 100).toFixed(2),
    amountInDollars: c.amount,
>>>>>>> 63daa22 (feat/17-wallet-overview)
  }));

  const chartData = {
    labels: wallet.cryptocurrencies.map((c) => c.symbol),
    datasets: [
      {
        data: wallet.cryptocurrencies.map((c) => c.amount),
<<<<<<< HEAD
        backgroundColor: colors,
=======
        backgroundColor: ["#f7931a", "#627eea", "#f3ba2f"],
>>>>>>> 63daa22 (feat/17-wallet-overview)
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
<<<<<<< HEAD
        font: { weight: "bold", size: 20 },
=======
        font: { weight: "bold", size: 14 },
>>>>>>> 63daa22 (feat/17-wallet-overview)
        formatter: (value, context) =>
          context.chart.data.labels[context.dataIndex],
      },
    },
  };

  return (
<<<<<<< HEAD
    <div className="bg-black p-6 rounded-xl flex flex-col gap-6 w-[420px] h-[628px] items-center">
      <div className="w-full border border-white rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Distribution</h2>
        <div className="space-y-4 text-white">
          {distributions.map(
            ({ symbol, percentage, amountInDollars, color }) => (
              <div
                key={symbol}
                className="flex items-center justify-between border-b border-gray-700 pb-2"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block w-4 h-4 rounded-full"
                    style={{ backgroundColor: color }}
                  ></span>
                  <span>{symbol}</span>
                </div>
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
=======
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
>>>>>>> 63daa22 (feat/17-wallet-overview)
        </div>
      </div>

      <div className="flex justify-center items-center mt-8">
<<<<<<< HEAD
        <div className="w-75 h-75">
=======
        <div className="w-64 h-64">
>>>>>>> 63daa22 (feat/17-wallet-overview)
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default WalletPieChart;
