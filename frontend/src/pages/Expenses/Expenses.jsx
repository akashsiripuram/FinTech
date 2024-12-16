import { useState, useEffect } from "react";
import { fetchProtectedData } from "../../services/authService";

export default function Expenses() {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [expenseFilter, setExpenseFilter] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Start loading
        setError(null); // Reset any previous errors
        const result = await fetchProtectedData(); // Fetch the data
        console.log(result);
  
        // Check if result.user and result.user.expenses exist before setting
        if (result && result.user && result.user.expenses) {
          setExpenses(result.user.expenses); // Set the fetched data
          console.log(JSON.stringify(result.user.expenses));
          localStorage.setItem("user", JSON.stringify(result));
        } else {
          throw new Error("Expenses data not found");
        }
      } catch (error) {
        setError("Error fetching data"); // Handle any errors during fetching
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };
  
    fetchData(); // Call fetchData on mount
  }, []);
  

  const filteredData = (expenses || []).filter((expense) => {
    return (
      (categoryFilter ? expense.category === categoryFilter : true) &&
      (dateFilter ? expense.date.includes(dateFilter) : true) &&
      (expenseFilter ? expense.expense <= expenseFilter : true)
    );
  });
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col p-5 h-screen overflow-hidden">
      <h1 className="text-xl font-semibold mb-4">Expenses</h1>

      {/* Filter Controls */}
      <div className="flex gap-4 mb-4">
        <select
          className="p-2 border rounded-md"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Transportation">Transportation</option>
          <option value="Health & Fitness">Health & Fitness</option>
          <option value="Education">Education</option>
        </select>

        <input
          type="text"
          className="p-2 border rounded-md"
          placeholder="Filter by Date (YYYY-MM-DD)"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />

        <input
          type="number"
          className="p-2 border rounded-md"
          placeholder="Max Expense (₹)"
          value={expenseFilter}
          onChange={(e) => setExpenseFilter(e.target.value)}
        />
      </div>

      {/* Expenses Table */}
      <div className="overflow-y-auto flex-grow no-scrollbar">
        <table className="table-auto w-full border-collapse border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Note</th>
              <th className="px-4 py-2 border">Detail</th>
              <th className="px-4 py-2 border">Expense (₹)</th>
              <th className="px-4 py-2 border">Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((expense) => (
                <tr key={expense.id}>
                  <td className="px-4 py-2 border">{formatDate(expense.date)}</td>
                  <td className="px-4 py-2 border">{expense.note}</td>
                  <td className="px-4 py-2 border">{expense.detail}</td>
                  <td className="px-4 py-2 border">{expense.expense}</td>
                  <td className="px-4 py-2 border">{expense.category}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center border">
                  No data found for the selected filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
