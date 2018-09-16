import * as React from 'react';
import { connect } from 'react-redux';
import Post from 'src/components/Post';
import { IStore } from 'src/reducers';
import { postsRequest } from 'src/actions/posts';
import { IState as IPostsState } from 'src/reducers/posts';

interface IProps extends IPostsState {
  onFetchPosts: () => void;
}

interface IState { }

class Posts extends React.PureComponent<IProps, IState> {
  render() {
    const posts = this.props.posts;
    return (
      <div style={{ padding: 8 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gridGap: 8 }}>
          {posts.map(post => <Post post={post} key={post._id} />)}
        </div>
      </div>
    );
  }

  componentWillMount() {
    this.props.onFetchPosts();
  }
}

const mapStateToProps = (store: IStore) => {
  return store.posts;
};

const mapDispatchToProps = (dispatch: (action: any) => void) => {
  return {
    onFetchPosts: () => dispatch(postsRequest())
  };
};

const PostsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);

export default PostsContainer;
