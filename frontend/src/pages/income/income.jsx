import { useState } from "react";

export default function Income() {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [expenseFilter, setExpenseFilter] = useState("");
  const [incomeData, setIncomeData] = useState([
    {
      id: 1,
      date: "2024-12-01",
      note: "Part-time job",
      detail: "Earned through part-time tutoring",
      income: 3000,
      category: "Part-time Job",
    },
    {
      id: 2,
      date: "2024-12-05",
      note: "Pocket money",
      detail: "Monthly pocket money from parents",
      income: 1500,
      category: "Pocket Money",
    },
    {
      id: 3,
      date: "2024-12-10",
      note: "Scholarship",
      detail: "Received scholarship for academic excellence",
      income: 5000,
      category: "Scholarship",
    },
    {
      id: 4,
      date: "2024-12-12",
      note: "Freelance work",
      detail: "Freelance graphic design project",
      income: 2500,
      category: "Freelance Work",
    },
    {
      id: 5,
      date: "2024-12-15",
      note: "Birthday gift",
      detail: "Received money as a birthday gift from relatives",
      income: 1000,
      category: "Gift",
    },
    {
      id: 6,
      date: "2024-12-18",
      note: "Internship",
      detail: "Paid internship at a tech company",
      income: 8000,
      category: "Internship",
    },
    {
      id: 7,
      date: "2024-12-20",
      note: "Freelance work",
      detail: "Freelance writing project for a website",
      income: 2000,
      category: "Freelance Work",
    },
    {
      id: 8,
      date: "2024-12-22",
      note: "Pocket money",
      detail: "Monthly pocket money from parents",
      income: 1500,
      category: "Pocket Money",
    },
    {
      id: 9,
      date: "2024-12-25",
      note: "Scholarship",
      detail: "Received semester-end scholarship",
      income: 4000,
      category: "Scholarship",
    },
    {
      id: 10,
      date: "2024-12-28",
      note: "Freelance work",
      detail: "Web development project for a client",
      income: 3500,
      category: "Freelance Work",
    },
  ]);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [newIncome, setNewIncome] = useState({
    date: "",
    note: "",
    detail: "",
    income: "",
    category: "",
  });

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIncome((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle adding new income
  const handleAddIncome = () => {
    if (
      newIncome.date &&
      newIncome.note &&
      newIncome.income &&
      newIncome.category
    ) {
      setIncomeData((prevData) => [
        ...prevData,
        { id: prevData.length + 1, ...newIncome },
      ]);
      setNewIncome({
        date: "",
        note: "",
        detail: "",
        income: "",
        category: "",
      });
      setShowModal(false); // Close the modal after adding income
    } else {
      alert("Please fill all fields");
    }
  };

  // Filtering logic based on the selected filters
  const filteredData = incomeData.filter((income) => {
    return (
      (categoryFilter ? income.category === categoryFilter : true) &&
      (dateFilter ? income.date.includes(dateFilter) : true) &&
      (expenseFilter ? income.income <= expenseFilter : true)
    );
  });

  return (
    <div className="flex flex-col p-5 h-screen w-full overflow-hidden">
      <h1 className="text-xl font-semibold mb-4">Income</h1>

      {/* Add Income Button */}
      <button
        className="p-2 bg-blue-500 text-white rounded-md mb-4"
        onClick={() => setShowModal(true)}>
        Add Income
      </button>

      {/* Filter Controls */}
      <div className="flex gap-4 mb-4">
        <select
          className="p-2 border rounded-md"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Part-time Job">Part-time Job</option>
          <option value="Pocket Money">Pocket Money</option>
          <option value="Scholarship">Scholarship</option>
          <option value="Freelance Work">Freelance Work</option>
          <option value="Gift">Gift</option>
          <option value="Internship">Internship</option>
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
          placeholder="Max Income (₹)"
          value={expenseFilter}
          onChange={(e) => setExpenseFilter(e.target.value)}
        />
      </div>

      {/* Income Table */}
      <div className="overflow-y-auto flex-grow no-scrollbar">
        <table className="table-auto w-full border-collapse border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Note</th>
              <th className="px-4 py-2 border">Detail</th>
              <th className="px-4 py-2 border">Income (₹)</th>
              <th className="px-4 py-2 border">Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((income) => (
                <tr key={income.id}>
                  <td className="px-4 py-2 border">{income.date}</td>
                  <td className="px-4 py-2 border">{income.note}</td>
                  <td className="px-4 py-2 border">{income.detail}</td>
                  <td className="px-4 py-2 border">{income.income}</td>
                  <td className="px-4 py-2 border">{income.category}</td>
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

      {/* Add Income Modal */}
      {/* Add Income Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-1/3 shadow-lg">
            <h2
              className="text-lg font-semibold mb-4 text-center"
              style={{ color: "#702DFF" }}>
              Add Income
            </h2>

            {/* Date Input */}
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#702DFF" }}>
              Date
            </label>
            <input
              type="date"
              name="date"
              className="p-2 border rounded-md w-full mb-3 focus:ring-2 focus:ring-indigo-300"
              value={newIncome.date}
              onChange={handleInputChange}
            />

            {/* Note Input */}
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#702DFF" }}>
              Note
            </label>
            <input
              type="text"
              name="note"
              className="p-2 border rounded-md w-full mb-3 focus:ring-2 focus:ring-indigo-300"
              placeholder="E.g., Pocket Money"
              value={newIncome.note}
              onChange={handleInputChange}
            />

            {/* Detail Input */}
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#702DFF" }}>
              Detail
            </label>
            <input
              type="text"
              name="detail"
              className="p-2 border rounded-md w-full mb-3 focus:ring-2 focus:ring-indigo-300"
              placeholder="E.g., Monthly pocket money from parents"
              value={newIncome.detail}
              onChange={handleInputChange}
            />

            {/* Income Input */}
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#702DFF" }}>
              Income (₹)
            </label>
            <input
              type="number"
              name="income"
              className="p-2 border rounded-md w-full mb-3 focus:ring-2 focus:ring-indigo-300"
              placeholder="E.g., 1500"
              value={newIncome.income}
              onChange={handleInputChange}
            />

            {/* Category Input */}
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: "#702DFF" }}>
              Category
            </label>
            <div className="relative mb-3">
              <select
                name="category"
                className="p-2 border rounded-md w-full focus:ring-2 focus:ring-indigo-300 appearance-none"
                value={newIncome.category}
                onChange={handleInputChange}>
                <option value="">Select Category</option>
                <option value="Part-time Job">Part-time Job</option>
                <option value="Pocket Money">Pocket Money</option>
                <option value="Scholarship">Scholarship</option>
                <option value="Freelance Work">Freelance Work</option>
                <option value="Gift">Gift</option>
                <option value="Internship">Internship</option>
              </select>
              {/* Icon */}
              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                📁
              </span>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="p-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition"
                onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button
                className="p-2 rounded-md text-white transition"
                style={{
                  backgroundColor: "#702DFF",
                  hover: { backgroundColor: "#5e1fdc" },
                }}
                onClick={handleAddIncome}>
                Add Income
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
