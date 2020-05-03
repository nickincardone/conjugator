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
import verbTypes from '../../data/verbTypes';
import verbTypeNicknames from '../../data/verbTypeNicknames';
import Grid from '@material-ui/core/Grid';
import './OptionPage.scss';

function CustomFormLabel(props) {
  return (
    <FormControlLabel label={props.label} control={
      <Checkbox
        name={props.name}
        checked={props.checked}
        onChange={props.onChange}
        disabled={props.disabled}/>
    }/>
  )
}

class OptionPage extends React.Component {

  prettyVerb = (verbNickname) => {
    let strCopy = verbNickname.replace(/\./g, ' ').toLowerCase().split(' ');
    for (let i = 0; i < strCopy.length; i++) {
      strCopy[i] = strCopy[i].charAt(0).toUpperCase() + strCopy[i].substring(1);
    }
    return strCopy.join(' ');
  };

  createFormGroups = () => {
    const conjugationEnabled = this.props.settings.questionType1 || this.props.settings.questionType2;
    const checkBoxes = verbTypes.map((verbType, index) => {
      return (
        <CustomFormLabel name={verbType}
                         key={index}
                         disabled={!conjugationEnabled}
                         checked={conjugationEnabled && this.props.settings.verbTypes.indexOf(verbType) !== -1}
                         onChange={this.props.updateVerbTypes}
                         label={this.prettyVerb(verbTypeNicknames[verbType])}/>
      )
    });

    const half_length = Math.ceil(verbTypes.length / 2);
    const firstCheckBoxes = checkBoxes.splice(0, half_length);

    return (
      <Grid container>
        <Grid item xs={12} sm={6}><FormGroup>{firstCheckBoxes}</FormGroup></Grid>
        <Grid item xs={12} sm={6}><FormGroup>{checkBoxes}</FormGroup></Grid>
      </Grid>
    )
  };

  disableStart() {
    if (!(this.props.settings.questionType1 || this.props.settings.questionType2 ||
      this.props.settings.questionType3 || this.props.settings.questionType4 || this.props.settings.questionType5)) return true;
    if (this.props.settings.verbTypes.length !== 0) return false;
    if (this.props.settings.questionType3 || this.props.settings.questionType4
      || this.props.settings.questionType5) return false;
    return true;
  }

  render = () => {
    const conjugationEnabled = this.props.settings.questionType1 || this.props.settings.questionType2;
    let disableStart = this.disableStart();
    return (
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        minHeight={360}
        color={'common.black'}
        textAlign={'center'}
        className="nji-option-page"
      >
        <FormControl component="fieldset" className="nji-option-top">
          <FormLabel component="legend">Question Types</FormLabel>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <FormGroup column>
                <CustomFormLabel name="questionType3"
                                 checked={this.props.settings.questionType3}
                                 onChange={this.props.settingsChanged}
                                 label="Definition (Multiple Choice)"/>
                <Hidden mdDown>
                  <CustomFormLabel name="questionType4"
                                   checked={this.props.settings.questionType4}
                                   onChange={this.props.settingsChanged}
                                   label="Definition (Written)"/>
                </Hidden>
                <CustomFormLabel name="questionType5"
                                 checked={this.props.settings.questionType5}
                                 onChange={this.props.settingsChanged}
                                 disabled
                                 label="Por vs Para"/>
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup column>
                <CustomFormLabel name="questionType1"
                                 checked={this.props.settings.questionType1}
                                 onChange={this.props.settingsChanged}
                                 label="Conjugations (Multiple Choice)"/>
                <Hidden mdDown>
                  <CustomFormLabel name="questionType2"
                                   checked={this.props.settings.questionType2}
                                   onChange={this.props.settingsChanged}
                                   label="Conjugations (Written)"/>
                </Hidden>
              </FormGroup>
            </Grid>
          </Grid>
          <FormLabel component="legend">Verb Tenses</FormLabel>
          {this.createFormGroups()}
          <FormLabel component="legend">Other</FormLabel>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <FormGroup column>
                <CustomFormLabel name="vosotros"
                                 disabled={!conjugationEnabled}
                                 checked={conjugationEnabled && this.props.settings.vosotros}
                                 onChange={this.props.settingsChanged} label="Use Vosotros"/>
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup column>
                <CustomFormLabel name="irregular"
                                 disabled={!conjugationEnabled}
                                 checked={conjugationEnabled && this.props.settings.irregular}
                                 onChange={this.props.settingsChanged} label="Irregular Only"/>
              </FormGroup>
            </Grid>
          </Grid>
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
          <Button variant="contained" color="primary" disabled={disableStart} onClick={() => {
            this.props.start(true)
          }}>
            start
          </Button>
        </Hidden>
        <Hidden smDown>
          <Button variant="contained" color="primary" disabled={disableStart} onClick={() => {
            this.props.start(false)
          }}>
            start
          </Button>
        </Hidden>
      </Box>
    )
  }
}

export default OptionPage;
