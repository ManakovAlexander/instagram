import * as React from 'react';
import { connect } from 'react-redux';

import { IStore } from '../../reducers';
import { fetchCurrentUser, updateAvatar } from '../../actions/profile';
import { State as ProfileState } from '../../reducers/profile';
import { IMedia } from '../../models/media';

import Avatar from './Avatar';
import EditProfile from './EditProfile';

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
    if (!currentUser) {
      return <div />;
    }
    return (
      <div>
        <Avatar avatarId={currentUser.avatarId} name={currentUser.name} updateAvatar={this.handleUpdateAvatar} />
        <EditProfile profile={currentUser} />
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

const mapDispatchToProps = (dispatch: (action: any) => void): IMapDispatchToProps => {
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
