import axios from "axios";
import VideoCard from "../components/VideoCard";
import { allPosts } from "../types";
import { baseURL } from "../utils";
import { GetServerSidePropsContext } from "next";
import NotFound from "../components/NotFound";

interface IProps {
  allMsg: allPosts[];
}

type QueryParams = {
  paramName: string;
  // other query parameters here
};

export default function Home({ allMsg }: IProps) {
  if (allMsg.length < 1) return <NotFound />;
  return (
    <div className="flex flex-col">
      {allMsg.map((msg) => (
        <>
          <VideoCard post={msg} />
        </>
      ))}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { category } = context.query;

  if (!category) {
    const { data } = await axios.get(`${baseURL}/api/post`);
    return {
      props: { allMsg: data.data }, // will be passed to the page component as props
    };
  } else {
    console.log("You got a category");
    const { data } = await axios.get(`${baseURL}/api/topic/${category}`);

    return {
      props: { allMsg: data.data }, // will be passed to the page component as props
    };
  }
}
