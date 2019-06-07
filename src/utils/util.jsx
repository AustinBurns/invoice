export const calculateSubtotal = items =>
  items.reduce((subtotal, item) => (subtotal = item.quantity ? subtotal + item.price * +item.quantity : subtotal), 0);

export const updateTotals = (items, tax) => {
  const subtotal = calculateSubtotal(items);

  return { subtotal, total: +(tax * subtotal).toFixed(2) + subtotal };
};
