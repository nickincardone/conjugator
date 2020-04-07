import React from 'react';
import Box from '@material-ui/core/Box';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Hidden } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';

class OptionPage extends React.Component {
  render = () => {
    return (
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        minHeight={360}
        color={'common.black'}
        textAlign={'center'}
        style={{ 'paddingTop': '50px' }}
      >
        <FormControl component="fieldset"
                     style={{ 'marginTop': '50px', 'marginBottom': '20px' }}>
          <FormLabel component="legend">Question Types</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name="vosotros" checked={this.props.settings.vosotros}
                                 onChange={this.props.settingsChanged}/>}
              label="Use Vosotros"
            />
            <FormControlLabel
              control={<Checkbox name="questionType3" checked={this.props.settings.questionType3}
                                 onChange={this.props.settingsChanged}/>}
              label="Definition (Multiple Choice)"
            />
            <Hidden mdDown>
              <FormControlLabel
                control={<Checkbox name="questionType4"
                                   checked={this.props.settings.questionType4}
                                   onChange={this.props.settingsChanged}/>}
                label="Definition (Written)"
              />
            </Hidden>
            <FormControlLabel
              control={<Checkbox name="questionType1" checked={this.props.settings.questionType1}
                                 onChange={this.props.settingsChanged}/>}
              label="Conjugations (Multiple Choice)"
            />
            <Hidden mdDown>
              <FormControlLabel
                control={<Checkbox name="questionType2"
                                   checked={this.props.settings.questionType2}
                                   onChange={this.props.settingsChanged}/>}
                label="Conjugations (Written)"
              />
            </Hidden>
          </FormGroup>
        </FormControl>
        <Typography id="discrete-slider-custom" gutterBottom>
          Number of Questions
        </Typography>
        <Slider
          defaultValue={this.props.numberOfQuestions}
          min={0}
          max={100}
          aria-labelledby="discrete-slider-custom"
          step={5}
          valueLabelDisplay="auto"
          style={{ "maxWidth": "200px" }}
          onChange={this.props.sliderChange}
        />
        <Hidden mdUp>
          <Button variant="contained" color="primary" onClick={() => {
            this.props.start(true)
          }} style={{ 'marginTop': '50px' }}>
            start
          </Button>
        </Hidden>
        <Hidden smDown>
          <Button variant="contained" color="primary" onClick={() => {
            this.props.start(false)
          }} style={{ 'marginTop': '50px' }}>
            start
          </Button>
        </Hidden>
      </Box>
    )
  }
}

export default OptionPage;
