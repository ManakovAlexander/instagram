import React, { FunctionComponent } from 'react';
import dateformat from 'dateformat';

interface IProps {
  format: string;
  children: string;
}

const DateFormatter: FunctionComponent<IProps> = ({ format, children }) => {
  const formattedDate = dateformat(children, format);
  return <>{formattedDate}</>;
};

DateFormatter.defaultProps = {
  format: 'default'
};

export default React.memo<IProps>(DateFormatter);
