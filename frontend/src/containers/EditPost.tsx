import * as React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { IMedia } from '../models/media';
import { IStore } from 'src/reducers';
import MediaPreview from '../components/MediaPreview';
import { createPost } from '../actions/edit-post';
import { State as StoreState } from '../reducers/edit-post';
import { readFile } from 'src/infrastructure/file';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    padding: 8
  },
  imageInput: {
    display: 'none'
  },
  titleField: {
    margin: 8
  },
  descriptionField: {
    margin: 8
  },
  saveButton: {
    margin: 8
  }
};

interface IProps extends IMapDispatchToProps, IMapStateToProps {}

class State {
  readonly title: string = '';
  readonly description: string = '';
  readonly media: IMedia[] = [];
}

class EditPost extends React.Component<IProps, State> {
  readonly state = new State();

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
          {this.state.media &&
            this.state.media.map((media, index) => (
              <MediaPreview key={index} media={media} />
            ))}
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
            style={styles.saveButton}
          >
            Save
          </Button>
        </form>
      </div>
    );
  }

  handleFileChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const mediaFile = await readFile(ev);
    if (mediaFile) {
      this.setState(({ media }) => ({
        media: media.concat(mediaFile)
      }));
    }
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

    const postFormData = new FormData();
    if (this.state.media && this.state.media.length > 0) {
      this.state.media.forEach(media => {
        postFormData.append('media', media.file);
      });
    }
    if (this.state.title) {
      postFormData.append('title', this.state.title);
    }
    if (this.state.description) {
      postFormData.append('description', this.state.description);
    }

    this.props.onCreatePosts(postFormData);
  }

  get postIsValid() {
    return this.state.media.length > 0 && !!this.state.title;
  }

  get saveIsDisabled() {
    return (
      !this.postIsValid ||
      this.props.saveInProgress ||
      this.props.fetchInProgress
    );
  }
}

type IMapStateToProps = StoreState;

const mapStateToProps = (store: IStore): IMapStateToProps => store.editPost;

interface IMapDispatchToProps {
  onCreatePosts: (postFormData: FormData) => void;
}

const mapDispatchToProps = (
  dispatch: (action: any) => void
): IMapDispatchToProps => {
  return {
    onCreatePosts: (postFormData: FormData) =>
      dispatch(createPost(postFormData))
  };
};

const EditPostContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPost);

export default EditPostContainer;
