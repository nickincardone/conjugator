import * as React from "react";
import { ChangeEvent } from "react";
import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Hidden } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import verbTypes from "../../data/verbTypes";
import verbTypeNicknames from "../../data/verbTypeNicknames";
import Grid from "@material-ui/core/Grid";
import "./OptionPage.scss";
import { Settings } from "../../types";

export interface OptionPageProps {
  settings: Settings;
  settingsChanged: (s: ChangeEvent<HTMLInputElement>) => void;
  updateVerbTypes: (s: ChangeEvent<HTMLInputElement>) => void;
  sliderChange: (e: ChangeEvent<{}>) => void;
  numberOfQuestions: number;
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
          disabled={props.disabled} />
      } />
  );
}

class OptionPage extends React.Component<OptionPageProps, {}> {
  prettyVerb(verbNickname: string): string {
    const strCopy: string[] = verbNickname
      .replace(/\./g, " ")
      .toLowerCase()
      .split(" ");
    for (let i: number = 0; i < strCopy.length; i++) {
      strCopy[i] = strCopy[i].charAt(0).toUpperCase() + strCopy[i].substring(1);
    }
    return strCopy.join(" ");
  }

  createFormGroups(): JSX.Element {
    const conjugationEnabled: boolean =
      this.props.settings.questionType1 || this.props.settings.questionType2;

    // @ts-ignore
    const checkBoxes: JSX.Element[] = verbTypes.map((verbType: keyof typeof verbTypeNicknames, index: number) => {
        return (
          <CustomFormLabel
            name={verbType}
            key={index}
            disabled={!conjugationEnabled}
            checked={
              conjugationEnabled &&
              this.props.settings.verbTypes.indexOf(verbType) !== -1
            }
            onChange={this.props.updateVerbTypes}
            label={this.prettyVerb(verbTypeNicknames[verbType])} />
        );
      }
    );

    const half_length: number = Math.ceil(verbTypes.length / 2);
    const firstCheckBoxes: JSX.Element[] = checkBoxes.splice(0, half_length);

    return (
      <Grid container>
        <Grid item xs={12} sm={6}>
          <FormGroup>{firstCheckBoxes}</FormGroup>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormGroup>{checkBoxes}</FormGroup>
        </Grid>
      </Grid>
    );
  }

  disableStart(): boolean {
    if (
      !(
        this.props.settings.questionType1 ||
        this.props.settings.questionType2 ||
        this.props.settings.questionType3 ||
        this.props.settings.questionType4 ||
        this.props.settings.questionType5
      )
    )
      return true;
    if (this.props.settings.verbTypes.length !== 0) return false;
    return !(
      this.props.settings.questionType3 ||
      this.props.settings.questionType4 ||
      this.props.settings.questionType5
    );
  }

  render() {
    const conjugationEnabled: boolean =
      this.props.settings.questionType1 || this.props.settings.questionType2;
    const disableStart: boolean = this.disableStart();

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
                  name="questionType3"
                  checked={this.props.settings.questionType3}
                  onChange={this.props.settingsChanged}
                  label="Definition (Multiple Choice)"/>
                <Hidden mdDown>
                  <CustomFormLabel
                    name="questionType4"
                    checked={this.props.settings.questionType4}
                    onChange={this.props.settingsChanged}
                    label="Definition (Written)"/>
                </Hidden>
                <CustomFormLabel
                  name="questionType5"
                  checked={this.props.settings.questionType5}
                  onChange={this.props.settingsChanged}
                  label="Por vs Para"/>
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <CustomFormLabel
                  name="questionType1"
                  checked={this.props.settings.questionType1}
                  onChange={this.props.settingsChanged}
                  label="Conjugations (Multiple Choice)" />
                <Hidden mdDown>
                  <CustomFormLabel
                    name="questionType2"
                    checked={this.props.settings.questionType2}
                    onChange={this.props.settingsChanged}
                    label="Conjugations (Written)" />
                </Hidden>
              </FormGroup>
            </Grid>
          </Grid>
          <FormLabel focused component="legend">
            Verb Tenses
          </FormLabel>
          {this.createFormGroups()}
          <FormLabel focused component="legend">
            Other
          </FormLabel>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <CustomFormLabel
                  name="vosotros"
                  disabled={!conjugationEnabled}
                  checked={conjugationEnabled && this.props.settings.vosotros}
                  onChange={this.props.settingsChanged}
                  label="Use Vosotros"/>
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <CustomFormLabel
                  name="irregular"
                  disabled={!conjugationEnabled}
                  checked={conjugationEnabled && this.props.settings.irregular}
                  onChange={this.props.settingsChanged}
                  label="Irregular Only"/>
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
          style={{ maxWidth: "200px" }}
          onChange={this.props.sliderChange}/>
        <Hidden mdUp>
          <Button
            variant="contained"
            color="primary"
            disabled={disableStart}
            onClick={() => {
              this.props.start(true);
            }}>
            start
          </Button>
        </Hidden>
        <Hidden smDown>
          <Button
            variant="contained"
            color="primary"
            disabled={disableStart}
            onClick={() => {
              this.props.start(false);
            }}>
            start
          </Button>
        </Hidden>
      </Box>
    );
  }
}

export default OptionPage;
