# Fattmerchant Invoice

Invoice application that interacts with Fattmerchant's API. Application was created
for an interview technical assessment.

## Getting Started

1. Run `npm install` (or `yarn install`) to install all dependencies needed for the project.

2. Once everything has been installed, run `npm start` (or `yarn start`) to spin up
   a local development server that will serve the application locally.

3. You can also interact with the site via [Netlify](https://elated-noether-d1ec73.netlify.com/)
   as an alternative.

### Installing

Run `npm install` (or `yarn install`) to install all dependencies needed for the project.

## Functionality

### Customers

- Can search for customers via the search input
- `Clear Search` button clears out any current search
- `Prev` and `Next` buttons allow for very simple customer page navigation
- When a customer is chosen, their name is show as the `Currently Selected Customer`
  and they are also highlighted in the list
- In order to always have a customer for an invoice, a customer must be chosen
  before in order to proceed with creating an invoice

### Items

- Can search for items via the search input
- `Clear Search` button clears out any current search
- When an item is chosen, it automatically gets added to the `Invoice` section that
  is created below (the invoice section only shows up if at least one item has
  been added to the invoice)
- If an item has already been added to an invoice, choosing that item again
  will then add to the quantity of the line item that was created in the invoice
  for the chosen item instead of adding a new line item. There is no limit to how many times
  a line item can be added to the invoice

### Invoice

- Quantity can be changed to any number except for 0
- When the quanity for a line item is changed, all of the totals immediately update
- A line item can also be removed from the invoice with the trash can button

### Memo

- A memo can optionally be added to the invoice by typing text in the memo text
  area

### Save Button

- When the save button is clicked, it is disabled and a loading icon is shown
  while the API call is being made to save the invoice
- Once the save is successful:
  - The save button is re-enabled and the loading icon
    goes away
  - A success growl is shown to the user to indicate their invoice
    was saved successfully
  - The invoice form state is returned to it's initial state to allow for a
    new invoice to be created

## Built With

- [React](https://reactjs.org/) - The frontend framework used
- [React Material UI](https://material-ui.com/) - Component library used for styling

## Authors

- **Austin Burns** - _Initial work_ - [Austin Burns](https://github.com/AustinBurns)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
