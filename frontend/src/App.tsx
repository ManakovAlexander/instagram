import * as React from 'react';
import { Home, Add, AccountBox } from '@material-ui/icons';
import { Switch, Route, withRouter } from 'react-router-dom';


import EditPost from './containers/EditPost';
import Posts from './containers/Posts';
import Footer from './components/Footer';
import Register from './containers/Register';
import Auth from './containers/Auth';
import { IStore } from './reducers';
import { connect } from 'react-redux';

interface IProps extends IMapStateToProps { }

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

class State {
  readonly id: number = 1;
}

class App extends React.Component<IProps, State> {
  readonly state = new State();
  render() {
    const filteredPages = pages.filter(page => page.show ? page.show(this.props) : true);
    return (
      <div className="App">
        <Switch>
          {
            filteredPages
              .map(page => <Route path={page.path} exact={true} key={page.id} component={page.component} />)
          }
        </Switch>
        <Footer pages={filteredPages} id={this.state.id} redirect={this.handleRedirect} />
      </div>
    );
  }

  handleRedirect = (id: number) => {
    this.setState({ id });
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
