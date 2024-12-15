import { MdOutlineAccountBalance } from "react-icons/md";

export default function Summary() {
  return (
    <div className="summary grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center items-center w-full my-8">
      {/* Card 1 */}
      <div className="flex flex-col justify-between  w-full sm:w-fit  rounded-md p-3 space-y-5">
        <div className="bg-orange-100 w-fit rounded-full p-2">
          <MdOutlineAccountBalance className="text-orange-600 rounded-full" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-xs">Your Balance</h3>
          <h1 className="flex flex-row items-center space-x-3">
            <span className="font-medium text-md">$1,000.00</span>
            <div className="bg-green-100 text-green-500 rounded-3xl scale-90 px-2 font-semibold text-xs flex items-center">
              +1.67%
            </div>
          </h1>
        </div>
      </div>

      {/* Card 2 */}
      <div className="flex flex-col justify-between  w-full sm:w-fit text-xs rounded-md p-3 space-y-5">
        <div className="bg-orange-100 w-fit rounded-full p-2">
          <MdOutlineAccountBalance className="text-orange-600 rounded-full" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-xs">Your Balance</h3>
          <h1 className="flex flex-row items-center space-x-3">
            <span className="font-medium text-md">$1,000.00</span>
            <div className="bg-green-100 text-green-500 rounded-3xl scale-90 px-2 font-semibold text-xs flex items-center">
              +1.67%
            </div>
          </h1>
        </div>
      </div>

      {/* Card 3 */}
      <div className="flex flex-col justify-between  w-full sm:w-fit  rounded-md p-3 space-y-5">
        <div className="bg-orange-100 w-fit rounded-full p-2">
          <MdOutlineAccountBalance className="text-orange-600 rounded-full" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-xs">Your Balance</h3>
          <h1 className="flex flex-row items-center space-x-3">
            <span className="font-medium text-md">$1,000.00</span>
            <div className="bg-green-100 text-green-500 rounded-3xl scale-90 px-2 font-semibold text-xs flex items-center">
              +1.67%
            </div>
          </h1>
        </div>
      </div>

      {/* Card 4 */}
      <div className="flex flex-col justify-between  w-full sm:w-fit  rounded-md p-3 space-y-5">
        <div className="bg-orange-100 w-fit rounded-full p-2">
          <MdOutlineAccountBalance className="text-orange-600 rounded-full" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-xs">Your Balance</h3>
          <h1 className="flex flex-row items-center space-x-3">
            <span className="font-medium text-md">$1,000.00</span>
            <div className="bg-green-100 text-green-500 rounded-3xl scale-90 px-2 font-semibold text-xs flex items-center">
              +1.67%
            </div>
          </h1>
        </div>
      </div>
    </div>
  );
}
