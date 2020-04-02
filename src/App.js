import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './App.scss';
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import verbs from './data/conjugationVerbs';
import verbTypes from './data/verbTypes';
import { Hidden } from '@material-ui/core';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      currentQuestion: 0
    };
    this.createQuestions();
  }

  resolve(path, obj) {
    var properties = Array.isArray(path) ? path : path.split('.')
    return properties.reduce((prev, curr) => prev && prev[curr], obj)
  }

  createQuestions = () => {
    const numberOfQuestions = 5;
    const questionArray = [];
    const pronouns = ['yo', 'tu', 'el', 'nosotros', 'vosotros', 'ellos'];
    for (let i = 0; i < numberOfQuestions; i++) {
      const currentVerb = verbs[Math.floor(Math.random() * verbs.length)];
      const currentVerbType = verbTypes[Math.floor(Math.random() * verbTypes.length)];
      const currentPronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
      const verbTypeList = currentVerbType.split('.');
      const currentVerbObject = {
        "verb": currentVerb.verb,
        "definition": currentVerb.verb,
        "person": currentPronoun,
        "type1": verbTypeList[0],
        "type2": verbTypeList.length === 2 ? verbTypeList[1] : null,
        "answer": this.resolve(currentVerbType + '.' + currentPronoun, currentVerb.conjugations)
      };
      questionArray.push(currentVerbObject)
    }
    this.questions = questionArray;
  };

  palette = {
    palette: {
      primary: { main: '#ffffff', contrastText: '#212121' },
      secondary: { main: '#80CBC4' }
    }
  };
  themeName = 'White Monte Carlo Little Penguin';
  theme = createMuiTheme(this.palette, this.themeName);

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.currentQuestion + 1 === this.questions.length) {
      return;
    }
    this.setState((oldState, props) => ({
      currentQuestion: oldState.currentQuestion + 1,
      value: ""
    }));

  };

  render() {
    return (
      <MuiThemeProvider theme={this.theme}>
        <Container maxWidth="md" className="nji-main">
          <Grid container className="center-grid" direction="column">
            <Grid item>
              <Card className="nji-main-card">
                <CardContent>
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
                        variant="h1">{this.questions[this.state.currentQuestion].verb}</Typography>
                      <Typography
                        variant="h4">{this.questions[this.state.currentQuestion].definition}</Typography>
                      <div className="nji-main-chips">
                        <Chip label={this.questions[this.state.currentQuestion].type1}/>
                        <Hidden xsUp={this.questions[this.state.currentQuestion].type2 === null}>
                          <Chip label={this.questions[this.state.currentQuestion].type2} />
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
                        <form onSubmit={this.handleSubmit}>
                          <TextField id="standard-basic"
                                     label={this.questions[this.state.currentQuestion].person}
                                     onChange={this.handleChange} value={this.state.value}
                                     autoFocus={true} autoComplete='off'/>
                          {/*<div contentEditable="true">{this.state.value}</div>*/}
                        </form>
                      </Typography>
                    </Box>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </MuiThemeProvider>
    );
  }
}

export default App;
