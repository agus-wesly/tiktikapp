import type { NextApiRequest, NextApiResponse } from "next";
import { postDetailQuery } from "../../utils/queries";
import { client } from "../../utils/client";
import { SanityDocument } from "@sanity/client";

interface Data {
  data: SanityDocument<Record<string, any>>;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "PUT") {
    const { userId, comment, postId } = req.body;

    try {
      await client
        .patch(postId)
        .insert("after", "comments[-1]", [
          {
            _type: "comments",
            postedBy: {
              _type: "postedBy",
              _ref: userId,
            },
            comment,
          },
        ])
        .commit();
      const singPost = await client.fetch(postDetailQuery(postId));
      res.status(200).json({ data: singPost[0] });
    } catch (error) {
      console.log(error);
    }
  }
}
