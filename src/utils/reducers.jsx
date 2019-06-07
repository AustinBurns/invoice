import { updateTotals } from './util';

export const invoiceReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_ITEM': {
      let items = state.lineItems;
      // Check to see if we have already added the item to the invoice, and if so,
      // return the index of that item to update the quantity for that item instead
      // of adding that item to the invoice again
      const itemIndex = items.findIndex(item => item.id === payload.item.id);

      if (itemIndex !== -1) {
        // If the item is in the invoice already, update the quantity instead of
        // adding it again
        items = [...items];
        items[itemIndex].quantity++;
      } else {
        // Otherwise add the new item tot he invoice
        items = items.concat({ ...payload.item, quantity: 1 });
      }

      return { ...state, lineItems: items, ...updateTotals(items, state.tax) };
    }
    case 'REMOVE_ITEM': {
      const items = state.lineItems.filter(item => item.id !== payload.id);

      return { ...state, lineItems: items, ...updateTotals(items, state.tax) };
    }
    case 'MODIFY_QUANTITY': {
      // If the quantity is anything less than 1, don't allow the quantity to be
      // updated
      if (payload.quantity && payload.quantity < 1) {
        return state;
      }

      const items = state.lineItems.map(item =>
        item.id === payload.id ? { ...item, quantity: payload.quantity } : item
      );

      // Allow the user to temporarily remove the quantity so that they can enter
      // a completely new quantity but do not update the total yet since the quantity
      // is technically "invalid"
      if (!payload.quantity) {
        return { ...state, lineItems: items };
      }

      return { ...state, lineItems: items, ...updateTotals(items, state.tax) };
    }
    case 'UPDATE_MEMO':
      return { ...state, memo: payload.memo };
    case 'SELECT_CUSTOMER':
      return { ...state, customer: payload.customer };
    case 'RESET_INVOICE':
      return { ...payload };
    default:
      return state;
  }
};

export const itemsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_ITEMS':
      return { ...state, all: payload.items, filtered: payload.items };
    case 'FILTER_ITEMS':
      // VERY simple item filtering by searching the item name only
      return {
        ...state,
        filtered: state.all.filter(item => item.item.toLowerCase().startsWith(payload.query)),
        query: payload.query,
      };
    case 'CLEAR_FILTER':
      return { ...state, filtered: state.all, query: '' };
    default:
      return state;
  }
};

export const customersReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_CUSTOMERS': {
      // Subtract 1 from the page number since we are starting our page numbers
      // at 1 (to make pagination buttons easier to handle) instead of 0
      const offset = (state.page - 1) * state.limit;

      return {
        ...state,
        all: payload.customers,
        filtered: payload.customers,
        current: payload.customers.slice(offset, offset + state.limit),
      };
    }
    case 'CHANGE_CUSTOMERS': {
      // Subtract 1 from the page number since we are starting our page numbers
      // at 1 (to make pagination buttons easier to handle) instead of 0
      const offset = (payload.page - 1) * state.limit;

      return { ...state, current: state.filtered.slice(offset, offset + state.limit), page: payload.page };
    }
    case 'FILTER_CUSTOMERS': {
      // VERY simple customer filtering by searching the customer first name only
      const filtered = state.all.filter(customer => customer.firstname.toLowerCase().startsWith(payload.query));

      return { ...state, filtered, current: filtered.slice(0, state.limit), page: 1, query: payload.query };
    }
    case 'CLEAR_FILTER':
      return { ...state, filtered: state.all, current: state.all.slice(0, state.limit), page: 1, query: '' };
    default:
      return state;
  }
};
