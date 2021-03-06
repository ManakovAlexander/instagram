import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import { IPage } from '../models/index';

interface IProps {
  pages: IPage[];
  activePageId: number | null;
}

const Footer: FunctionComponent<IProps> = ({ pages, activePageId }) => {
  return (
    <BottomNavigation value={activePageId} showLabels={true}>
      {pages.map(page => (
        <BottomNavigationAction component={Link as any} {...{ to: page.path }} label={page.label} icon={<page.icon />} key={page.id} value={page.id} />
      ))}
    </BottomNavigation>
  );
};

export default React.memo<IProps>(Footer);
