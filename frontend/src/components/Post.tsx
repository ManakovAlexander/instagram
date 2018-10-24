import * as React from 'react';
import { IPost } from 'src/models/post';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { PostMenu } from './PostMenu';

interface IProps {
  post: IPost;
  onDelete: (id: string) => void;
}

class Post extends React.Component<IProps> {
  handleDelete = () => {
    this.props.onDelete(this.props.post._id);
  }

  render() {
    const post = this.props.post;
    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="Avatar">
              R
            </Avatar>
          }
          action={<PostMenu onDelete={this.handleDelete} />}
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardMedia
          style={{
            height: 0,
            paddingTop: '56.25%'
          }}
          image={`http://localhost:1337/files/${post.media[0]}`}
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
