import { Link } from "react-router-dom";

function WalletSummary({ wallet }) {
  if (!wallet?.cryptocurrencies?.length) return null;

  return (
    <div className="bg-amber-400 p-6 rounded-2xl flex flex-col w-80 mx-auto font-sans">
      <h2 className="text-black text-3xl font-bold mb-2">Wallet</h2>

      <hr className="border-black border-t-1 mb-3" />

      <div className="flex flex-col">
        {wallet.cryptocurrencies.slice(0, 3).map((crypto) => (
          <div
            key={crypto.symbol}
            className="flex items-center justify-between gap-4 py-4 border-b border-black/80 last:border-b-0"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                <img
                  src={crypto.icon}
                  alt={crypto.name}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <p className="text-black text-lg font">{crypto.name}</p>
                <p className="text-sm text-black/70 font-semibold">
                  {crypto.symbol}
                </p>
              </div>
            </div>

            <div>
              <p className="text-black text-lg font-bold">
                ${" "}
                {new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2 })
                  .format(crypto.amount)
                  .replace(",", ", ")}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/wallet"
        className="mt-6 inline-flex items-center text-black text-lg mx-auto group border-b-2 border-black gap-x-2"
      >
        <span>See all wallet</span>
        <span className="text-2xl">→</span>
      </Link>
    </div>
  );
}

export default WalletSummary;
