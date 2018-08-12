import * as React from 'react';
import './App.css';
import AddPost from './containers/AddPost';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AddPost />
      </div>
    );
  }
}

export default App;
