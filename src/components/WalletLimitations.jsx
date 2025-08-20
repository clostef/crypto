function WalletLimitations({ weekly, weeklyMax, monthly, monthlyMax }) {
  const weeklyPercentage = Math.min((weekly / weeklyMax) * 100, 100);
  const monthlyPercentage = Math.min((monthly / monthlyMax) * 100, 100);

  const formatDollar = (value) =>
    `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <div className="bg-black p-5 rounded-xl text-white font-sans w-[981px] flex flex-col">
      <h2 className="text-3xl font-bold text-white">Limitations</h2>

      <div className="flex-1 flex flex-col justify-center items-center gap-3 mt-2">
        <div className="flex flex-col gap-2 w-full items-center">
          <div className="flex justify-between w-3/4 text-2xl text-white font-semibold">
            <span>Weekly</span>
            <span>{formatDollar(weekly)}</span>
          </div>
          <div className="flex items-center w-3/4">
            <div className="relative flex-1 h-3 bg-white rounded-full overflow-hidden">
              <div
                className="absolute h-3 bg-gray-800 rounded-full transition-all duration-300"
                style={{ width: `${weeklyPercentage}%` }}
              />
            </div>
            <span className="ml-3 text-sm text-gray-400">
              Max: {formatDollar(weeklyMax)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full items-center">
          <div className="flex justify-between w-3/4 text-2xl text-white font-semibold">
            <span>Monthly</span>
            <span>{formatDollar(monthly)}</span>
          </div>
          <div className="flex items-center w-3/4">
            <div className="relative flex-1 h-3 bg-white rounded-full overflow-hidden">
              <div
                className="absolute h-3 bg-gray-800 rounded-full transition-all duration-300"
                style={{ width: `${monthlyPercentage}%` }}
              />
            </div>
            <span className="ml-3 text-sm text-gray-400">
              Max: {formatDollar(monthlyMax)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletLimitations;
