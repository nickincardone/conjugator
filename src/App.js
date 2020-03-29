import React from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import './App.css';
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

function App() {
    const palette = {
        palette: {
            primary: {main: '#ffffff', contrastText: '#212121'},
            secondary: {main: '#80CBC4'}
        }
    };
    const themeName = 'White Monte Carlo Little Penguin';
    const theme = createMuiTheme(palette, themeName);

    return (
        <MuiThemeProvider theme={theme}>
            <Container maxWidth="md" className="nji-main">
                <Grid container className="center-grid" direction="column">
                    <Grid item>
                        <Card className="nji-main-card">
                            <CardContent>Hi</CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </MuiThemeProvider>
    );
}

export default App;
