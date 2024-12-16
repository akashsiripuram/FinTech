import { useEffect, useState } from "react";
import { fetchProtectedData } from "../../services/authService";

export default function RecentTransactions() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetchProtectedData();

        // Check if result.user and result.user.expenses exist before setting
        if (result && result.user && result.user.expenses) {
          setExpenses(result.user.expenses);
        } else {
          throw new Error("Expenses data not found");
        }
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sort by date (newest first) and get the 5 most recent
  const recentTransactions = expenses
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort in descending order
    .slice(0, 5); // Take the top 5

  // Loading and error states
  if (isLoading) {
    return <div>Loading recent transactions...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="recent-transactions bg-white shadow-lg rounded-md p-4 mt-4 overflow-y-scroll mx-8 no-scrollbar">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      {recentTransactions.length > 0 ? (
        <ul className="space-y-3">
          {recentTransactions.map((transaction) => (
            <li
              key={transaction.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="text-sm font-medium">{transaction.note || "No description"}</p>
                <span className="text-xs text-gray-500">
                  {new Date(transaction.date).toLocaleDateString("en-GB")} {/* Format date as dd/mm/yyyy */}
                </span>
              </div>
              <span className="font-medium text-md text-green-500">
                ₹{transaction.expense}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No recent transactions found.</p>
      )}
    </div>
  );
}
