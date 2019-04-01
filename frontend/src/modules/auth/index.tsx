import React, { FunctionComponent, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { State as StoreState } from '../../reducers/auth';
import { IStore } from '../../reducers';
import { IAuthData } from '../../models/auth';
import { auth } from '../../actions/auth';
import styles from './index.module.css';
import ErrorSnackbar from '../../common-components/ErrorSnackbar';

interface IProps extends IMapStateToProps, IMapDispathToProps {}

const Auth: FunctionComponent<IProps> = props => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => setLogin(ev.currentTarget.value), []);

  const handlePasswordChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => setPassword(ev.currentTarget.value), []);

  const handleSubmit = useCallback(
    (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      props.onAuth({ login, password });
    },
    [props.onAuth, login, password]
  );

  const isFormValid = !!login && !!password;
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <TextField required={true} label="login" margin="normal" onChange={handleLoginChange} />
      <TextField required={true} label="password" margin="normal" onChange={handlePasswordChange} type="password" />
      <Button variant="outlined" color="primary" type="submit" disabled={!isFormValid}>
        Login
      </Button>
      <ErrorSnackbar open={!!props.error} message={props.error ? props.error.message : null} />
    </form>
  );
};

type IMapStateToProps = StoreState;

const mapStateToProps = (store: IStore) => store.auth;

interface IMapDispathToProps {
  onAuth: (authDate: IAuthData) => void;
}

const mapDispathToProps = (dispatch: (action: any) => void): IMapDispathToProps => {
  return {
    onAuth: authData => dispatch(auth(authData))
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Auth);
