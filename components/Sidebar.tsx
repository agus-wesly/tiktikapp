import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsXCircle, BsList } from "react-icons/bs";
import { HiHome } from "react-icons/hi";
import { topics } from "../utils/constants";
import Suggested from "./Suggested";
import Footer from "./Footer";

const Sidebar = () => {
  const [toggle, setToggle] = useState(true);
  const { query, pathname } = useRouter();
  return (
    <div className={`h-[90vh] ${toggle ? "w-20" : "w-auto"} xl:w-400 flex flex-col justify-start overflow-y-hidden hover:overflow-y-auto`}>
      <div className="block xl:hidden text-xl px-4 py-7" onClick={() => setToggle((prev) => !prev)}>
        {toggle ? <BsXCircle strokeWidth={1} /> : <BsList strokeWidth={1} />}
      </div>
      {toggle && (
        <div className="border-gray-200 xl:border-r-[1px] px-3 py-2 flex flex-col justify-center xl:justify-start xl:pl-8 rounded-md xl:px-0">
          <div className="rounded-sm items-center justify-center xl:justify-start flex gap-5 xl:border-gray-200 xl:border-b-2 cursor-pointer">
            <Link href={"/"}>
              <div className="flex items-center gap-5 px-4 py-3 hover:bg-primary xl:py-5 xl:px-5 xl:w-full">
                <div className={`${!query.category && pathname === "/" ? "text-[#FF2676]" : "text-primary"} text-2xl`}>
                  <HiHome />
                </div>
                <div className={`hidden xl:block text-xl font-semibold ${!query.category && pathname === "/" ? "text-[#FF2676]" : "text-primary"} `}>For You</div>
              </div>
            </Link>
          </div>
          <div className="xl:pb-6 xl:pt-4 flex flex-col gap-3 xl:mt-0 xl:border-gray-200 xl:border-b-2">
            <h1 className="text-gray-500 font-semibold text-md hidden xl:block pl-3">Popular Topics</h1>
            <div className="flex flex-col xl:flex-row flex-nowrap xl:flex-wrap xl:gap-3 justify-items-center">
              {topics.map((t, i) => (
                <Link href={`?category=${t.name}`} key={i}>
                  <div
                    className={`hover:bg-primary rounded-sm items-center justify-center xl:justify-start p-3 xl:rounded-3xl xl:border-2 ${
                      query.category === t.name ? "text-[#FF2676] border-[#FF2676]" : "text-primary border-gray-200"
                    } flex cursor-pointer gap-3`}
                  >
                    <div className={`${query.category === t.name ? "text-[#FF2676]" : "text-primary"} text-2xl`}>{t.icon}</div>
                    <div className="hidden xl:block capitalize font-semibold text-lg">{t.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <Suggested />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
