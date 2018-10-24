import { IPost } from '../models/post';

export interface IState {
  posts: IPost[];
  inProgress: boolean;
  error: any;
}

const initialState: IState = {
  posts: [],
  inProgress: false,
  error: null
};

export const reducer = (state: IState = initialState, action: { type: string, [key: string]: any }) => {
  if (action.type === 'POSTS_REQUEST') {
    return {
      ...state,
      inProgress: true
    };
  }

  if (action.type === 'POSTS_REQUEST_SUCCESS') {
    return {
      ...state,
      posts: action.posts,
      inProgress: false
    };
  }

  if (action.type === 'POSTS_REQUEST') {
    return {
      ...state,
      error: action.error,
      inProgress: false
    };
  }

  if (action.type === 'POSTS_DELETE') {
    return {
      ...state,
      posts: state.posts.filter(post => post._id !== action.postId)
    };
  }

  return state;
};
