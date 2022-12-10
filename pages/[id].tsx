import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { client } from "../utils/client";
import { postDetailQuery } from "../utils/queries";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import axios from "axios";
import { baseURL } from "../utils";

const SinglePost = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="">
      <p>Tes</p>
      <p>Tes</p>
      <p>Tes</p>
      <p>Tes</p>
      <p>Tes</p>
    </div>
  );
};

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
  //Get the single post from backend
  const resp = await axios.get(`${baseURL}/api/post/${id}`);
  //   console.log(resp);

  return {
    props: {
      msg: "tes",
    },
  };
};

export default SinglePost;
