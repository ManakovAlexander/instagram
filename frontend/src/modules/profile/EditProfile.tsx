import * as React from "react";
import { ICurrentUser } from "../../models/users";
import { TextField } from "@material-ui/core";

import styles from "./EditProfile.module.css";

interface IProps {
  profile: ICurrentUser;
}

class State {
  readonly profile: ICurrentUser | null = null;
}

export default class EditProfile extends React.PureComponent<IProps, State> {
  readonly state = new State();

  constructor(props: IProps) {
    super(props);
    this.state = {
      profile: this.props.profile
    };
  }

  handleNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (this.state.profile) {
      const name = ev.currentTarget.value;
      const profile = { ...this.state.profile, name };
      this.setState({ profile });
    }
  }

  render() {
    const { profile } = this.state;
    if (!profile) {
      return null;
    }
    return (
      <form noValidate={true} autoComplete="off" className={styles.form}>
        <TextField id="standard-name" label="Name" value={profile.name} onChange={this.handleNameChange} />
      </form>
    );
  }
}
