import React, { FunctionComponent } from 'react';
import { format as formatFns } from 'date-fns';

interface IProps {
  format: string;
  children: string;
}

const DateFormatter: FunctionComponent<IProps> = ({ format, children }) => {
  const formattedDate = formatFns(children, format);
  return <>{formattedDate}</>;
};

export default React.memo<IProps>(DateFormatter);
