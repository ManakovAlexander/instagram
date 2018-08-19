import * as React from 'react';
import { IMedia } from '../models/post';

interface IProps {
  media: IMedia;
}

class MediaPreview extends React.Component<IProps> {
  render() {
    const media = this.props.media;
    return (
      <img src={media.imagePreviewUrl} width="300" />
    );
  }
}

export default MediaPreview;
