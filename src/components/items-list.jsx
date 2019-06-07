import React, { useReducer, useEffect } from 'react';
import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core';

import { getItems, itemsReducer } from '../utils';
import { SearchField } from '../components';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  infoText: {},
}));
const initialItems = { all: [], filtered: [], query: '' };

export const ItemsList = ({ dispatch }) => {
  const classes = useStyles();
  const [items, itemsDispatch] = useReducer(itemsReducer, initialItems);
  const setUpItems = async () => itemsDispatch({ type: 'SET_ITEMS', payload: { items: (await getItems()).data.data } });

  useEffect(() => {
    setUpItems();
  }, []);

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="Line Item List">
        <ListItem>
          <SearchField label="Search for line item: " filterType="items" query={items.query} dispatch={itemsDispatch} />
        </ListItem>
        <ListItem className={classes.infoText}>
          <div style={{ width: '100%', fontStyle: 'italic', textAlign: 'center', fontSize: '14px' }}>
            Choosing an item multiple times will increase the quanity for that item.
          </div>
        </ListItem>
        {items.filtered.map((item, index) => {
          return (
            <ListItem button key={index} onClick={() => dispatch({ type: 'ADD_ITEM', payload: { item } })}>
              <ListItemText primary={item.item} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
