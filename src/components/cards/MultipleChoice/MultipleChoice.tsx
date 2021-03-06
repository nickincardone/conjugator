import React, {FunctionComponent} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

interface multipleChoiceProps {
  answer: string;
  choices: string[];
  header: string;
  isSubmitted: boolean;
  click: (s: string) => void;
}

const multipleChoice: FunctionComponent<multipleChoiceProps> = (props) => {
  function getClass(choice: string): string {
    return props.answer === choice ?
      'nji-ripple nji-correct' : 'nji-ripple nji-incorrect';
  }

  return (
    <React.Fragment>
      <Typography variant="subtitle1">{props.header}</Typography>
      <Grid container spacing={1} className="nji-card-mc">
        {props.choices.map((choice, index) => {
          return (
            <Grid item xs={6} key={index} className={getClass(choice)}>
              <Card onClick={() => {if (!props.isSubmitted) props.click(choice)}}>
                <CardContent>{choice}</CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </React.Fragment>
  )
};

export default multipleChoice;