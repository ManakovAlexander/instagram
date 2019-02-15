import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { PhotoCamera } from '@material-ui/icons';

import { IMedia } from '../../models/media';
import { readFile } from '../../infrastructure/file';

const styles = {
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    backgroundColor: '#3c8dd4'
  },
  avatarWrapper: {
    position: 'relative' as 'relative'
  },
  avatar: {
    width: 150,
    borderRadius: '50%',
    border: '4px solid white'
  },
  form: {
    position: 'absolute' as 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3c8dd4',
    border: '4px solid white',
    borderRadius: '50%'
  },
  imageInput: {
    display: 'none'
  }
};

interface IProps {
  avatarId: string | null;
  name: string | null;
  updateAvatar: (media: IMedia) => void;
}

export default class extends React.PureComponent<IProps> {
  render() {
    const { avatarId } = this.props;
    return (
      <div style={styles.avatarContainer}>
        <div style={styles.avatarWrapper}>
          <img
            src={
              avatarId ? `http://localhost:1337/files/${avatarId}` : undefined
            }
            style={styles.avatar}
          />
          <form style={styles.form}>
            <input
              accept="image/*"
              style={styles.imageInput}
              id="file-button"
              type="file"
              onChange={this.handleFileChange}
            />
            <label htmlFor="file-button">
              <IconButton component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          </form>
        </div>
      </div>
    );
  }

  handleFileChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const media = await readFile(ev);
    if (!media) {
      return;
    }
    this.props.updateAvatar(media);
  }
}
