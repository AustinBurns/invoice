import React, { useReducer, useState } from 'react';

import { invoiceReducer } from '../utils';

const AppContext = React.createContext();

export const initialInvoice = { lineItems: [], tax: 0.07, subtotal: 0, total: 0.0, customer: null, memo: '' };

// Function that will check if the context exists before trying to use it so that
// an error can be thrown if the context is trying to be called outside of the
// provider
function useAppContext() {
  const context = React.useContext(AppContext);

  if (!context) {
    throw new Error('Must use useAppContext within AppProvider');
  }

  return context;
}

function AppProvider(props) {
  const [invoice, invoiceDispatch] = useReducer(invoiceReducer, initialInvoice);
  const [open, setGrowlOpen] = useState(false);

  const context = { invoice, invoiceDispatch, open, setGrowlOpen };

  return <AppContext.Provider value={context} {...props} />;
}

export { AppProvider, useAppContext };
