import * as React from 'react';
import { connect } from 'react-redux';

import { IStore } from 'src/reducers';
import { fetchCurrentUser, updateAvatar } from 'src/actions/profile';
import { State as ProfileState } from 'src/reducers/profile';
import Profile from 'src/components/Profile';
import { IMedia } from 'src/models/media';

interface IProps extends IMapStateToProps, IMapDispatchToProps {}

class State {
  readonly newAvatar: IMedia | null = null;
}

class Page extends React.PureComponent<IProps, State> {
  readonly state = new State();
  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        {currentUser ? (
          <Profile
            avatarId={currentUser.avatarId}
            name={currentUser.name}
            updateAvatar={this.handleUpdateAvatar}
          />
        ) : null}
      </div>
    );
  }

  handleUpdateAvatar = (media: IMedia) => {
    const formData = new FormData();
    formData.append('avatar', media.file);
    this.props.updateAvatar(formData);
  }
}

interface IMapStateToProps extends ProfileState {}

const mapStateToProps = (store: IStore): IMapStateToProps => {
  return store.profile;
};

interface IMapDispatchToProps {
  fetchCurrentUser: () => void;
  updateAvatar: (fromData: FormData) => void;
}

const mapDispatchToProps = (
  dispatch: (action: any) => void
): IMapDispatchToProps => {
  return {
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
    updateAvatar: formData => dispatch(updateAvatar(formData))
  };
};

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);

export default ProfileContainer;
