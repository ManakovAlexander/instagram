import * as React from 'react';
import { Redirect } from "react-router-dom";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

interface IPage {
  label: string;
  icon: any;
  path: string;
  isInitial: boolean;
}

interface IProps {
  pages: IPage[];
}

class State {
  pageIdx: number = 0;
}

class Footer extends React.PureComponent<IProps, State> {
  readonly state = new State();
  render() {
    const { pages } = this.props;
    return (
      <>
        {
          this.state.pageIdx != null && pages && <Redirect to={pages[this.state.pageIdx].path} />
        }
        <BottomNavigation
          value={this.state.pageIdx}
          onChange={this.handleChange}
          showLabels={true}
        >
          {
            pages.map((page, i) => <BottomNavigationAction label={page.label} icon={<page.icon />} key={i} />)
          }
        </BottomNavigation>
      </>
    );
  }

  private handleChange = (event: any, pageIdx: number) => this.setState({ pageIdx });
}

export default Footer;
