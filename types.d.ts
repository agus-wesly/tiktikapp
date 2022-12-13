export interface comment {
  _key: string;
  comment: string;
  postedBy: {
    _id: string;
    profile: string;
    userName: string;
  };
}

export interface allPosts {
  _id: string;
  caption: string;
  comment: comment[];
  photo: {
    asset: {
      url: string;
    };
  };
  postedBy: {
    _id: string;
    userName: string;
    profile: string;
  };
  userId: string;
}

export interface singlePost {
  _id: string;
  caption: string;
  comments: comment[] | null;
  likes:
    | {
        _ref: string;
      }[]
    | null;
  photo: {
    asset: {
      url: string;
    };
  };
  postedBy: {
    _id: string;
    userName: string;
    profile: string;
  };
  userId: string;
}
