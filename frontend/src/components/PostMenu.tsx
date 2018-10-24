import * as React from "react";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

interface IProps {
  onDelete: () => void;
}

class State {
  anchorEl: Element | null = null;
}

export class PostMenu extends React.PureComponent<IProps, State> {
  state = new State();

  handleClick = (event: React.MouseEvent) => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleDelete = () => {
    this.props.onDelete();
    this.handleClose();
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
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl as HTMLElement}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleDelete}>delete</MenuItem>
        </Menu>
      </div>
    );
  }
}
