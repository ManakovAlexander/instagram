import * as React from 'react';
import { IPost } from 'src/models/post';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

interface IProps {
  post: IPost;
}

class Post extends React.Component<IProps> {
  render() {
    const post = this.props.post;
    return (
      <Card style={{ margin: 10 }}>
        <CardContent>
          <img src={`http://localhost:1337/files/${post.photoId}`} width="300" />
          <p>{post.title}</p>
          {post.description && <p>{post.description}</p>}
        </CardContent>
      </Card>
    );
  }
}

export default Post;
