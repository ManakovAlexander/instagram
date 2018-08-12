import * as React from 'react';

interface IProps { }

interface IState {
  login: string;
  password: string;
  name: string;
}

class RegisterContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      login: '',
      password: '',
      name: ''
    };
  }

  render() {
    return (
      <form>
        <input value={this.state.login} onChange={this.handleLoginChange} placeholder="login" required={true} />
        <input value={this.state.password} onChange={this.handlePasswordChange} placeholder="password" required={true} />
        <input value={this.state.name} onChange={this.handleNameChange} placeholder="name" required={true} />
        <button type="submit">Register</button>
      </form>
    );
  }

  handleLoginChange = (ev: React.FormEvent<HTMLInputElement>) => {
    this.setState({ login: ev.currentTarget.value });
  }

  handlePasswordChange = (ev: React.FormEvent<HTMLInputElement>) => {
    this.setState({ password: ev.currentTarget.value });
  }

  handleNameChange = (ev: React.FormEvent<HTMLInputElement>) => {
    this.setState({ name: ev.currentTarget.value });
  }
}

export default RegisterContainer;
