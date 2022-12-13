import React, { useState, useEffect } from "react";
import { BsFillShareFill, BsHeart, BsHeartFill, BsTrashFill } from "react-icons/bs";
import authState from "../store";

interface IProps {
  likes: { _ref: string }[] | null;
  handleLike: () => void;
  handleDislike: () => void;
  handleDelete: () => void;
  postedBy: string;
}

const LikeComp = ({ likes, postedBy, handleLike, handleDislike, handleDelete }: IProps) => {
  const [liked, setLiked] = useState(false);
  const { user } = authState();
  const checkLike = likes?.map((like) => like._ref === user?._id);

  useEffect(() => {
    if (checkLike?.includes(true)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [checkLike, likes]);

  return (
    <>
      <div className="w-full flex items-center gap-5">
        <div className="pl-3 hidden lg:flex items-start gap-5">
          {/* Like and value */}
          <div className="flex flex-col items-center">
            {liked ? <BsHeartFill className="text-2xl cursor-pointer" fill="#FF2676" onClick={() => handleDislike()} /> : <BsHeart className="text-2xl cursor-pointer" onClick={() => handleLike()} />}
            <p>{likes?.length || 0}</p>
          </div>

          <BsFillShareFill className="text-xl cursor-pointer" />
          {postedBy === user?._id && <BsTrashFill className="text-xl cursor-pointer" onClick={() => handleDelete()} />}
        </div>
        <div className="flex items-center lg:hidden gap-5">
          {liked ? <BsHeartFill className="text-2xl" fill="#FF2676" onClick={() => handleDislike()} /> : <BsHeart className="text-2xl" onClick={() => handleLike()} />}
          <BsFillShareFill className="text-xl" />
        </div>
      </div>
    </>
  );
};

export default LikeComp;
