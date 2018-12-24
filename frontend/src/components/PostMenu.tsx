import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { PostMenuDeleteDialog } from './PostMenuDeleteDialog';

interface IProps {
  onDelete: () => void;
}

class State {
  anchorEl: Element | null = null;
  showDeleteDialog = false;
}

export class PostMenu extends React.PureComponent<IProps, State> {
  state = new State();

  handleMenuClick = (event: React.MouseEvent) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleDeleteMenuItemClicked = () => {
    this.handleClose();
    this.setState({ showDeleteDialog: true });
  }

  handleDeleteDialogResponse = (shouldDelete: boolean) => {
    this.setState({ showDeleteDialog: false });
    if (shouldDelete) {
      this.props.onDelete();
    }
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  }

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenuClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl as HTMLElement}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleDeleteMenuItemClicked}>delete</MenuItem>
        </Menu>
        <PostMenuDeleteDialog open={this.state.showDeleteDialog} onClose={this.handleDeleteDialogResponse} />
      </div>
    );
  }
}
