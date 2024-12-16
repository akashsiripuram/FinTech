import { Outlet} from "react-router-dom";


export default function LoginLayout() {
 

  
  return (
    <div className="flex flex-col max-w-screen h-screen bg-gray-100">
      <main className="w-full max-w-md p-6 bg-white shadow-md rounded">
        <Outlet />
      </main>
    </div>
  );
}
