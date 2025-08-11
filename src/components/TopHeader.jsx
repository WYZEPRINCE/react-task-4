import { FaChevronDown } from "react-icons/fa"

const TopHeader = () => {
  return (
    <div className="bg-black text-white py-2 px-4">
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto">
        {/* Left side - promotional text */}
        <div className="text-center lg:ml-80 mb-2 lg:mb-0">
          <span className="text-sm font-medium flex gap-2 justify-center lg:justify-start">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
            <p className="underline cursor-pointer ml-2 font-semibold">
              ShopNow
            </p>
          </span>
        </div>
        {/* Right side - language selector */}
        <div className=" mr-10 flex items-center space-x-1 text-sm">
          <span>English</span>
          <FaChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default TopHeader;

