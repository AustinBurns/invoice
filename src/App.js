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
  const hideComponent = !invoice.lineItems.length;
  const callSaveInvoice = async () => {
    const result = await saveInvoice(invoice);

    if (result) {
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
