import React from "react";
import { allPosts } from "../types";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

interface IProps {
  post: allPosts;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  return (
    <Link href={`/${post._id}`}>
      <div className="flex border-gray-200 border-b-2 py-5 xl:py-7 flex-col cursor-pointer hover:bg-gray-50 ">
        <div className=" flex flex-col gap-3">
          <div className="flex flex-row items-start gap-3">
            <div className="rounded-full w-12 h-12 relative">
              <Image src={post.postedBy.profile} alt="prfile" layout="fill" objectFit="cover" className="rounded-full" />
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-md cursor-pointer">{post.postedBy.userName}</p>
              <p className="font-normal text-md">{post.caption}</p>
            </div>
          </div>
          <div className="aspect-[1/1] max-w-[300px] md:max-w-auto md:w-64 xl:w-[358px] xl:aspect-[1/1] flex flex-col gap-3">
            <div className="aspect-[1/1] max-w-[300px] md:max-w-auto md:w-64 xl:w-[358px] xl:aspect-[1/1] relative">
              <Image src={post.photo.asset.url} alt="post" className="w-full h-full object-cover rounded-md" layout="fill" objectFit="cover" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
