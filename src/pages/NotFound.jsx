import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="mx-25">
      <div className="px-6 py-4 text-sm text-gray-600 ">
        <span >Home</span>
        <span className="mx-2">/</span>
        <span className="text-black font-semibold">Cart</span>
      </div>
      <div className="text-center mt-12">
        <h1 className="text-[110px] mb-7">404 Not Found</h1>
        <p className="">Your visited page not found. You may go home page or log in.</p>
        <Link to={"/"}><button className="mb-10 mt-10"> Back to home page</button></Link>
      </div>
    </div>
  );
};

export default NotFound;