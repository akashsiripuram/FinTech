import { useSelector, useDispatch } from "react-redux";
import { getExpenses } from "../../redux/expenseSlice";
import { useEffect,useState } from "react";

// eslint-disable-next-line react/prop-types
export default function RecentTransactions({ user }) {
  let [fetchedExpenses, setFetchedExpenses] = useState([]);
  const { expenses, isLoading } = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (user?._id) {
      // eslint-disable-next-line react/prop-types
      dispatch(getExpenses(user._id)); // Assuming `user._id` is needed to fetch user-specific expenses
    }
  // eslint-disable-next-line react/prop-types
  }, [dispatch, user?._id]);
  useEffect(() => {
    // Slice the expenses array to get only the last 5
    setFetchedExpenses(expenses);
  }, [expenses]);
  if(Array.isArray(fetchedExpenses))
  fetchedExpenses=fetchedExpenses.slice(-5).reverse();
  console.log("hellow i am ",fetchedExpenses);

  

  return (
    <div className="recent-transactions bg-white shadow-lg rounded-md p-4 mt-4 overflow-y-scroll mx-8 no-scrollbar">
      <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
      {isLoading? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-2">
          {Array.isArray(fetchedExpenses) &&fetchedExpenses.map((expense) => (
            <li
              key={expense._id}
              className="flex flex-row items-center space-x-2"
            >
              <div className="text-sm">{expense.category}</div>
              <div className="text-sm">{expense.detail}</div>
              <div className="text-sm text-right">${expense.expense}</div>
            </li>
          ))}
        </ul>
      )}

      {expenses.length === 0 &&!isLoading && (
        <div className="text-sm text-center">No recent transactions found.</div>
      )}
      
    </div>
  );
}
