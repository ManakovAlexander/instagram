import React, { FunctionComponent, useState } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { IMedia } from '../../models/media';
import { IStore } from '../../reducers';
import MediaPreview from '../../common-components/MediaPreview';
import { createPost } from '../../actions/edit-post';
import { State as StoreState } from '../../reducers/edit-post';
import { readFile } from '../../infrastructure/file';
import styles from './EditPost.module.css';

interface IProps extends IMapDispatchToProps, IMapStateToProps {}

const EditPost: FunctionComponent<IProps> = props => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState<IMedia[]>([]);

  const handleFileChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const mediaFile = await readFile(ev);
    if (mediaFile) {
      setMedia(media.concat(mediaFile));
    }
  };

  const handleTitleChange = (ev: React.ChangeEvent<HTMLInputElement>) => setTitle(ev.target.value);

  const handleDescriptionChange = (ev: React.ChangeEvent<HTMLInputElement>) => setDescription(ev.target.value);

  const postIsValid = media.length > 0 && !!title;

  const saveIsDisabled = !postIsValid || props.saveInProgress || props.fetchInProgress;

  const sendPost = () => {
    if (!postIsValid) {
      return;
    }

    const postFormData = new FormData();
    if (media && media.length > 0) {
      media.forEach(m => {
        postFormData.append('media', m.file);
      });
    }
    if (title) {
      postFormData.append('title', title);
    }
    if (description) {
      postFormData.append('description', description);
    }

    props.onCreatePosts(postFormData);
  };

  return (
    <div>
      <form className={styles.form}>
        <input accept="image/*" className={styles.image_input} id="file-button" type="file" onChange={handleFileChange} />
        <label htmlFor="file-button">
          <Button variant="outlined" component="span">
            Upload
          </Button>
        </label>
        {media && media.map((m, index) => <MediaPreview key={index} media={m} />)}
        <TextField id="title" label="Title" value={title} onChange={handleTitleChange} required={true} className={styles.title_field} />
        <TextField
          id="description"
          label="Description"
          value={description}
          onChange={handleDescriptionChange}
          multiline={true}
          className={styles.description_field}
        />
        <Button variant="outlined" color="primary" disabled={saveIsDisabled} onClick={sendPost} className={styles.save_button}>
          Save
        </Button>
      </form>
    </div>
  );
};

type IMapStateToProps = StoreState;

const mapStateToProps = (store: IStore): IMapStateToProps => store.editPost;

interface IMapDispatchToProps {
  onCreatePosts: (postFormData: FormData) => void;
}

const mapDispatchToProps = (dispatch: (action: any) => void): IMapDispatchToProps => {
  return {
    onCreatePosts: (postFormData: FormData) => dispatch(createPost(postFormData))
  };
};

const EditPostContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPost);

export default EditPostContainer;
