import * as React from 'react';
import './App.css';
import AddPost from './containers/AddPost';
import Posts from './containers/Posts';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Posts />
        <AddPost />
      </div>
    );
  }
}

export default App;
