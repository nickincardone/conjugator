import React, { ChangeEvent, FunctionComponent, RefObject } from 'react';
import { TextField } from '@mui/material';

export interface WrittenOptionProps {
  value: string;
  answer: string;
  submitted: boolean;
  header: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputRef: RefObject<any>;
}

const WrittenOption: FunctionComponent<WrittenOptionProps> = (props) => {
  return (
    <>
      <TextField
        inputRef={props.inputRef}
        fullWidth
        label={props.header}
        value={props.value}
        onChange={props.handleChange}
        disabled={props.submitted}
        variant="standard"
        sx={{
          '& .MuiInput-underline': {
            '&:before': {
              borderBottomColor: props.submitted && props.value.toLowerCase() === props.answer.toLowerCase() 
                ? 'success.main' 
                : props.submitted 
                  ? 'error.main' 
                  : 'inherit'
            }
          }
        }}
      />
    </>
  );
};

export default WrittenOption;