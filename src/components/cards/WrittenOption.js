import React from 'react';
import TextField from '@material-ui/core/TextField';

const writtenOption = (props) => {

  function getClass() {
    if (props.value === props.answer && props.submitted) {
      return 'nji-correct';
    }
    return 'nji-incorrect';
  }

  return (
    <div className={getClass()}>
      <TextField id="standard-basic"
                 label={props.header}
                 onChange={props.handleChange} value={props.value}
                 autoFocus={true} autoComplete='off' inputRef={props.inputRef}
      />
    </div>
  )

};

export default writtenOption;