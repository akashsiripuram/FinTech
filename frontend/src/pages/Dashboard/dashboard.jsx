import LeftBar from "../../components/sidebar/leftbar/LeftBar";
import RightBar from "../../components/sidebar/rightbar/RightBar";
import Summary from "../../components/cards/Summary";
import Search from "../../components/Search/Search";
import RecentTransactions from "../../components/RecentTransactions/RecentTransactions";
export default function Dashboard(){
    return(
        <div className="HomePage flex flex-row w-screen h-screen overflow-hidden">
            <div className="w-2/12 shadow-md">
                <LeftBar/>
            </div>
            <div className="w-8/12 flex flex-col">
                <Summary/>
                <Search/>
                <RecentTransactions/>
            </div>
            <div className="w-2/12 shadow-md">
                <RightBar/>
            </div>
        </div>
    )
}