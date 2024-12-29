import Summary from "../../components/dashboard/Summary"
import Search from "../../components/dashboard/Search"
import RecentTransactions from "../../components/dashboard/RecentTransactions"
export default function Dashboard({ user }){
    return(
        <div className="HomePage flex flex-col">
        <Summary />
        <Search user={user} />
        <RecentTransactions user={user} />
      </div>
    )
}