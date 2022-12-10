import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "bd8v1ij7",
  dataset: "production",
  apiVersion: "2022-12-06",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
