import React, { FunctionComponent } from "react";
import { Typography, Card, CardContent, Grid } from "@mui/material";

interface MultipleChoiceProps {
  answer: string;
  choices: string[];
  header: string;
  isSubmitted: boolean;
  click: (s: string) => void;
}

const MultipleChoice: FunctionComponent<MultipleChoiceProps> = (props) => {
  function getClass(choice: string): string {
    return props.answer === choice
      ? "nji-ripple nji-correct"
      : "nji-ripple nji-incorrect";
  }

  return (
    <>
      <Typography variant="subtitle1">{props.header}</Typography>
      <Grid container spacing={1} className="nji-card-mc" width="100%">
        {props.choices.map((choice, index) => (
          <Grid size={6} key={index} className={getClass(choice)}>
            <Card
              onClick={() => {
                if (!props.isSubmitted) props.click(choice);
              }}
              sx={{
                cursor: props.isSubmitted ? "default" : "pointer",
                "&:hover": {
                  backgroundColor: props.isSubmitted
                    ? "inherit"
                    : "action.hover",
                },
              }}
            >
              <CardContent sx={{ fontSize: "1.1rem" }}>
                {choice && choice.length > 0
                  ? choice.charAt(0).toUpperCase() + choice.slice(1)
                  : choice}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MultipleChoice;
