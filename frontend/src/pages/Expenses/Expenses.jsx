import { useState } from "react";

export default function Expenses() {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [expenseFilter, setExpenseFilter] = useState("");

  const dummyData = [
    { id: 1, date: "2024-12-01", note: "Grocery shopping", detail: "Purchased groceries for the week", expense: 1200, category: "Food" },
    { id: 2, date: "2024-12-02", note: "Electricity bill", detail: "Paid electricity bill for the month", expense: 800, category: "Bills" },
    { id: 3, date: "2024-12-05", note: "Movie tickets", detail: "Watched a movie with friends", expense: 1500, category: "Entertainment" },
    { id: 4, date: "2024-12-07", note: "Dining out", detail: "Dinner at a restaurant", expense: 2000, category: "Food" },
    { id: 5, date: "2024-12-10", note: "Transportation", detail: "Taxi fare for work commute", expense: 500, category: "Transportation" },
    { id: 6, date: "2024-12-12", note: "Fitness subscription", detail: "Paid for monthly gym membership", expense: 2500, category: "Health & Fitness" },
    { id: 7, date: "2024-12-15", note: "Books", detail: "Bought new books for study", expense: 1200, category: "Education" },
    { id: 8, date: "2024-12-15", note: "Books", detail: "Bought new books for study", expense: 1200, category: "Education" },
    { id: 9, date: "2024-12-15", note: "Books", detail: "Bought new books for study", expense: 1200, category: "Education" },
    { id: 10, date: "2024-12-15", note: "Books", detail: "Bought new books for study", expense: 1200, category: "Education" },
    { id: 11, date: "2024-12-15", note: "Books", detail: "Bought new books for study", expense: 1200, category: "Education" },
  ];

  // Filtering logic based on the selected filters
  const filteredData = dummyData.filter((expense) => {
    return (
      (categoryFilter ? expense.category === categoryFilter : true) &&
      (dateFilter ? expense.date.includes(dateFilter) : true) &&
      (expenseFilter ? expense.expense <= expenseFilter : true)
    );
  });

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
                  <td className="px-4 py-2 border">{expense.date}</td>
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
