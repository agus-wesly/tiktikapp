import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";

const NotFound = () => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-3">
      <RiErrorWarningLine className="text-7xl text-gray-300" />
      <p className="text-gray-300 text-xl font-bold tracking-wider ">No Post Yet :(</p>
    </div>
  );
};

export default NotFound;
