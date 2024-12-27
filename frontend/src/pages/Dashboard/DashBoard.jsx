import Summary from "../../components/dashboard/Summary"
import Search from "../../components/dashboard/Search"
import RecentTransactions from "../../components/dashboard/RecentTransactions"
export default function Dashboard(){
    return(
        <div className="HomePage flex flex-col">
        <Summary />
        <Search />
        <RecentTransactions />
      </div>
    )
}