import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";
import { SanityDocument } from "@sanity/client";

interface Data {
  data: SanityDocument<Record<string, any>>;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "PUT") {
    const { userId, like, postId } = req.body;
    try {
      const data = like
        ? await client
            .patch(postId)
            .setIfMissing({ likes: [] })
            .insert("after", "likes[-1]", [
              {
                _ref: userId,
              },
            ])
            .commit()
        : await client
            .patch(postId)
            .unset([`likes[_ref=="${userId}"]`])
            .commit();
      res.status(200).json({ data });
    } catch (error) {
      console.log(error);
    }
  }
}
