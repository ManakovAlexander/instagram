import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { register } from '../actions/register/index';
import { IRegisterData } from '../models/register';
import { State as StoreState } from '../reducers/register';
import { IStore } from '../reducers';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    padding: 8,
  }
};

interface IProps extends IMapDispatchToProps { }

class State {
  login = '';
  password = '';
  name = '';
}

class Register extends React.Component<IProps, State> {
  state = new State();

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
        <TextField
          required={true}
          label="name"
          margin="normal"
          onChange={this.handleNameChange}
        />
        <Button variant="outlined" color="primary" type="submit" disabled={!isFormValid}>
          Register
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

  handleNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: ev.currentTarget.value });
  }

  handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const { login, password, name } = this.state;
    this.props.onRegister({ login, password, name });
  }

  isFormValid = (): boolean => {
    const { login, password, name } = this.state;
    return !!login && !!password && !!name;
  }
}

type IMapStateToProps = StoreState;

const mapStateToProps = (store: IStore): IMapStateToProps => {
  return store.register;
};

interface IMapDispatchToProps {
  onRegister: (data: IRegisterData) => void;
}

const mapDispatchToProps = (dispatch: (action: any) => void): IMapDispatchToProps => {
  return {
    onRegister: data => dispatch(register(data)),
  };
};

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);

export default RegisterContainer;
