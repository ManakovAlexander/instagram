import * as React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { State as StoreState } from '../../reducers/auth';
import { IStore } from '../../reducers';
import { IAuthData } from '../../models/auth';
import { auth } from '../../actions/auth';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    padding: 8
  }
};

interface IProps extends IMapStateToProps, IMapDispathToProps {}

class State {
  readonly login: string = '';
  readonly password: string = '';
}

class Auth extends React.Component<IProps, State> {
  readonly state = new State();

  render() {
    const isFormValid = this.isFormValid();
    return (
      <form onSubmit={this.handleSubmit} style={styles.form}>
        <TextField
          required={true}
          label="login"
          margin="normal"
          onChange={this.handleLoginChange}
        />
        <TextField
          required={true}
          label="password"
          margin="normal"
          onChange={this.handlePasswordChange}
          type="password"
        />
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          disabled={!isFormValid}
        >
          Login
        </Button>
      </form>
    );
  }

  handleLoginChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ login: ev.currentTarget.value });
  }

  handlePasswordChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: ev.currentTarget.value });
  }

  handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const { login, password } = this.state;
    this.props.onAuth({ login, password });
  }

  isFormValid = (): boolean => {
    const { login, password } = this.state;
    return !!login && !!password;
  }
}

type IMapStateToProps = StoreState;

const mapStateToProps = (store: IStore) => store.auth;

interface IMapDispathToProps {
  onAuth: (authDate: IAuthData) => void;
}

const mapDispathToProps = (
  dispatch: (action: any) => void
): IMapDispathToProps => {
  return {
    onAuth: authData => dispatch(auth(authData))
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Auth);
