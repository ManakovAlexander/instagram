import * as React from 'react';
import Post from '../components/Post';
import { IPost } from 'src/models/post';

interface IProps { }

interface IState {
  file: File | null;
  imagePreviewUrl: string | null;
  title: string | null;
  description: string | null;
  post: IPost | null;
}

class AddPost extends React.Component<IProps, IState> {
  readonly state: IState = {
    file: null,
    imagePreviewUrl: null,
    title: null,
    description: null,
    post: null
  };
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          Add photo
          <form>
            <input type="file" onChange={this.handleFileChange} />
            { this.state.imagePreviewUrl && <img src={this.state.imagePreviewUrl} width="300" /> }
            <input type="text" onChange={this.handleTitleChange} placeholder="title" required={true} />
            <input type="text" onChange={this.handleDescriptionChange} placeholder="description" />
          </form>
          <button disabled={!this.postIsValid} onClick={this.sendPost}>Save</button>
        </div>
        {
          this.state.post && <Post post={this.state.post} />
        }
      </div>
    );
  }

  handleFileChange = (ev: React.FormEvent<HTMLInputElement>) => {
    if (!ev.currentTarget.files|| !ev.currentTarget.files[0]) {
      return;
    }
    const file = ev.currentTarget.files[0];
    const reader = new FileReader();
    this.setState({ file });
    reader.onloadend = () => this.setState({ imagePreviewUrl: reader.result as string });
    reader.readAsDataURL(file);
  }

  handleTitleChange = (ev: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ title: ev.currentTarget.value });
  }

  handleDescriptionChange = (ev: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ description: ev.currentTarget.value });
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
