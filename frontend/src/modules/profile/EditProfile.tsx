import React, { useState, FunctionComponent } from 'react';
import isEqual from 'lodash/isEqual';
import { TextField } from '@material-ui/core';

import { ICurrentUser } from '../../models/users';

import styles from './EditProfile.module.css';

interface IProps {
  profile: ICurrentUser;
}

const EditProfile: FunctionComponent<IProps> = (props: { profile: ICurrentUser }) => {
  const [profile, setProfile] = useState<ICurrentUser | null>(null);

  const shouldUpdateProfile = isEqual(props.profile, profile) === false;
  if (shouldUpdateProfile) {
    setProfile(props.profile);
  }

  function handleNameChange(ev: React.ChangeEvent<HTMLInputElement>) {
    if (profile) {
      const name = ev.currentTarget.value;
      setProfile({ ...profile, name });
    }
  }

  if (!profile) {
    return null;
  }

  return (
    <form noValidate={true} autoComplete="off" className={styles.form}>
      <TextField id="standard-name" label="Name" value={profile.name} onChange={handleNameChange} />
    </form>
  );
};

export default EditProfile;
