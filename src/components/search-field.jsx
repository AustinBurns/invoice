import React from 'react';
import { TextField, Button } from '@material-ui/core';

const styles = {
  searchContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    width: '100%',
    gridColumnGap: '3%',
  },
  fieldContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '.5rem',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
};

export const SearchField = ({ label, filterType, query, dispatch }) => {
  return (
    <div style={styles.searchContainer}>
      <div style={styles.fieldContainer}>
        <TextField
          id="search"
          label={label}
          value={query}
          onChange={event =>
            dispatch({ type: `FILTER_${filterType.toUpperCase()}`, payload: { query: event.target.value } })
          }
        />
      </div>
      <div style={styles.buttonContainer}>
        <Button variant="contained" onClick={() => dispatch({ type: 'CLEAR_FILTER' })}>
          Clear Search
        </Button>
      </div>
    </div>
  );
};
