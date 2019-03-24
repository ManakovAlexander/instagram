import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

import PostMenu from './PostMenu';
import DateFormatter from '../../../components/DateFormatter';
import { IPostView } from '../../../models/post';

interface IProps {
  post: IPostView;
  onDelete: (id: string) => void;
}

export default class Post extends React.PureComponent<IProps> {
  handleDelete = () => {
    this.props.onDelete(this.props.post._id);
  }

  render() {
    const post = this.props.post;
    return (
      <Card>
        <CardHeader
          avatar={<Avatar aria-label="Avatar" src={`http://localhost:1337/files/${post.user.avatarId}`} />}
          action={<PostMenu onDelete={this.handleDelete} />}
          title={post.user.name}
          subheader={<DateFormatter format="d mmm in H:MM">{post.created}</DateFormatter>}
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
          {post.description && <Typography component="p">{post.description}</Typography>}
        </CardContent>
      </Card>
    );
  }
}
