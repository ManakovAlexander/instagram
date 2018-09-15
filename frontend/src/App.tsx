import * as React from 'react';
import { Route } from 'react-router-dom';
import { Home, Add } from '@material-ui/icons';

import AddPost from './containers/AddPost';
import Posts from './containers/Posts';
import Footer from './components/Footer';

const pages = [
  {
    label: 'Posts',
    icon: Home,
    path: '/posts',
    component: Posts,
    isInitial: true
  },
  {
    label: 'Add post',
    icon: Add,
    path: '/add-post',
    component: AddPost,
    isInitial: false
  }
];

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div>
          {
            pages.map((page, i) => <Route path={page.path} key={i} component={page.component} />)
          }
        </div>
        <Footer pages={pages} />
      </div>
    );
  }
}

export default App;
