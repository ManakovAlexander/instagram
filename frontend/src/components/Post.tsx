import * as React from 'react';
import { IPost } from 'src/models/post';

interface IProps {
  post: IPost;
}

class Post extends React.Component<IProps> {
  render() {
    const post = this.props.post;
    return (
      <div>
        <img src={`http://localhost:1337/files/${post.photoId}`} width="300" />
        <p>{post.title}</p>
        { post.description && <p>{post.description}</p> }
      </div>
    );
  }
}

export default Post;
