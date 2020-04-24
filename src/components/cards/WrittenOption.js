import React from 'react';
import TextField from '@material-ui/core/TextField';

const writtenOption = (props) => {

  const className = props.value && props.value.toLowerCase() === props.answer && props.submitted
    ? 'nji-correct' : 'nji-incorrect';

  return (
    <div className={className}>
      <TextField id="standard-basic"
                 label={props.header}
                 onChange={props.handleChange} value={props.value}
                 autoFocus={true} autoComplete='off' inputRef={props.inputRef}
      />
    </div>
  )

};

export default writtenOption;