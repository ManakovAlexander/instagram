import * as React from 'react';
import { Home, Add, AccountBox } from '@material-ui/icons';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';


import EditPost from './containers/EditPost';
import Posts from './containers/Posts';
import Footer from './components/Footer';
import Register from './containers/Register';
import Auth from './containers/Auth';
import { IStore } from './reducers';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

interface IProps extends IMapStateToProps, RouteComponentProps { }

const pages = [
  {
    id: 1,
    label: 'Posts',
    icon: Home,
    path: '/posts',
    component: Posts,
    isInitial: true,
    show: (props: IProps) => true
  },
  {
    id: 2,
    label: 'Add post',
    icon: Add,
    path: '/add-post',
    component: EditPost,
    isInitial: false,
    show: (props: IProps) => props.isAuthenticated
  },
  {
    id: 3,
    label: 'Register',
    icon: Add,
    path: `/register`,
    component: Register,
    isInitial: false,
    show: (props: IProps) => !props.isAuthenticated
  },
  {
    id: 4,
    label: 'Log in',
    icon: AccountBox,
    path: `/log-in`,
    component: Auth,
    isInitial: false,
    show: (props: IProps) => !props.isAuthenticated
  },
];

class App extends React.Component<IProps> {
  render() {
    const { pathname } = this.props.location;
    const activePage = pages.find(page => page.path === pathname);
    const activePageId = activePage ? activePage.id : null;
    const filteredPages = pages.filter(page => page.show ? page.show(this.props) : true);
    return (
      <div className="App">
        <Switch>
          {
            filteredPages
              .map(page => <Route path={page.path} exact={true} key={page.id} component={page.component} />)
          }
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

const mapStateToProps = (store: IStore): IMapStateToProps => ({
  isAuthenticated: store.auth.token != null
});

export default withRouter(connect(
  mapStateToProps
)(App) as any);
