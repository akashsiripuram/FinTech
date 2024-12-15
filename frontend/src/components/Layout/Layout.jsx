import { Outlet } from "react-router-dom"
export default function Layout(){
    return(
        <div>
       
      <main>
        {/* This is where the child routes (login/register) will be rendered */}
        <Outlet />
      </main>
      
        </div>
    )
}