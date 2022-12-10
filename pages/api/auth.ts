import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";

interface Data {
  user: {
    _id: string;
    _type: string;
    userName: string;
    profile: string;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    if (req.method === "POST") {
      const user = req.body;

      //Send to sanity
      await client.createIfNotExists(user);
      return res.status(200).json({ user });
    }
  } catch (error) {
    console.log(error);
  }
}
