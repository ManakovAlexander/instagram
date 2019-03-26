import React, { FunctionComponent } from 'react';
import { IMedia } from '../models/media';

interface IProps {
  media: IMedia;
}

const style = {
  maxWidth: '100%'
};

const MediaPreview: FunctionComponent<IProps> = ({ media }) => <img src={media.imagePreviewUrl} style={style} />;

export default React.memo<IProps>(MediaPreview);
