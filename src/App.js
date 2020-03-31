import React from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import './App.scss';
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";

class App extends React.Component {
    palette = {
        palette: {
            primary: {main: '#ffffff', contrastText: '#212121'},
            secondary: {main: '#80CBC4'}
        }
    };
    themeName = 'White Monte Carlo Little Penguin';
    theme = createMuiTheme(this.palette, this.themeName);

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
                                            <Typography variant="h1">ver</Typography>
                                            <Typography variant="h4">to see</Typography>
                                            <div className="nji-main-chips">
                                                <Chip label="Present" />
                                                <Chip label="Indicative" />
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
                                                <TextField id="standard-basic" label="Nosotros" autoFocus={true}/>
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
