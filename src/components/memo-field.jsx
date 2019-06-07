import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';

export const MemoField = ({ memo, dispatch }) => {
  const [localMemo, setLocalMemo] = useState(memo);
  const updateMemo = () => {
    if (memo !== localMemo) {
      dispatch({ type: 'UPDATE_MEMO', payload: { memo: localMemo } });
    }
  };

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
