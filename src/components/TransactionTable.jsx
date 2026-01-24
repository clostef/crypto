import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { API } from "../api";

function TransactionTable({ currentPage, itemsPerPage }) {
  const [transactions, setTransactions] = useState([]);
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await axios.get(`${API}/transactions`, {
          headers: { Authorization: `Bearer ${userData?.token}` },
        });
        setTransactions(res.data);
      } catch (error) {
        console.error("Erreur transactions :", error);
      }
    }
    if (userData?.token) fetchTransactions();
  }, [userData]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];

    if (sortField === "date") {
      valA = new Date(valA).getTime();
      valB = new Date(valB).getTime();
    }

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransactions = sortedTransactions.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const amountColor = (value) =>
    value > 0 ? "text-green-500" : value < 0 ? "text-red-500" : "text-gray-400";

  const SortArrow = ({ field }) => {
    if (sortField !== field) return null;
    return (
      <span
        className={`inline-block text-xs text-blue-400 transition-transform duration-200 ${
          sortOrder === "asc" ? "rotate-0" : "rotate-180"
        }`}
      >
        ▲
      </span>
    );
  };

  return (
    <div className="w-full">
      <div className="hidden 2xl:block overflow-x-auto">
        <div className="min-w-[1100px] mx-auto border border-white">
          <table className="w-full text-white text-sm border-separate border-spacing-0">
            <thead className="bg-gray-800 text-gray-400">
              <tr>
                {["name", "date", "amount", "fee"].map((field) => (
                  <th
                    key={field}
                    className="p-6 text-base border border-white text-left cursor-pointer select-none"
                  >
                    <div className="flex items-center justify-between">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                      <button
                        onClick={() => handleSort(field)}
                        className="ml-2 w-6 h-6 flex items-center justify-center border border-blue-400 rounded hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        <SortArrow field={field} />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((tx, index) => (
                <tr
                  key={tx.id}
                  className={index % 2 === 0 ? "bg-gray-900" : "bg-black"}
                >
                  <td className="p-6 border border-white">{tx.name}</td>
                  <td className="p-6 border border-white">
                    {new Date(tx.date).toLocaleString()}
                  </td>
                  <td
                    className={`p-6 border border-white text-right ${amountColor(
                      tx.amount,
                    )}`}
                  >
                    {tx.amount > 0 && "+"}${Math.abs(tx.amount).toFixed(2)}
                  </td>
                  <td className="p-6 border border-white text-right">
                    ${tx.fee.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="2xl:hidden flex flex-col gap-4">
        <div className="flex flex-col gap-2 mb-2 text-white text-sm">
          <span className="font-semibold">Sort by:</span>
          <div className="flex flex-col gap-2">
            {["name", "date", "amount", "fee"].map((field) => (
              <button
                key={field}
                onClick={() => handleSort(field)}
                className={`flex items-center justify-between px-3 py-1 rounded border transition-all text-sm font-medium w-[60%] sm:w-[50%] md:w-[45%]
                  ${
                    sortField === field
                      ? "bg-gray-700 border-white text-white"
                      : "border-gray-600 text-gray-300 hover:bg-gray-800"
                  }`}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
                <SortArrow field={field} />
              </button>
            ))}
          </div>
        </div>

        {currentTransactions.map((tx) => (
          <div
            key={tx.id}
            className="bg-black border border-white rounded-xl p-4 flex flex-col gap-3 shadow-md transform transition-all duration-200 active:scale-[0.97] hover:shadow-xl"
          >
            <div className="flex justify-between items-center">
              <p className="font-bold text-white">{tx.name}</p>
              <span className={`font-bold ${amountColor(tx.amount)}`}>
                {tx.amount > 0 && "+"}${Math.abs(tx.amount).toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Date</span>
              <span className="text-white">
                {new Date(tx.date).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Time</span>
              <span className="text-white">
                {new Date(tx.date).toLocaleTimeString()}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Fee</span>
              <span className="text-white">${tx.fee.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionTable;
