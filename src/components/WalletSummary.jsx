import { Link } from "react-router-dom";

function WalletSummary({ wallet }) {
  if (!wallet?.cryptocurrencies?.length) return null;

  return (
    <div className="bg-amber-400 p-6 rounded-2xl flex flex-col shadow-lg w-[309px] h-[398px] font-sans text-black">
      <h2 className="text-3xl font-bold mb-3">Wallet</h2>

      <hr className="border-black mb-3" />

      <div className="flex flex-col flex-grow overflow-hidden">
        {wallet.cryptocurrencies.slice(0, 3).map((crypto) => (
          <div
            key={crypto.symbol}
            className="flex items-center justify-between gap-4 py-3 border-b border-black/80 last:border-b-0"
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
                <p className="text-lg font-semibold">{crypto.name}</p>
                <p className="text-sm text-black/70 font-semibold">
                  {crypto.symbol}
                </p>
              </div>
            </div>

            <div>
              <p className="text-lg font-bold">
                ${" "}
                {new Intl.NumberFormat("fr-FR", {
                  minimumFractionDigits: 2,
                }).format(crypto.amount)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/wallet"
        className="mt-auto inline-flex items-center text-black text-lg mx-auto group border-b-2 border-black gap-x-2"
      >
        <span>See all wallet</span>
        <span className="text-2xl">→</span>
      </Link>
    </div>
  );
}

export default WalletSummary;
