import axios from "axios";
import jwt_decode from "jwt-decode";

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const createOrGetUser = async (response: any) => {
  const decoded: { given_name: string; picture: string; sub: string } = jwt_decode(response.credential);

  const user = {
    _id: decoded.sub,
    _type: "user",
    userName: decoded.given_name,
    profile: decoded.picture,
  };

  const res = await axios.post(`${baseURL}/api/auth`, user);
  return res.data.user;
};
