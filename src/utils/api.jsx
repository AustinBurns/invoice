import axios from 'axios';

const headers = { headers: { Authorization: `Bearer ${process.env.REACT_APP_TOKEN}` } };

export const getItems = async () => {
  try {
    return await axios.get(`${process.env.REACT_APP_API_URL}/item`, headers);
  } catch (error) {
    throw error;
  }
};

export const getCustomers = async () => {
  try {
    return await axios.get(`${process.env.REACT_APP_API_URL}/customer`, headers);
  } catch (error) {
    throw error;
  }
};

export const saveInvoice = async ({ tax, subtotal, lineItems, total, memo, customer }) => {
  const url = `${process.env.REACT_APP_API_URL}/invoice`;
  const data = {
    meta: { tax, subtotal, lineItems },
    total,
    url,
    ...(memo ? { memo } : {}), // Only include in the payload if there is a memo
    ...(customer ? { customer_id: customer.id } : {}), // Only include in the payload if there is a customer
  };

  try {
    return await axios.post(url, data, headers);
  } catch (error) {
    throw error;
  }
};
