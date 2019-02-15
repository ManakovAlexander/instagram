import * as React from 'react';
import { ICurrentUser } from '../../models/users';

interface IProps {
  profile: ICurrentUser;
}

class State {
  readonly profile: ICurrentUser | null = null;
}

export default class extends React.PureComponent<IProps, State> {
  readonly state = new State();

  render() {
    const { profile } = this.state;
    if (!profile) {
      return null;
    }
    return (
      <div>
        <div>{profile.name}</div>
      </div>
    );
  }
}
