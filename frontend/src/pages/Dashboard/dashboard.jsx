import Summary from "../../components/cards/Summary";
import Search from "../../components/Search/Search";
import RecentTransactions from "../../components/RecentTransactions/RecentTransactions";
export default function Dashboard() {
  return (
    <div className="HomePage flex flex-col">
      <Summary />
      <Search />
      <RecentTransactions />
    </div>
  );
}
