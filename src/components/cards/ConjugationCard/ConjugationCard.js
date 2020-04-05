import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { Hidden } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

class ConjugationCard extends React.Component {

  render() {
    return (
      <React.Fragment>
        <div className="nji-main-top">
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            minHeight={360}
            color={'common.black'}
            textAlign={'center'}
          >
            <Typography
              variant="h1">{this.props.question.verb}</Typography>
            <Typography
              variant="h4">{this.props.question.definition}</Typography>
            <div className="nji-main-chips">
              <Chip className={this.props.question.type1} label={this.props.question.type1}/>
              <Hidden xsUp={this.props.question.type2 === undefined}>
                <Chip className={this.props.question.type2} label={this.props.question.type2}/>
              </Hidden>
              <Hidden xsUp={this.props.question.type3 === undefined}>
                <Chip className={this.props.question.type3} label={this.props.question.type3}/>
              </Hidden>
            </div>
          </Box>
        </div>
        <div className="nji-main-bottom">
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            color={'common.black'}
            textAlign={'center'}
          >
            <Typography variant="h1">
              <TextField id="standard-basic"
                         label={this.props.question.person}
                         onChange={this.props.handleChange} value={this.props.value}
                         autoFocus={true} autoComplete='off'/>
            </Typography>
          </Box>
        </div>
      </React.Fragment>
    )
  }
}

export default ConjugationCard;

