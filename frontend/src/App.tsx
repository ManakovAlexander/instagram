import * as React from 'react';
import { Home, Add, AccountBox, AccountCircle } from '@material-ui/icons';
import { Switch, Route, withRouter, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { IStore } from './reducers';
import { IPage } from './models';
import { Provider } from 'react-redux';

import EditPost from './containers/EditPost';
import Posts from './containers/Posts';
import Footer from './components/Footer';
import Register from './containers/Register';
import Auth from './containers/Auth';
import Profile from './modules/profile';

import store from './store';

interface IProps extends IMapStateToProps, RouteComponentProps {}

const pages: IPage[] = [
  {
    id: 1,
    label: 'Posts',
    icon: Home,
    path: '/posts',
    component: Posts,
    show: (props: IProps) => true
  },
  {
    id: 2,
    label: 'Add post',
    icon: Add,
    path: '/add-post',
    component: EditPost,
    show: (props: IProps) => props.isAuthenticated
  },
  {
    id: 5,
    label: 'Profile',
    icon: AccountCircle,
    path: '/profile',
    component: Profile,
    show: (props: IProps) => props.isAuthenticated
  },
  {
    id: 3,
    label: 'Register',
    icon: Add,
    path: `/register`,
    component: Register,
    show: (props: IProps) => !props.isAuthenticated
  },
  {
    id: 4,
    label: 'Log in',
    icon: AccountBox,
    path: `/log-in`,
    component: Auth,
    show: (props: IProps) => !props.isAuthenticated
  }
];

class App extends React.Component<IProps> {
  render() {
    const { pathname } = this.props.location;
    const activePage = pages.find(page => page.path === pathname);
    const activePageId = activePage ? activePage.id : null;
    const filteredPages = pages.filter(page => (page.show ? page.show(this.props) : true));
    return (
      <div className="App">
        <Switch>
          {filteredPages.map(page => (
            <Route path={page.path} exact={true} key={page.id} component={page.component} />
          ))}
          <Redirect to={pages[0].path} />
        </Switch>
        <Footer pages={filteredPages} activePageId={activePageId} />
      </div>
    );
  }

  handleRedirect = (activePageId: number) => {
    this.setState({ activePageId });
  }
}

interface IMapStateToProps {
  isAuthenticated: boolean;
}

const mapStateToProps = (s: IStore): IMapStateToProps => ({
  isAuthenticated: s.auth.token != null
});

const ConnectedApp = withRouter(connect(mapStateToProps)(App) as any);

export default () => (
  <Provider store={store}>
    <BrowserRouter>
      <ConnectedApp />
    </BrowserRouter>
  </Provider>
);
