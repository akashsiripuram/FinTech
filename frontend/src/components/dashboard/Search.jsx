import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { addExpense } from "../../redux/expenseSlice"; // Use expenseSlice here for adding expenses
import { toast } from "react-hot-toast";
import { getExpenses } from "../../redux/expenseSlice";

export default function Search({ user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseData, setExpenseData] = useState({
    id: user._id,
    date: "",
    note: "",
    detail: "",
    expense: "",
    category: "",
  });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({
      ...expenseData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addExpense(expenseData))
      .then((data) => {
        if (data?.payload?.success) {
          toast.success(data.payload.message || "Expense added successfully.");

          dispatch(getExpenses(user._id)); 
        } else {
          toast.error(data?.payload?.message || "Error in adding expense.");
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");
      })
      .finally(()=>{
        setIsModalOpen(false);
      })
  };

  return (
    <div>
      <div className="flex flex-row space-between bg-[#702DFF] rounded-2xl mx-8 p-4">
        <div className="flex flex-row flex-grow">
          <input
            type="text"
            placeholder="Search"
            className="border-2 rounded-md focus:outline-none px-2 w-2/5"
          />
          <button className="rounded-md py-1 text-[#702DFF] bg-white p-2">
            <CiSearch />
          </button>
        </div>
        <div className="add-expense">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#fff] rounded-md py-1 p-2 m-auto">
            Add Expense
          </button>
        </div>
      </div>

      {/* Modal for Adding Expense */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setIsModalOpen(false)}>
          <div
            className="bg-white p-6 rounded-lg w-full sm:w-96"
            onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl text-center mb-4 text-[#702DFF]">
              Add Expense
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={expenseData.date}
                  onChange={handleInputChange}
                  className="w-full border-2 border-[#702DFF] rounded-md p-2 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="note"
                  className="block text-sm font-medium text-gray-700">
                  Note
                </label>
                <input
                  type="text"
                  id="note"
                  name="note"
                  value={expenseData.note}
                  onChange={handleInputChange}
                  className="w-full border-2 border-[#702DFF] rounded-md p-2 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="detail"
                  className="block text-sm font-medium text-gray-700">
                  Detail
                </label>
                <textarea
                  id="detail"
                  name="detail"
                  value={expenseData.detail}
                  onChange={handleInputChange}
                  className="w-full border-2 border-[#702DFF] rounded-md p-2 focus:outline-none"
                  required></textarea>
              </div>
              <div>
                <label
                  htmlFor="expense"
                  className="block text-sm font-medium text-gray-700">
                  Expense Amount
                </label>
                <input
                  type="number"
                  id="expense"
                  name="expense"
                  value={expenseData.expense}
                  onChange={handleInputChange}
                  className="w-full border-2 border-[#702DFF] rounded-md p-2 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={expenseData.category}
                  onChange={handleInputChange}
                  className="w-full border-2 border-[#702DFF] rounded-md p-2 focus:outline-none"
                  required>
                  <option value="">Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Bills">Bills</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Health & Fitness">Health & Fitness</option>
                  <option value="Education">Education</option>
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white py-1 px-4 rounded-md">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#702DFF] text-white py-1 px-4 rounded-md">
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
