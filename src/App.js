import React from 'react';
import { Container, Grid, Paper, makeStyles, Divider } from '@material-ui/core';

import { ItemsList, CustomersList, InvoiceItemsList, MemoField, SaveButton, Growl } from './components';
import { useAppContext, initialInvoice } from './providers/app-context';
import { saveInvoice } from './utils';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
    marginBottom: 30,
    maxWidth: 700,
    textAlign: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  divider: {
    marginTop: '1rem',
  },
}));

function App() {
  const { invoice, invoiceDispatch, invoiceSaveSuccess, setInvoiceSaveSuccess } = useAppContext();
  // Hide the invoice, memo, and save button components until an item has been
  // added to the invoice
  const hideComponent = !invoice.lineItems.length;
  // Create an async function to pass down to the save button to be able kick off
  // the save invoice API call when the save button is clicked
  const callSaveInvoice = async () => {
    const saveSuccess = await saveInvoice(invoice);

    // If the invoice was saved successfully (the function call returns true),
    // then reset the invoice state and set the invoice success state to true
    // to stop the loading icon on the save button and show a success growl
    if (saveSuccess) {
      invoiceDispatch({ type: 'RESET_INVOICE', payload: initialInvoice });
      setInvoiceSaveSuccess(true);
    }
  };
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <header className={classes.header}>
              <h1>Fattmerchant Invoice</h1>
            </header>
            <Grid item xs={12}>
              <h2>Choose Customer:</h2>
              <CustomersList selectedCustomer={invoice.customer} dispatch={invoiceDispatch} />
            </Grid>
            <Grid hidden={!invoice.customer} item xs={12} className={classes.itemSearch}>
              <Divider className={classes.divider} />
              <h2>Choose Items:</h2>
              <ItemsList lineItems={invoice.lineItems} dispatch={invoiceDispatch} />
            </Grid>
            <Grid hidden={hideComponent} item xs={12}>
              <Divider className={classes.divider} />
              <InvoiceItemsList
                lineItems={invoice.lineItems}
                subtotal={invoice.subtotal}
                tax={invoice.tax}
                total={invoice.total}
                dispatch={invoiceDispatch}
              />
            </Grid>
            <Grid hidden={hideComponent} item xs={12}>
              <MemoField memo={invoice.memo} dispatch={invoiceDispatch} />
            </Grid>
            <Grid hidden={hideComponent} item xs={12}>
              <SaveButton invoiceSaveSuccess={invoiceSaveSuccess} saveInvoice={callSaveInvoice} />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Growl invoiceSaveSuccess={invoiceSaveSuccess} />
    </Container>
  );
}

export default App;
