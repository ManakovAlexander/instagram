import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { IPost } from 'src/models/post';

interface IProps { }

interface IState {
  file: File | null;
  imagePreviewUrl: string | null;
  title: string | undefined;
  description: string | undefined;
  post: IPost | null;
}

class AddPost extends React.Component<IProps, IState> {
  readonly state: IState = {
    file: null,
    imagePreviewUrl: null,
    title: '',
    description: '',
    post: null
  };
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <form style={{ display: 'flex', flexDirection: 'column', margin: 8 }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="file-button"
            type="file"
            onChange={this.handleFileChange}
          />
          <label htmlFor="file-button">
            <Button variant="outlined" component="span">
              Upload
              </Button>
          </label>
          {this.state.imagePreviewUrl && <img src={this.state.imagePreviewUrl} width="300" />}
          <TextField
            id="title"
            label="Title"
            value={this.state.title}
            onChange={this.handleTitleChange}
            required={true}
            style={{ margin: 8 }}
          />
          <TextField
            id="description"
            label="Description"
            value={this.state.description}
            onChange={this.handleDescriptionChange}
            multiline={true}
            style={{ margin: 8 }}
          />
          <Button
            variant="outlined"
            color="primary"
            disabled={!this.postIsValid}
            onClick={this.sendPost}
            style={{ margin: 8 }}>
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
    this.setState({ file });
    reader.onloadend = () => this.setState({ imagePreviewUrl: reader.result as string });
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
    if (this.state.file) {
      body.append('file', this.state.file);
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
    })
      .then(resp => {
        const isSuccess = resp.ok;
        return isSuccess ? resp.json() : resp.text();
      })
      .then(post => {
        if (post) {
          this.setState({ post });
        }
      });
  }

  get postIsValid() {
    return !!this.state.file && !!this.state.title;
  }
}

export default AddPost;
