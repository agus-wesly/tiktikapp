import React from "react";
import Link from "next/link";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import Logo from "../utils/tiktik-logo.png";
import { createOrGetUser } from "../utils";
import authState from "../store";
import { HiPlus, HiOutlineLogout } from "react-icons/hi";

const Navbar = () => {
  const { user, setUser, logOut } = authState();
  const router = useRouter();

  const handleLogout = () => {
    googleLogout();
    logOut();
    router.push("/");
  };

  return (
    <div className="flex items-center w-full border-b-2 border-gray-200 px-4 py-2 xl:px-8 xl:py-4 justify-between sticky top-0 bg-white">
      <Link href={"/"}>
        <div className="w-[130px] xl:w-[160px] cursor-pointer">
          <Image src={Logo} className="object-contain" />
        </div>
      </Link>

      {!user ? (
        <GoogleLogin
          onSuccess={async (response) => {
            const userData = await createOrGetUser(response);
            setUser(userData);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      ) : (
        <div className="flex gap-12">
          <Link href={"/upload"}>
            <div className="flex px-3 py-2 justify-evenly cursor-pointer gap-3 items-center text-white bg-[#FF2676] hover:bg-[#e72d71] shadow-md">
              <HiPlus className="text-xl" />
              <p className="font-semibold hidden md:block">Upload</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 shadow-sm relative">
              <Image src={user.profile} layout={"fill"} objectFit="cover" className="rounded-full" />
            </div>
            <div className="cursor-pointer" onClick={handleLogout}>
              <HiOutlineLogout className="text-2xl hover:text-red-500" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
