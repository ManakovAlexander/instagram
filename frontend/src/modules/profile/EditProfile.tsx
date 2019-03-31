import React, { useState, FunctionComponent, useCallback, useMemo } from 'react';
import isEqual from 'lodash/isEqual';
import { TextField } from '@material-ui/core';

import { ICurrentUser } from '../../models/users';

import styles from './EditProfile.module.css';

interface IProps {
  profile: ICurrentUser;
}

const EditProfile: FunctionComponent<IProps> = (props: { profile: ICurrentUser }) => {
  const [profile, setProfile] = useState<ICurrentUser | null>(null);

  const shouldUpdateProfile = useMemo(() => isEqual(props.profile, profile) === false, [props.profile, profile]);
  if (shouldUpdateProfile) {
    setProfile(props.profile);
  }

  const handleNameChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      if (profile) {
        const name = ev.currentTarget.value;
        setProfile({ ...profile, name });
      }
    },
    [profile, setProfile]
  );

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
