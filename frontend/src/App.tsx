import * as React from 'react';
import AddPost from './containers/AddPost';
import Posts from './containers/Posts';
import { Link, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <nav>
          <Link to="/posts">Posts</Link>
          <Link to="/add-post">Add post</Link>
        </nav>
        <Route path="/posts" component={Posts} />
        <Route path="/add-post" component={AddPost} />
      </div>
    );
  }
}

export default App;
