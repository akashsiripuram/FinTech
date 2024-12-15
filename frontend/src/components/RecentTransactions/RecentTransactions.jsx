export default function RecentTransactions() {
    const transactions = [
      { id: 1, description: "Bought groceries", amount: "$50.00", date: "Dec 10, 2024" },
      { id: 2, description: "Payment received from Client A", amount: "$200.00", date: "Dec 9, 2024" },
      { id: 3, description: "Paid rent", amount: "$750.00", date: "Dec 8, 2024" },
      { id: 4, description: "Transfer to savings", amount: "$100.00", date: "Dec 7, 2024" },
    ];
  
    return (
      <div className="recent-transactions bg-white shadow-lg rounded-md p-4 mt-4 overflow-y-scroll mx-8 no-scrollbar" >
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <ul className="space-y-3">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="text-sm">{transaction.description}</p>
                <span className="text-xs text-gray-500">{transaction.date}</span>
              </div>
              <span className="font-medium text-md">{transaction.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  