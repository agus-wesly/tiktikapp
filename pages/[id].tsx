import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { HiOutlineX } from "react-icons/hi";
import axios from "axios";
import { baseURL } from "../utils";
import { singlePost } from "../types";
import LikeComp from "../components/LikeComp";
import Comment from "../components/Comment";
import useStore from "../store";
import PostComment from "../components/PostComment";

interface IProps {
  post: singlePost;
}

const SinglePost = ({ post }: IProps) => {
  const [sPost, setSPost] = useState(post);
  const router = useRouter();
  const { user } = useStore();

  const handlePress = async (like: boolean) => {
    const { data } = await axios.put(`${baseURL}/api/like`, {
      userId: user?._id,
      like,
      postId: post._id,
    });
    setSPost({ ...sPost, likes: data.data.likes });
  };

  const handleDelete = async () => {
    const resp = await axios.delete(`${baseURL}/api/post/${post._id}`);
    if (resp.status === 204) {
      router.push("/");
    }
    // console.log(data);
  };

  const handlePostComment = async (comment: string) => {
    const { data } = await axios.put(`${baseURL}/api/comment`, {
      userId: user?._id,
      comment: comment,
      postId: post._id,
    });
    setSPost(data.data);
  };
  return (
    <div className="lg:w-screen lg:h-screen lg:absolute top-0 left-0 flex flex-col-reverse lg:flex-row bg-white">
      <div className={`hidden bg-yellow-600 lg:absolute lg:top-5 lg:right-0 lg:left-5 lg:z-5 cursor-pointer`} onClick={() => router.back()}>
        <HiOutlineX className="text-2xl text-black lg:text-white" />
      </div>
      <div className="lg:flex-[2] w-full lg:bg-black flex justify-center items-center h-full mt-2 lg:mt-0">
        <div className="w-full h-full flex flex-col gap-4 lg:items-center lg:justify-center">
          <div className="w-full h-full lg:h-auto aspect-square lg:aspect-video relative">
            <Image src={post.photo.asset.url} layout="fill" className="object-cover lg:object-contain" />
          </div>
          <div className="block lg:hidden">
            <LikeComp likes={sPost.likes} handleLike={() => handlePress(true)} handleDislike={() => handlePress(false)} postedBy={post.postedBy._id} handleDelete={() => handleDelete()} />
          </div>
          <div className="block lg:hidden">
            <Comment comments={sPost.comments || []} />
          </div>
          <div className="block bottom-0 left-0 lg:hidden flex-1">
            <PostComment userProfile={user?.profile || null} user={user?.userName} handleComment={handlePostComment} />
          </div>
        </div>
      </div>

      <div className="lg:flex-1 lg:flex gap-5 lg:flex-col pt-4">
        <div className="flex-[0.5] flex flex-col gap-2 lg:gap-0 justify-between lg:pl-3">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="relative w-10 h-10 lg:w-16 lg:h-16 rounded-full">
                  <Image src={post.postedBy.profile} layout="fill" className="object-cover rounded-full" />
                </div>
                <p className="text-md font-bold">{post.postedBy.userName}</p>
              </div>
              <div className={`static lg:hidden cursor-pointer`} onClick={() => router.back()}>
                <HiOutlineX className="text-2xl text-black lg:text-white" />
              </div>
            </div>
            <p className="text-sm pl-1 lg:pl-3">{post.caption}</p>
          </div>
          <div className="hidden lg:block lg:mt-3">
            <LikeComp likes={sPost.likes} handleLike={() => handlePress(true)} handleDislike={() => handlePress(false)} postedBy={post.postedBy._id} handleDelete={() => handleDelete()} />
          </div>
        </div>
        <div className="hidden lg:block flex-1 overflow-hidden">
          <Comment comments={sPost.comments || []} />
        </div>
        <div className="hidden lg:block">
          <PostComment userProfile={user?.profile || null} user={user?.userName} handleComment={handlePostComment} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
  //Get the single post from backend
  const resp = await axios.get(`${baseURL}/api/post/${id}`);

  return {
    props: {
      post: resp.data.data,
    },
  };
};

export default SinglePost;
