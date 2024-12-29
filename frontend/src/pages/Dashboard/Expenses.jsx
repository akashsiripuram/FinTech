import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses } from "../../redux/expenseSlice";

export default function Expenses({user}) {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [expenseFilter, setExpenseFilter] = useState("");
  
  const [fetchedExpenses, setFetchedExpenses] = useState([]);
  const { expenses, isLoading } = useSelector((state) => state.expenses);
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Assuming `user._id` is needed to fetch user-specific expenses
    if (user?._id) {
      dispatch(getExpenses(user._id));
    }
  }, [dispatch, user?._id]);

  useEffect(() => {
    // Slice the expenses array to get only the last 5
    setFetchedExpenses(expenses);
  }, [expenses]);

  const filteredData = (fetchedExpenses || []).filter((expense) => {
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
