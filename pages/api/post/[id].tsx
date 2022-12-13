import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { postDetailQuery } from "../../../utils/queries";
import { singlePost } from "../../../types";

interface Data {
  data: singlePost;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    const { id } = req.query;

    //Get single post from sanity
    try {
      const singPost = await client.fetch(postDetailQuery(id));
      res.status(200).json({ data: singPost[0] });
    } catch (error) {
      res.statusCode = 500;
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    if (typeof id === "string") {
      const delResp = await client.delete(id);
      res.status(204).end();
    }
  }
}
