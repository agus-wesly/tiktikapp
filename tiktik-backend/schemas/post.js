export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "caption",
      title: "Caption",
      type: "string",
    },
    {
      name: "photo",
      title: "Photo",
      type: "file",
      options: [
        {
          hotspot: true,
        },
      ],
    },
    {
      name: "userId",
      title: "User ID",
      type: "string",
    },
    {
      name: "postedBy",
      title: "Posted By",
      type: "postedBy",
    },
    {
      name: "likes",
      title: "Likes",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "user" }],
        },
      ],
    },
    {
      name: "comments",
      title: "Comments",
      type: "array",
      of: [{ type: "comments" }],
    },
    {
      name: "topic",
      title: "Topic",
      type: "string",
    },
  ],
};
