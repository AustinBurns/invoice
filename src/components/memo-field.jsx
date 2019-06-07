import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';

export const MemoField = ({ memo, dispatch }) => {
  // Keep track of all changes to the value locally, and only update the value
  // of the memo on the invoice when the user has finished typing and left the input
  const [localMemo, setLocalMemo] = useState(memo);
  const updateMemo = () => {
    if (memo !== localMemo) {
      dispatch({ type: 'UPDATE_MEMO', payload: { memo: localMemo } });
    }
  };

  // If the memo that's passed is falsy, turn the local memo state to an empty string
  useEffect(() => {
    if (!memo) {
      setLocalMemo('');
    }
  }, [memo]);

  return (
    <TextField
      id="memo"
      label="Enter Memo"
      multiline
      rowsMax="4"
      value={localMemo}
      onChange={event => setLocalMemo(event.target.value)}
      onBlur={updateMemo}
      margin="normal"
      fullWidth
    />
  );
};
