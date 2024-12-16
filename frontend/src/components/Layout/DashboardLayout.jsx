import { Outlet} from "react-router-dom";
import LeftBar from "../sidebar/leftbar/LeftBar";
import RightBar from "../sidebar/rightbar/RightBar";


export default function DashboardLayout() {
  

  return (
    <div className="HomePage flex flex-row w-screen h-screen overflow-y-scroll">
      <div className="w-2/12 shadow-md">
        <LeftBar />
      </div>
      <main className="flex-grow overflow-y-auto max-h-screen">
        <Outlet />
      </main>
      <div className="w-2/12 shadow-md">
        <RightBar />
      </div>
    </div>
  );
}
