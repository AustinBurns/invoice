import React, { useEffect } from 'react';
import { Button, makeStyles, CircularProgress } from '@material-ui/core';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles(theme => ({
  button: {
    color: 'white',
    backgroundColor: green[700],
    '&:hover': {
      backgroundColor: green[800],
    },
  },
  input: {
    display: 'none',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: '#43464B',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export const SaveButton = ({ invoiceSaveSuccess, saveInvoice }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  // If the invoice was saved successfully, don't show the loading icon on the
  // submit button anymore
  useEffect(() => {
    setLoading(false);
  }, [invoiceSaveSuccess]);

  return (
    <div className={classes.wrapper}>
      {/*
        When the button is clicked, show the loading icon on the button and 
        call the saveInvoice function that was passed in by the parent to 
        kick off the API call to save the invoice created
      */}
      <Button
        variant="contained"
        className={classes.button}
        disabled={loading}
        onClick={() => {
          setLoading(true);
          saveInvoice();
        }}
      >
        Save Invoice!
      </Button>
      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
  );
};
