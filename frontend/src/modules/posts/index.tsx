import * as React from 'react';
import { connect } from 'react-redux';
import Post from './post';
import { IStore } from '../../reducers';
import { fetchPosts, deletePost } from '../../actions/posts';
import { State as PostsState } from '../../reducers/posts';

interface IProps extends PostsState {
  onFetchPosts: () => void;
  onDeletePost: (postId: string) => void;
}

const styles = {
  postsContainer: {
    padding: 8
  },
  postsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    gridGap: 8
  }
}

class Posts extends React.PureComponent<IProps> {
  componentWillMount() {
    this.props.onFetchPosts();
  }

  handleDelete = (postId: string) => {
    this.props.onDeletePost(postId);
  }

  render() {
    const posts = this.props.posts;
    return (
      <div style={styles.postsContainer}>
        <div
          style={styles.postsGrid}
        >
          {posts.map(post => (
            <Post post={post} key={post._id} onDelete={this.handleDelete} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store: IStore) => {
  return store.posts;
};

const mapDispatchToProps = (dispatch: (action: any) => void) => {
  return {
    onFetchPosts: () => dispatch(fetchPosts()),
    onDeletePost: (postId: string) => dispatch(deletePost(postId))
  };
};

const PostsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);

export default PostsContainer;
