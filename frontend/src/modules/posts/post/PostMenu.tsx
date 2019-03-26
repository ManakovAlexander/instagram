import React, { FunctionComponent, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import PostMenuDeleteDialog from './PostMenuDeleteDialog';

interface IProps {
  onDelete: () => void;
}

const PostMenu: FunctionComponent<IProps> = props => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  const handleMenuClick = (event: React.MouseEvent) => setAnchorEl(event.currentTarget);

  const handleDeleteMenuItemClicked = () => {
    handleClose();
    setShowDeleteDialog(true);
  };

  const handleDeleteDialogResponse = (shouldDelete: boolean) => {
    setShowDeleteDialog(false);
    if (shouldDelete) {
      props.onDelete();
    }
  };

  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton aria-label="More" aria-owns={open ? 'long-menu' : undefined} aria-haspopup="true" onClick={handleMenuClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu id="long-menu" anchorEl={anchorEl as HTMLElement} open={open} onClose={handleClose}>
        <MenuItem onClick={handleDeleteMenuItemClicked}>delete</MenuItem>
      </Menu>
      <PostMenuDeleteDialog open={showDeleteDialog} onClose={handleDeleteDialogResponse} />
    </div>
  );
};

export default PostMenu;
