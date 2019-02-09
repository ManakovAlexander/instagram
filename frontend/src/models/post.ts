export interface IPost {
  _id: string;
  media: string[];
  title: string;
  description: string;
}

export interface IPostView {
  _id: string;
  media: string[];
  title: string;
  description: string;
  user: {
    avatarId: string;
    name: string;
  };
  created: string;
}
