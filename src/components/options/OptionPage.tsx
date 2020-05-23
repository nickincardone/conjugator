import * as React from "react";
import {ChangeEvent} from "react";
import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {Hidden} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import verbTypes from "../../data/verbTypes";
import verbTypeNicknames from "../../data/verbTypeNicknames";
import Grid from "@material-ui/core/Grid";
import "./OptionPage.scss";
import Settings from "../../structures/Settings";

export interface OptionPageProps {
  settings: Settings;
  settingsChanged: (s: ChangeEvent<HTMLInputElement>) => void;
  updateVerbTypes: (s: ChangeEvent<HTMLInputElement>) => void;
  sliderChange: (e: ChangeEvent<{}>, n: number | number[]) => void;
  start: (b: boolean) => void;
}

export interface CustomFormLabelProps {
  name: string;
  checked: boolean;
  label: string;
  disabled?: boolean;
  onChange: (s: ChangeEvent<HTMLInputElement>) => void;
}

function CustomFormLabel(props: CustomFormLabelProps): JSX.Element {
  return (
    <FormControlLabel
      label={props.label}
      control={
        <Checkbox
          name={props.name}
          checked={props.checked}
          onChange={props.onChange}
          disabled={props.disabled}/>
      }/>
  );
}

function OptionPage(props: OptionPageProps) {
  const prettyVerb = (verbNickname: string) => {
    const strCopy: string[] = verbNickname
      .replace(/\./g, " ")
      .toLowerCase()
      .split(" ");
    for (let i: number = 0; i < strCopy.length; i++) {
      strCopy[i] = strCopy[i].charAt(0).toUpperCase() + strCopy[i].substring(1);
    }
    return strCopy.join(" ");
  };

  const conjugationEnabled: boolean =
    props.settings.conjugationMC || props.settings.conjugationW;

  // @ts-ignore
  const checkBoxes: JSX.Element[] = verbTypes.map((verbType: keyof typeof verbTypeNicknames, index: number) => {
      return (
        <CustomFormLabel
          name={verbType}
          key={index}
          disabled={!conjugationEnabled}
          checked={
            conjugationEnabled &&
            props.settings.verbTypes.indexOf(verbType) !== -1
          }
          onChange={props.updateVerbTypes}
          label={prettyVerb(verbTypeNicknames[verbType])}/>
      );
    }
  );

  const half_length: number = Math.ceil(verbTypes.length / 2);
  const firstCheckBoxes: JSX.Element[] = checkBoxes.splice(0, half_length);

  const conjugationFormGroup = (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <FormGroup>{firstCheckBoxes}</FormGroup>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormGroup>{checkBoxes}</FormGroup>
      </Grid>
    </Grid>
  );

  const disableStart = () => {
    if (
      !(
        props.settings.conjugationMC ||
        props.settings.conjugationW ||
        props.settings.definitionMC ||
        props.settings.definitionW ||
        props.settings.poropara
      )
    )
      return true;
    if (props.settings.verbTypes.length !== 0) return false;
    return !(
      props.settings.definitionMC ||
      props.settings.definitionW ||
      props.settings.poropara
    );
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      minHeight={360}
      color={"common.black"}
      textAlign={"center"}
      className="nji-option-page">
      <FormControl component="fieldset" className="nji-option-top">
        <FormLabel focused component="legend">
          Question Types
        </FormLabel>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <FormGroup>
              <CustomFormLabel
                name="definitionMC"
                checked={props.settings.definitionMC}
                onChange={props.settingsChanged}
                label="Definition (Multiple Choice)"/>
              <Hidden smDown>
                <CustomFormLabel
                  name="definitionW"
                  checked={props.settings.definitionW}
                  onChange={props.settingsChanged}
                  label="Definition (Written)"/>
              </Hidden>
              <CustomFormLabel
                name="poropara"
                checked={props.settings.poropara}
                onChange={props.settingsChanged}
                label="Por vs Para"/>
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormGroup>
              <CustomFormLabel
                name="conjugationMC"
                checked={props.settings.conjugationMC}
                onChange={props.settingsChanged}
                label="Conjugations (Multiple Choice)"/>
              <Hidden smDown>
                <CustomFormLabel
                  name="conjugationW"
                  checked={props.settings.conjugationW}
                  onChange={props.settingsChanged}
                  label="Conjugations (Written)"/>
              </Hidden>
            </FormGroup>
          </Grid>
        </Grid>
        <FormLabel focused component="legend">
          Verb Tenses
        </FormLabel>
        {conjugationFormGroup}
        <FormLabel focused component="legend">
          Other
        </FormLabel>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <FormGroup>
              <CustomFormLabel
                name="vosotros"
                disabled={!conjugationEnabled}
                checked={conjugationEnabled && props.settings.vosotros}
                onChange={props.settingsChanged}
                label="Use Vosotros"/>
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormGroup>
              <CustomFormLabel
                name="irregular"
                disabled={!conjugationEnabled}
                checked={conjugationEnabled && props.settings.irregular}
                onChange={props.settingsChanged}
                label="Irregular Only"/>
            </FormGroup>
          </Grid>
        </Grid>
      </FormControl>
      <Typography id="discrete-slider-custom" gutterBottom>
        Number of Questions
      </Typography>
      <Slider
        defaultValue={props.settings.numberOfQuestions}
        min={5}
        max={100}
        aria-labelledby="discrete-slider-custom"
        step={5}
        valueLabelDisplay="auto"
        style={{maxWidth: "200px"}}
        onChange={props.sliderChange}/>
      <Button
        variant="contained"
        color="primary"
        disabled={disableStart()}
        onClick={() => {
          props.start(props.settings.isMobile);
        }}>
        start
      </Button>
    </Box>
  );
}

export default OptionPage;
