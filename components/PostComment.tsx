import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  userProfile: string | null;
  user: string | undefined;
  handleComment: (comment: string) => Promise<void>;
}

const PostComment = ({ userProfile, user, handleComment }: IProps) => {
  const [comment, setComment] = useState("");

  const handleBtnClick = () => {
    if (comment) {
      handleComment(comment);
      setComment("");
    }
  };

  return (
    <div>
      <div className="w-full hidden bg-white lg:flex px-4 pb-3 items-center justify-between">
        {userProfile ? (
          <>
            <div className="w-7 h-7 relative">
              <Image src={userProfile} layout="fill" className="rounded-full" />
            </div>

            <div className="flex-1 h-full">
              <input type="text" id="comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder={`Comment as ${user}`} className="outline-none border-0 px-3 focus:border-none focus:outline-none w-full h-full" />
            </div>

            <button className="grid cursor-pointer place-items-center text-[#FF2676] font-bold uppercase" onClick={handleBtnClick}>
              Send
            </button>
          </>
        ) : (
          <p className="text-center font-semibold w-full">
            <span className="text-blue-500 underline cursor-pointer">
              <Link href={"/"}>Login</Link>
            </span>{" "}
            to comment !
          </p>
        )}
      </div>
      <div className="lg:hidden flex">
        {userProfile ? (
          <>
            <div className="w-7 h-7 relative">
              <Image src={userProfile} layout="fill" className="rounded-full" />
            </div>

            <div className="flex-1 h-full">
              <input type="text" id="comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder={`Comment as ${user}`} className="outline-none border-0 px-3 focus:border-none focus:outline-none w-full h-full" />
            </div>

            <button className="grid cursor-pointer place-items-center text-[#FF2676] font-bold uppercase" onClick={handleBtnClick}>
              Send
            </button>
          </>
        ) : (
          <p className="text-center font-semibold w-full">
            <span className="text-blue-500 underline cursor-pointer">
              <Link href={"/"}>Login</Link>
            </span>{" "}
            to comment !
          </p>
        )}
      </div>
    </div>
  );
};

export default PostComment;
