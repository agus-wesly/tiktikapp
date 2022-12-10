import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { postDetailQuery } from "../../../utils/queries";
import { allPosts } from "../../../types";

interface Data {
  data: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    console.log(req.query);
    res.status(200).json({ data: "tes" });
  }
}
