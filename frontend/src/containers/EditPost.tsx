import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { IMedia } from '../models/post';
import MediaPreview from '../components/MediaPreview';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    padding: 8,
  },
  imageInput: {
    display: 'none',
  },
  titleField: {
    margin: 8,
  },
  descriptionField: {
    margin: 8,
  },
  saveButton: {
    margin: 8,
  }
};

interface IProps { }

interface IState {
  title: string | undefined;
  description: string | undefined;
  media: IMedia[];
}

class EditPost extends React.Component<IProps, IState> {
  readonly state: IState = {
    title: '',
    description: '',
    media: []
  };

  render() {
    return (
      <div>
        <form style={styles.form}>
          <input
            accept="image/*"
            style={styles.imageInput}
            id="file-button"
            type="file"
            onChange={this.handleFileChange}
          />
          <label htmlFor="file-button">
            <Button variant="outlined" component="span">
              Upload
              </Button>
          </label>
          {this.state.media && this.state.media.map((media, index) => <MediaPreview key={index} media={media} />)}
          <TextField
            id="title"
            label="Title"
            value={this.state.title}
            onChange={this.handleTitleChange}
            required={true}
            style={styles.titleField}
          />
          <TextField
            id="description"
            label="Description"
            value={this.state.description}
            onChange={this.handleDescriptionChange}
            multiline={true}
            style={styles.descriptionField}
          />
          <Button
            variant="outlined"
            color="primary"
            disabled={!this.postIsValid}
            onClick={this.sendPost}
            style={styles.saveButton}>
            Save
          </Button>
        </form>
      </div>
    );
  }

  handleFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (!ev.currentTarget.files || !ev.currentTarget.files[0]) {
      return;
    }
    const file = ev.currentTarget.files[0];
    const reader = new FileReader();
    reader.onloadend = () => this.setState(({ media }) => ({ media: media.concat({ file, imagePreviewUrl: reader.result as string }) }));
    reader.readAsDataURL(file);
  }

  handleTitleChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ title: ev.target.value });
  }

  handleDescriptionChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ description: ev.target.value });
  }

  sendPost = () => {
    if (!this.postIsValid) {
      return;
    }

    const body = new FormData();
    if (this.state.media && this.state.media.length > 0) {
      this.state.media.forEach(media => {
        body.append('media', media.file);
      });
    }
    if (this.state.title) {
      body.append('title', this.state.title);
    }
    if (this.state.description) {
      body.append('description', this.state.description);
    }

    fetch('http://localhost:1337/posts', {
      method: 'POST',
      body
    });
  }

  get postIsValid() {
    return this.state.media.length > 0 && !!this.state.title;
  }
}

export default EditPost;
