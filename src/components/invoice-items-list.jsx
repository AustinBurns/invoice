import React from 'react';
import {
  Table,
  Paper,
  TextField,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    width: '70%',
  },
}));
// Only show two decimal places when displaying money
const moneyFormat = num => `$${num.toFixed(2)}`;

export const InvoiceItemsList = ({ lineItems, subtotal, tax, total, dispatch }) => {
  const classes = useStyles();

  return (
    <>
      <h2>Invoice:</h2>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lineItems.map(lineItem => (
              <TableRow key={lineItem.item}>
                <TableCell>{lineItem.item}</TableCell>
                <TableCell align="right">
                  <TextField
                    id="item-quantity"
                    className={classes.textField}
                    value={lineItem.quantity}
                    onChange={event =>
                      dispatch({
                        type: 'MODIFY_QUANTITY',
                        payload: { id: lineItem.id, quantity: event.target.value },
                      })
                    }
                    type="number"
                    inputProps={{ 'aria-label': 'Quantity' }}
                  />
                  <IconButton
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: { id: lineItem.id } })}
                    className={classes.button}
                    aria-label="Delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">{moneyFormat(lineItem.price)}</TableCell>
                <TableCell align="right">{moneyFormat(lineItem.price * lineItem.quantity)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{moneyFormat(subtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">{`${(tax * 100).toFixed(0)} %`}</TableCell>
              <TableCell align="right">{moneyFormat(tax * subtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{moneyFormat(total)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};
