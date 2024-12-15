import { CiSearch } from "react-icons/ci";
export default function Search(){
    return(
        <div className="flex flex-row space-between bg-[#702DFF] rounded-2xl mx-8 p-4">
            <div className="flex flex-row flex-grow ">
                <input type="text" placeholder="Search" className="border-2 rounded-md focus:outline-none px-2 w-2/5"/>
                <button className="rounded-md py-1 text-[#702DFF] bg-white p-2"><CiSearch /></button>
            </div>
            <div className="add-expense">
                <button className="bg-[#fff] rounded-md py-1  p-2 m-auto">Add Expense</button>
            </div>

            
        </div>
    )
}