import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import Post from './post';
import { IStore } from '../../reducers';
import { fetchPosts, deletePost } from '../../actions/posts';
import { State as StoreState } from '../../reducers/posts';
import styles from './index.module.css';

interface IProps extends IMapStateToProps, IMapDispatchToProps {}

const Posts: FunctionComponent<IProps> = props => {
  useEffect(() => {
    props.onFetchPosts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {props.posts.map(post => (
          <Post post={post} key={post._id} onDelete={props.onDeletePost} />
        ))}
      </div>
    </div>
  );
};

type IMapStateToProps = StoreState;

const mapStateToProps = (store: IStore): IMapStateToProps => {
  return store.posts;
};

interface IMapDispatchToProps {
  onFetchPosts: () => void;
  onDeletePost: (postId: string) => void;
}

const mapDispatchToProps = (dispatch: (action: any) => void): IMapDispatchToProps => {
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
