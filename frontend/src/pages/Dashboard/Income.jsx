import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import { addIncome,getIncome } from "../../redux/incomeSlice";
import {toast} from "react-hot-toast";



export default function Income({user}) {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [expenseFilter, setExpenseFilter] = useState("");
  const dispatch=useDispatch();
  const {income,isLoading}=useSelector(state=>state.income);

 
  const [newIncome, setNewIncome] = useState({
    id:user._id,
    date: "",
    note: "",
    detail: "",
    income: "",
    category: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const isAddIncomeModal = location.pathname === "/user/income/add";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIncome((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleAddIncome = (e) => {
    e.preventDefault();
    dispatch(addIncome(newIncome))
     .then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload.message || "Added income");
        dispatch(getIncome(user._id));
        navigate("/user/income");
      } else {
        toast.error(data?.payload?.message || "Error in adding income"); // Show error toast with message from response
      }
    })
     .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");
      });

   
  };
  useEffect(()=>{
    if(user?._id){
      dispatch(getIncome(user._id));
    }
  },[dispatch,user?._id]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  
 

  return (
    <div className="flex flex-col p-5 h-screen w-full overflow-hidden">
      <h1 className="text-xl font-semibold mb-4">Income</h1>

      <button
        className="p-2 bg-blue-500 text-white rounded-md mb-4"
        onClick={() => navigate("/user/income/add")}>
        Add Income
      </button>

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
            {income.length > 0 ? (
              income.map((income) => (
                <tr key={income.id}>
                  <td className="px-4 py-2 border">{formatDate(income.date)}</td>
                  <td className="px-4 py-2 border">{income.note}</td>
                  <td className="px-4 py-2 border">{income.detail}</td>
                  <td className="px-4 py-2 border">{income.income}</td>
                  <td className="px-4 py-2 border">{income.category}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center border">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isAddIncomeModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-1/3 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Add Income
            </h2>
            {/* Modal inputs */}
            <input
              type="date"
              name="date"
              className="p-2 border rounded-md w-full mb-3"
              value={newIncome.date}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="note"
              className="p-2 border rounded-md w-full mb-3"
              placeholder="Note"
              value={newIncome.note}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="detail"
              className="p-2 border rounded-md w-full mb-3"
              placeholder="Detail"
              value={newIncome.detail}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="income"
              className="p-2 border rounded-md w-full mb-3"
              placeholder="Income"
              value={newIncome.income}
              onChange={handleInputChange}
            />
            <select
              name="category"
              className="p-2 border rounded-md w-full mb-3"
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
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="p-2 bg-gray-500 text-white rounded-md"
                onClick={() => navigate("/user/income")}>
                Cancel
              </button>
              <button
                className="p-2 bg-blue-500 text-white rounded-md"
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
