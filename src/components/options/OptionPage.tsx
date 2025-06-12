import * as React from "react";
import { ChangeEvent } from "react";
import { 
  Box, 
  FormLabel, 
  FormGroup, 
  FormControlLabel, 
  Checkbox, 
  useMediaQuery, 
  useTheme,
  FormControl,
  Typography,
  Slider,
  Button,
  Grid
} from "@mui/material";
import verbTypes from "../../data/verbTypes";
import verbTypeNicknames from "../../data/verbTypeNicknames";
import "./OptionPage.scss";
import Settings from "../../structures/Settings";

export interface OptionPageProps {
  settings: Settings;
  settingsChanged: (s: ChangeEvent<HTMLInputElement>) => void;
  updateVerbTypes: (s: ChangeEvent<HTMLInputElement>) => void;
  sliderChange: (e: Event, n: number | number[]) => void;
  start: (b: boolean) => void;
}

interface CustomFormLabelProps {
  name: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const CustomFormLabel: React.FC<CustomFormLabelProps> = (props) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={props.checked}
          onChange={props.onChange}
          name={props.name}
        />
      }
      label={props.label}
    />
  );
};

function OptionPage(props: OptionPageProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const conjugationFormGroup = (
    <FormGroup>
      {verbTypes.map((verbType, index) => (
        <CustomFormLabel
          key={index}
          name={verbType}
          checked={props.settings.verbTypes.includes(verbType)}
          onChange={props.updateVerbTypes}
          label={verbTypeNicknames[verbType]}
        />
      ))}
    </FormGroup>
  );

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      minHeight={360}
      color={"common.black"}
      textAlign={"center"}
      className="nji-option-page"
    >
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
                label="Definition (Multiple Choice)"
              />
              {!isMobile && (
                <CustomFormLabel
                  name="definitionW"
                  checked={props.settings.definitionW}
                  onChange={props.settingsChanged}
                  label="Definition (Written)"
                />
              )}
              <CustomFormLabel
                name="poropara"
                checked={props.settings.poropara}
                onChange={props.settingsChanged}
                label="Por vs Para"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormGroup>
              <CustomFormLabel
                name="conjugationMC"
                checked={props.settings.conjugationMC}
                onChange={props.settingsChanged}
                label="Conjugations (Multiple Choice)"
              />
              {!isMobile && (
                <CustomFormLabel
                  name="conjugationW"
                  checked={props.settings.conjugationW}
                  onChange={props.settingsChanged}
                  label="Conjugations (Written)"
                />
              )}
            </FormGroup>
          </Grid>
        </Grid>
        <FormLabel focused component="legend">
          Verb Tenses
        </FormLabel>
        {conjugationFormGroup}
        <FormLabel focused component="legend">
          Number of Questions
        </FormLabel>
        <Slider
          value={props.settings.numberOfQuestions}
          onChange={props.sliderChange}
          min={1}
          max={50}
          valueLabelDisplay="auto"
          marks={[
            { value: 1, label: '1' },
            { value: 25, label: '25' },
            { value: 50, label: '50' }
          ]}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.start(isMobile)}
        >
          Start
        </Button>
      </FormControl>
    </Box>
  );
}

export default OptionPage;
