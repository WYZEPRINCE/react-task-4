import { FaChevronDown } from "react-icons/fa"

const TopHeader = () => {
  return (
    <div className="bg-black text-white py-2 px-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left side - promotional text */}
        <div className="ml-80 text-center">
          <span className="text-sm font-medium flex gap-2">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{' '}
            <p className="underline cursor-pointer ml-2 font-semibold">
              ShopNow
            </p>
          </span>
        </div>
        
        {/* Right side - language selector */}
        <div className="flex items-center space-x-1 text-sm mr-30">
          <span>English</span>
          <FaChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
export default TopHeader