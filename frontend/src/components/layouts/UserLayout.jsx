import { Outlet} from "react-router-dom";
import LeftBar from "../../pages/HomePage/LeftBar";
import RightBar from "../../pages/HomePage/RightBar";


// eslint-disable-next-line react/prop-types
export default function UserLayout({user}) {
  

  return (
    <div className="HomePage flex flex-row w-screen h-screen overflow-y-scroll">
      <div className="w-2/12 shadow-md">
        <LeftBar />
      </div>
      <main className="flex-grow overflow-y-auto max-h-screen">
        <Outlet />
      </main>
      <div className="w-2/12 shadow-md">
        <RightBar user={user} />
      </div>
    </div>
  );
}
