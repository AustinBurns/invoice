import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export const SaveButton = ({ saveInvoice }) => {
  const classes = useStyles();

  return (
    <Button variant="contained" color="primary" className={classes.button} onClick={() => saveInvoice()}>
      Save Invoice!
    </Button>
  );
};
