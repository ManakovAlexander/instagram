import * as React from 'react';
import * as dateformat from 'dateformat';

interface IProps {
  format: string;
  children: string;
}

function DateFormatter({ format, children }: IProps) {
  const formattedDate = dateformat(children, format);
  return <>{formattedDate}</>;
}

DateFormatter.defaultProps = {
  format: 'default'
};

export default React.memo<IProps>(DateFormatter);
