import React, { FunctionComponent, useCallback } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { PhotoCamera } from '@material-ui/icons';

import styles from './Avatar.module.css';
import { IMedia } from '../../models/media';
import { readFile } from '../../infrastructure/file';
import { baseUrl } from '../../constants';

interface IProps {
  avatarId: string | null;
  updateAvatar: (media: IMedia) => void;
}

const Avatar: FunctionComponent<IProps> = ({ avatarId, updateAvatar }) => {
  const handleFileChange = useCallback(
    async (ev: React.ChangeEvent<HTMLInputElement>) => {
      const media = await readFile(ev);
      if (!media) {
        return;
      }
      updateAvatar(media);
    },
    [updateAvatar]
  );

  return (
    <div className={styles.avatar_container}>
      <div className={styles.avatar_wrapper}>
        <img src={avatarId ? `${baseUrl}/files/${avatarId}` : undefined} className={styles.avatar} />
        <form className={styles.form}>
          <input accept="image/*" className={styles.image_input} id="file-button" type="file" onChange={handleFileChange} />
          <label htmlFor="file-button">
            <IconButton component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Avatar;
