import { updateTotals } from './util';

export const invoiceReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_ITEM': {
      let items = state.lineItems;

      const itemIndex = items.findIndex(item => item.id === payload.item.id);

      if (itemIndex !== -1) {
        items = [...items];
        items[itemIndex].quantity++;
      } else {
        items = items.concat({ ...payload.item, quantity: 1 });
      }

      return { ...state, lineItems: items, ...updateTotals(items, state.tax) };
    }
    case 'REMOVE_ITEM': {
      const items = state.lineItems.filter(item => item.id !== payload.id);

      return { ...state, lineItems: items, ...updateTotals(items, state.tax) };
    }
    case 'MODIFY_QUANTITY': {
      const items = state.lineItems.map(item =>
        item.id === payload.id ? { ...item, quantity: payload.quantity } : item
      );

      return { ...state, lineItems: items, ...updateTotals(items, state.tax) };
    }
    case 'UPDATE_MEMO':
      return { ...state, memo: payload.memo };
    case 'ADD_CUSTOMER':
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
      // at 1 instead of 0
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
      // at 1 instead of 0
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
