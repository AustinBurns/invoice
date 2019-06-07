import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
  success: {
    backgroundColor: green[600],
  },
  icon: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
    fontSize: 20,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export const Growl = ({ invoiceSaveSuccess }) => {
  const classes = useStyles();
  const [show, setShow] = useState(false);

  function handleClose(_, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setShow(false);
  }

  // If the invoice has been successfully saved, show the success growl
  useEffect(() => {
    setShow(invoiceSaveSuccess);
  }, [invoiceSaveSuccess]);

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={show}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <SnackbarContent
          className={classes.success}
          aria-describedby="success-message"
          message={
            <span id="success-message" className={classes.message}>
              <CheckCircleIcon className={classes.icon} /> Invoice created successfully!
            </span>
          }
          action={
            <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          }
        />
      </Snackbar>
    </div>
  );
};
