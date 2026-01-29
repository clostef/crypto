function TotalBalanceWallet({ totalBalance }) {
  const formatDollar = (value) =>
    `$${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3">
      <span className="text-lg text-gray-400">Total balance :</span>
      <span className="text-5xl font-extrabold text-white">
        {formatDollar(totalBalance)}
      </span>
    </div>
  );
}

export default TotalBalanceWallet;
