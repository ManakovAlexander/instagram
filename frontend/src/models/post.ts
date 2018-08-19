export interface IPost {
  _id: string;
  media: string[];
  title: string;
  description: string;
}

export interface IMedia {
  file: File;
  imagePreviewUrl: string;
}
