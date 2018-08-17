import * as React from 'react';
import { IPost } from 'src/models/post';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

interface IProps {
  post: IPost;
}

class Post extends React.Component<IProps> {
  render() {
    const post = this.props.post;
    return (
      <Card>
        <CardMedia
          style={{
            height: 0,
            paddingTop: '56.25%'
          }}
          image={`http://localhost:1337/files/${post.photoId}`}
        />
        <CardContent>
          <Typography gutterBottom={true} variant="headline" component="h2">
            {post.title}
          </Typography>
          {
            post.description && <Typography component="p">{post.description}</Typography>
          }
        </CardContent>
      </Card>
    );
  }
}

export default Post;
