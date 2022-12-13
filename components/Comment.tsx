import React from "react";
import Image from "next/image";
import { comment } from "../types";
import { VscCommentDiscussion } from "react-icons/vsc";

interface IProps {
  comments: comment[];
}

interface SingleIProps {
  profile: string;
  userName: string;
  comment: string;
}

const Comment = ({ comments }: IProps) => {
  const SingleComment = ({ profile, userName, comment }: SingleIProps) => (
    <div className="flex items-start gap-3">
      <div className="w-5 h-5 lg:w-7 lg:h-7 relative flex-shrink-0">
        <Image src={profile} layout="fill" className="rounded-full object-cover" />
      </div>

      <div className="">
        <p className="text-md text-justify">
          <span className="font-bold mr-2">{userName}</span>
          {comment}
        </p>
      </div>
    </div>
  );
  return (
    <div className=" lg:bg-gray-100 w-full border-gray-300 lg:border-t-2 lg:border-b-2 flex-1 lg:flex flex-col px-0 lg:px-5 py-2 lg:h-full space-y-5 overflow-y-scroll h-[100px] lg:max-h-full">
      {comments.length >= 1 ? (
        comments.map((comment, i) => <SingleComment profile={comment.postedBy.profile} comment={comment.comment} userName={comment.postedBy.userName} key={i} />)
      ) : (
        <div className="w-full h-full flex justify-center items-center flex-col space-y-2 lg:space-y-5">
          <VscCommentDiscussion className="text-4xl lg:text-5xl text-gray-400" />
          <p className="text-center text-md lg:text-lg text-gray-400">
            No comment yet. <br /> Be the first !
          </p>
        </div>
      )}
    </div>
  );
};

export default Comment;
