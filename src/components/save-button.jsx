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

  useEffect(() => {
    setLoading(false);
  }, [invoiceSaveSuccess]);

  return (
    <div className={classes.wrapper}>
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
