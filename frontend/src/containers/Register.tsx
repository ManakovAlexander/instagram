import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    padding: 8,
  }
};

interface IProps { }

class State {
  login = '';
  password = '';
  name = '';
}

class RegisterContainer extends React.Component<IProps, State> {
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
        />
        <TextField
          required={true}
          label="name"
          margin="normal"
          onChange={this.handleNameChange}
          type="password"
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
    console.log(this.state);
  }

  isFormValid = (): boolean => {
    const { login, password, name } = this.state;
    return !!login && !!password && !!name;
  }
}

export default RegisterContainer;
