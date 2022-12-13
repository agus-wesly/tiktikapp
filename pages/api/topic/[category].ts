import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { singlePost } from "../../../types";
import { topicPostsQuery } from "../../../utils/queries";

interface Data {
  data: singlePost;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    const { category } = req.query;

    try {
      const data = await client.fetch(topicPostsQuery(category));
      console.log(data);
      res.status(200).json({ data });
    } catch (error) {
      res.statusCode = 500;
    }
  }
}
