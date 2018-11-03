import * as React from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const style = {
  bottomNavigation: {
    position: 'sticky' as 'sticky',
    bottom: -1,
  },
};

interface IPage {
  id: number;
  label: string;
  icon: any;
  path: string;
  isInitial: boolean;
}

interface IProps {
  pages: IPage[];
  activePageId: number | null;
}

class Footer extends React.PureComponent<IProps> {
  render() {
    const { pages, activePageId } = this.props;
    return (
      <BottomNavigation
        value={activePageId}
        showLabels={true}
        style={style.bottomNavigation}
      >
        {
          pages.map(page => (
            <BottomNavigationAction
              component={Link}
              { ...{ "to": page.path } }
              label={page.label}
              icon={<page.icon />}
              key={page.id}
              value={page.id} />
          ))
        }
      </BottomNavigation>
    );
  }
}

export default Footer;
