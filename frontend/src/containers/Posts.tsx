import * as React from 'react';
import { IPost } from 'src/models/post';
import Post from 'src/components/Post';

interface IProps { }

interface IState {
  posts: IPost[];
}

class Posts extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      posts: []
    };
  }
  render() {
    return (
      <div>
        { this.state.posts.map(post => <Post post={post} key={post._id} />) }
      </div>
    );
  }

  componentWillMount() {
    fetch('http://localhost:1337/posts')
      .then(resp => {
        const isSuccess = resp.ok;
        return isSuccess ? resp.json() : resp.text();
      })
      .then(posts => {
        if (posts) {
          this.setState({ posts });
        }
      });
  }
}

export default Posts;
