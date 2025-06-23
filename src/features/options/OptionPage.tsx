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
  Slider,
  Button,
  Grid,
} from "@mui/material";
import verbTypes from "data/verbTypes";
import verbTypeNicknames from "data/verbTypeNicknames";
import Settings from "structures/Settings";
import { VerbType } from "types/types";

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
  disabled?: boolean;
}

interface VerbTypeColumnProps {
  verbTypes: VerbType[];
  settings: Settings;
  updateVerbTypes: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomFormLabel: React.FC<CustomFormLabelProps> = (props) => {
  return (
    <FormControlLabel
      sx={{ mb: -1 }}
      control={
        <Checkbox
          checked={props.checked}
          onChange={props.onChange}
          name={props.name}
          disabled={props.disabled}
        />
      }
      label={props.label}
    />
  );
};

const VerbTypeColumn: React.FC<VerbTypeColumnProps> = ({
  verbTypes,
  settings,
  updateVerbTypes,
}) => {
  const conjugationEnabled = settings.conjugationMC || settings.conjugationW;

  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <FormGroup>
        {verbTypes.map((verbType, index) => (
          <CustomFormLabel
            key={index}
            name={verbType}
            disabled={!conjugationEnabled}
            checked={settings.verbTypes.includes(verbType)}
            onChange={updateVerbTypes}
            label={verbTypeNicknames[verbType]}
          />
        ))}
      </FormGroup>
    </Grid>
  );
};

function OptionPage(props: OptionPageProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const conjugationEnabled =
    props.settings.conjugationMC || props.settings.conjugationW;

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

  const conjugationFormGroup = (
    <Grid container>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormGroup>
          {verbTypes
            .slice(0, Math.ceil(verbTypes.length / 2))
            .map((verbType, index) => (
              <CustomFormLabel
                key={index}
                name={verbType}
                disabled={!conjugationEnabled}
                checked={props.settings.verbTypes.includes(verbType)}
                onChange={props.updateVerbTypes}
                label={verbTypeNicknames[verbType]}
              />
            ))}
        </FormGroup>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormGroup>
          {verbTypes
            .slice(Math.ceil(verbTypes.length / 2))
            .map((verbType, index) => (
              <CustomFormLabel
                key={index}
                name={verbType}
                disabled={!conjugationEnabled}
                checked={props.settings.verbTypes.includes(verbType)}
                onChange={props.updateVerbTypes}
                label={verbTypeNicknames[verbType]}
              />
            ))}
        </FormGroup>
      </Grid>
    </Grid>
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
    >
      <FormControl
        component="fieldset"
        sx={{
          mt: 6.25,
          minWidth: { xs: "auto", sm: 540 },
        }}
      >
        <Box sx={{ mb: 2 }}>
          <FormLabel focused component="legend">
            Question Types
          </FormLabel>
          <Grid container>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormGroup sx={{ "& .MuiFormControlLabel-root": { mb: -1 } }}>
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
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormGroup sx={{ "& .MuiFormControlLabel-root": { mb: -1 } }}>
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
        </Box>

        <Box sx={{ mb: 2 }}>
          <FormLabel focused component="legend">
            Verb Tenses
          </FormLabel>
          {conjugationFormGroup}
        </Box>

        <Box sx={{ mb: 2 }}>
          <FormLabel focused component="legend">
            Other
          </FormLabel>
          <Grid container>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormGroup>
                <CustomFormLabel
                  name="vosotros"
                  disabled={!conjugationEnabled}
                  checked={conjugationEnabled && props.settings.vosotros}
                  onChange={props.settingsChanged}
                  label="Use Vosotros"
                />
              </FormGroup>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormGroup>
                <CustomFormLabel
                  name="irregular"
                  disabled={!conjugationEnabled}
                  checked={conjugationEnabled && props.settings.irregular}
                  onChange={props.settingsChanged}
                  label="Irregular Only"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 2 }}>
          <FormLabel focused component="legend">
            Number of Questions
          </FormLabel>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Slider
              value={props.settings.numberOfQuestions}
              onChange={props.sliderChange}
              min={5}
              max={50}
              valueLabelDisplay="auto"
              sx={{
                width: "200px",
                "& .MuiSlider-valueLabel": {
                  backgroundColor: "primary.main",
                  "&:before": {
                    borderBottomColor: "primary.main",
                  },
                },
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.start(isMobile)}
            size="small"
            disabled={disableStart()}
            sx={{ width: "fit-content" }}
          >
            Start
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
}

export default OptionPage;
