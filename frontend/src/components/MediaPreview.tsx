import * as React from 'react';
import { IMedia } from '../models/media';

interface IProps {
  media: IMedia;
}

const style = {
  maxWidth: '100%'
};

class MediaPreview extends React.Component<IProps> {
  render() {
    const media = this.props.media;
    return <img src={media.imagePreviewUrl} style={style} />;
  }
}

export default MediaPreview;
