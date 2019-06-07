// In order to compute the subtotal of the invoice, a reduce is used to accumulate
// a subtotal from all the item totals in the invoice. To get each item's total, the
// item's price is multipled by the quanity of that item in the invoice
export const calculateSubtotal = items =>
  items.reduce((subtotal, item) => (subtotal = item.quantity ? subtotal + item.price * +item.quantity : subtotal), 0);

// Once a subtotal has been calculated, calculate how much tax needs to be added
// to the subtotal to find the final total of the invoice. To calculate how much
// tax needs to be added, mutliply the tax by the subtotal (only take the number
// to two decimal places for money)
export const updateTotals = (items, tax) => {
  const subtotal = calculateSubtotal(items);

  return { subtotal, total: +(tax * subtotal).toFixed(2) + subtotal };
};
