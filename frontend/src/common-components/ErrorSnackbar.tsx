import React, { FunctionComponent, useMemo } from 'react';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import styles from './ErrorSnackbar.module.css';

interface IProps {
  message: string | null;
  open: boolean;
  showCloseButton?: boolean;
  handleCloseButtonClick?: () => void;
}

const anchorOrigin: SnackbarOrigin = { vertical: 'bottom', horizontal: 'left' };

const DateFormatter: FunctionComponent<IProps> = ({ message, open, showCloseButton, handleCloseButtonClick, ...other }) => {
  const action = useMemo(() => {
    return [
      <IconButton key="close" aria-label="Close" color="inherit" onClick={handleCloseButtonClick}>
        <CloseIcon className={styles.icon} />
      </IconButton>
    ];
  }, [showCloseButton, handleCloseButtonClick]);

  return (
    <Snackbar open={open} anchorOrigin={anchorOrigin} className={styles.error_snackbar} {...other}>
      <SnackbarContent className={styles.error} message={message} action={showCloseButton ? action : null} />
    </Snackbar>
  );
};

export default React.memo<IProps>(DateFormatter);
