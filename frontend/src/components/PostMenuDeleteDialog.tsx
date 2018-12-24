import * as React from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core';

interface IProps {
  open: boolean;
  onClose: (shouldDelete: boolean) => void;
}

export class PostMenuDeleteDialog extends React.PureComponent<IProps> {
  handleCancel = () => {
    this.props.onClose(false);
  }

  handleDelete = () => {
    this.props.onClose(true);
  }

  render() {
    const { onClose, ...other } = this.props;
    return (
      <Dialog {...other}>
        <DialogTitle>Delete post</DialogTitle>
        <p>Are you sure you want to delete this post?</p>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
