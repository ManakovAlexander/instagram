import React, { FunctionComponent, useState, useCallback } from 'react';
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

  const handleMenuClick = useCallback((event: React.MouseEvent) => setAnchorEl(event.currentTarget), [setAnchorEl]);

  const handleDeleteDialogResponse = useCallback(
    (shouldDelete: boolean) => {
      setShowDeleteDialog(false);
      if (shouldDelete) {
        props.onDelete();
      }
    },
    [setShowDeleteDialog, props.onDelete]
  );

  const handleClose = useCallback(() => setAnchorEl(null), [setAnchorEl]);

  const handleDeleteMenuItemClicked = useCallback(() => {
    handleClose();
    setShowDeleteDialog(true);
  }, [handleClose, setShowDeleteDialog]);

  const isOpen = Boolean(anchorEl);

  return (
    <div>
      <IconButton aria-label="More" aria-owns={isOpen ? 'long-menu' : undefined} aria-haspopup="true" onClick={handleMenuClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu id="long-menu" anchorEl={anchorEl as HTMLElement} open={isOpen} onClose={handleClose}>
        <MenuItem onClick={handleDeleteMenuItemClicked}>delete</MenuItem>
      </Menu>
      <PostMenuDeleteDialog open={showDeleteDialog} onClose={handleDeleteDialogResponse} />
    </div>
  );
};

export default PostMenu;
