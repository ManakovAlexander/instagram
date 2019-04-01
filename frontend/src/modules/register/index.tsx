import React, { FunctionComponent, useState, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { register } from '../../actions/register/index';
import { IRegisterData } from '../../models/register';
import { State as StoreState } from '../../reducers/register';
import { IStore } from '../../reducers';
import { Redirect } from 'react-router';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    padding: 8
  }
};

interface IProps extends IMapStateToProps, IMapDispatchToProps {}

const Register: FunctionComponent<IProps> = props => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLoginChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => setLogin(ev.currentTarget.value), []);

  const handlePasswordChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => setPassword(ev.currentTarget.value), []);

  const handleNameChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => setName(ev.currentTarget.value), []);

  const handleSubmit = useCallback(
    (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      props.onRegister({ login, password, name });
    },
    [props.onRegister]
  );

  const isFormValid = !!login && !!password && !!name;

  if (props.token) {
    return <Redirect to="/posts" />;
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <TextField required={true} label="login" margin="normal" onChange={handleLoginChange} />
      <TextField required={true} label="password" margin="normal" onChange={handlePasswordChange} type="password" />
      <TextField required={true} label="name" margin="normal" onChange={handleNameChange} />
      <Button variant="outlined" color="primary" type="submit" disabled={!isFormValid}>
        Register
      </Button>
    </form>
  );
};

interface IMapStateToProps extends StoreState {
  token: string | null;
}

const mapStateToProps = (store: IStore): IMapStateToProps => {
  return {
    ...store.register,
    token: store.auth.token
  };
};

interface IMapDispatchToProps {
  onRegister: (data: IRegisterData) => void;
}

const mapDispatchToProps = (dispatch: (action: any) => void): IMapDispatchToProps => {
  return {
    onRegister: data => dispatch(register(data))
  };
};

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

export default RegisterContainer;
