import React, { FunctionComponent, useCallback } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

import PostMenu from './PostMenu';
import DateFormatter from '../../../common-components/DateFormatter';
import { IPostView } from '../../../models/post';

interface IProps {
  post: IPostView;
  onDelete: (id: string) => void;
}

const Post: FunctionComponent<IProps> = ({ post, onDelete }) => {
  const handleDelete = useCallback(() => onDelete(post._id), [onDelete, post._id]);
  return (
    <Card>
      <CardHeader
        avatar={<Avatar aria-label="Avatar" src={`http://localhost:1337/files/${post.user.avatarId}`} />}
        action={<PostMenu onDelete={handleDelete} />}
        title={post.user.name}
        subheader={<DateFormatter format="D MMM in H:mm">{post.created}</DateFormatter>}
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
};

export default Post;
