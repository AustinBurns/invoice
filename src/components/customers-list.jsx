import React, { useReducer, useEffect } from 'react';
import { List, ListItem, Button, ListItemText, makeStyles, CircularProgress } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import { getCustomers, customersReducer } from '../utils';
import { SearchField } from '../components';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  selectedCustomer: {
    fontWeight: 'bolder',
  },
  loading: {
    color: '#43464B',
  },
}));
const initialCustomers = { all: [], filtered: [], current: [], page: 1, limit: 5, query: '' };

export const CustomersList = ({ selectedCustomer, dispatch }) => {
  const classes = useStyles();
  const [customers, customersDispatch] = useReducer(customersReducer, initialCustomers);
  const selectedCustomerText = selectedCustomer ? `${selectedCustomer.firstname} ${selectedCustomer.lastname}` : `None`;
  // Async function to go fetch customers and set the customers on the state via an action once the async call comes back
  const setUpCustomers = async () =>
    customersDispatch({ type: 'SET_CUSTOMERS', payload: { customers: (await getCustomers()).data.data } });

  useEffect(() => {
    setUpCustomers();
  }, []);

  return !customers.all.length && !customers.filtered.length ? (
    <CircularProgress className={classes.loading} />
  ) : (
    <div className={classes.root}>
      <List component="nav" aria-label="Line Item List">
        <ListItem>
          <SearchField
            label="Search for customer: "
            filterType="customers"
            query={customers.query}
            dispatch={customersDispatch}
          />
        </ListItem>
        <ListItem>
          <span>Currently Selected Customer:</span>
          <span style={{ paddingLeft: '0.5rem', fontWeight: 'bold' }}>{selectedCustomerText}</span>
        </ListItem>
        {!customers.filtered.length ? (
          <ListItem>
            <span>No customers match that search! Please search again.</span>
          </ListItem>
        ) : customers.current.map((customer, index) => {
          return (
            <ListItem
              selected={selectedCustomer && customer.id === selectedCustomer.id}
              button
              key={index}
              onClick={() => dispatch({ type: 'SELECT_CUSTOMER', payload: { customer } })}
            >
              <ListItemText primary={`${customer.firstname} ${customer.lastname}`} />
            </ListItem>
          );
        })}
      </List>
      {/* 
        Very simple pagination to be able to paginate the customers in order to make the list more managable 
      */}
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        disabled={customers.page - 1 < 1}
        onClick={() => customersDispatch({ type: 'CHANGE_CUSTOMERS', payload: { page: customers.page - 1 } })}
      >
        Prev <KeyboardArrowLeft />
      </Button>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        disabled={customers.page * customers.limit >= customers.filtered.length}
        onClick={() => customersDispatch({ type: 'CHANGE_CUSTOMERS', payload: { page: customers.page + 1 } })}
      >
        <KeyboardArrowRight /> Next
      </Button>
    </div>
  );
};
