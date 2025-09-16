import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function TransactionTable({ currentPage, itemsPerPage }) {
  const [transactions, setTransactions] = useState([]);
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await axios.get("http://localhost:3111/transactions", {
          headers: { Authorization: `Bearer ${userData?.token}` },
        });
        setTransactions(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement des transactions :", error);
      }
    }
    if (userData?.token) {
      fetchTransactions();
    }
  }, [userData]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
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

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentTransactions = sortedTransactions.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  const sortIcon = (field) =>
    sortField === field ? (sortOrder === "asc" ? "⬆️" : "⬇️") : "";

  return (
    <div className="w-[1250px] overflow-y-auto border border-gray-200 shadow-lg">
      <table className="w-full text-white text-sm border-separate border-spacing-0">
        <thead className="bg-gray-800 text-gray-400">
          <tr>
            <th
              className="p-6 text-base border border-gray-200 text-left cursor-pointer select-none"
              onClick={() => handleSort("name")}
            >
              Name {sortIcon("name")}
            </th>
            <th
              className="p-6 text-base border border-gray-200 text-left cursor-pointer select-none"
              onClick={() => handleSort("date")}
            >
              Date/Time {sortIcon("date")}
            </th>
            <th
              className="p-6 text-base border border-gray-200 text-right cursor-pointer select-none"
              onClick={() => handleSort("amount")}
            >
              Amount {sortIcon("amount")}
            </th>
            <th
              className="p-6 text-base border border-gray-200 text-right cursor-pointer select-none"
              onClick={() => handleSort("fee")}
            >
              Fee {sortIcon("fee")}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((tx, index) => (
            <tr
              key={tx.id}
              className={index % 2 === 0 ? "bg-gray-900" : "bg-black"}
            >
              <td className="p-6 text-base border border-gray-200">
                {tx.name}
              </td>
              <td className="p-6 text-base border border-gray-200">
                {new Date(tx.date).toLocaleString()}
              </td>
              <td
                className={`p-6 text-base border border-gray-200 text-right ${
                  tx.amount > 0
                    ? "text-green-500"
                    : tx.amount < 0
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {tx.amount > 0 ? "+" : tx.amount < 0 ? "-" : ""}$
                {Math.abs(tx.amount).toFixed(2)}
              </td>
              <td className="p-6 text-base border border-gray-200 text-right">
                ${tx.fee.toFixed(2)}
              </td>
            </tr>
          ))}
          {transactions.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500">
                Aucune transaction trouvée.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
