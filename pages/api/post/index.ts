import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { allPostsQuery } from "../../../utils/queries";
import { allPosts } from "../../../types";

interface Data {
  data: allPosts[] | string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    const allPosts = await client.fetch(allPostsQuery());

    return res.status(200).json({ data: allPosts });
  } else if (req.method === "POST") {
    const newData = req.body;
    try {
      await client.create(newData);
      console.log("success");
      return res.status(201).json({ data: "sucess" });
    } catch (err) {
      return res.status(500);
    }
  }
}
