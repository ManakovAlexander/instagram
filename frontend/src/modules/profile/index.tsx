import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';

import { IStore } from '../../reducers';
import { fetchCurrentUser, updateAvatar } from '../../actions/profile';
import { State as ProfileState } from '../../reducers/profile';
import { IMedia } from '../../models/media';

import Avatar from './Avatar';
import EditProfile from './EditProfile';

interface IProps extends IMapStateToProps, IMapDispatchToProps {}

const Page: FunctionComponent<IProps> = props => {
  useEffect(() => {
    props.fetchCurrentUser();
  }, []);

  function handleUpdateAvatar(media: IMedia) {
    const formData = new FormData();
    formData.append('avatar', media.file);
    props.updateAvatar(formData);
  }

  const { currentUser } = props;
  if (!currentUser) {
    return <div />;
  }
  return (
    <div>
      <Avatar avatarId={currentUser.avatarId} updateAvatar={handleUpdateAvatar} />
      <EditProfile profile={currentUser} />
    </div>
  );
};

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
