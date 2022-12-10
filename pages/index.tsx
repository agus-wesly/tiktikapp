import axios from "axios";
import VideoCard from "../components/VideoCard";
import { allPosts } from "../types";
import { baseURL } from "../utils";

interface IProps {
  allMsg: allPosts[];
}

export default function Home({ allMsg }: IProps) {
  return (
    <div className="flex flex-col">
      {allMsg?.map((msg) => (
        <>
          <VideoCard post={msg} />
        </>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const { data } = await axios.get(`${baseURL}/api/post`);
  return {
    props: { allMsg: data.data }, // will be passed to the page component as props
  };
}
