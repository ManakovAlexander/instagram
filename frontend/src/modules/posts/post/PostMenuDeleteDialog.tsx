import React, { FunctionComponent } from 'react';
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, DialogContentText } from '@material-ui/core';

interface IProps {
  open: boolean;
  onClose: (shouldDelete: boolean) => void;
}

const PostMenuDeleteDialog: FunctionComponent<IProps> = props => {
  const { onClose, ...other } = props;
  const handleCancel = () => onClose(false);
  const handleDelete = () => onClose(true);
  return (
    <Dialog {...other}>
      <DialogTitle>Delete post</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this post?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostMenuDeleteDialog;
