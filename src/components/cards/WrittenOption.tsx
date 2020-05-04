import React, {ChangeEvent, FunctionComponent, RefObject} from 'react';
import TextField from '@material-ui/core/TextField';

export interface writtenOptionProps {
  value: string;
  answer: string;
  submitted: boolean;
  header: string;
  handleChange: (e: ChangeEvent<{}>) => void;
  inputRef: RefObject<any>;
}

const writtenOption : FunctionComponent<writtenOptionProps> = (props) => {
  const className: string =
    props.value && props.value.toLowerCase() === props.answer && props.submitted
      ? "nji-correct" : "nji-incorrect";

  return (
    <div className={className}>
      <TextField
        id="standard-basic"
        label={props.header}
        onChange={props.handleChange}
        value={props.value}
        autoFocus={true}
        autoComplete="off"
        inputRef={props.inputRef}
      />
    </div>
  );
};

export default writtenOption;