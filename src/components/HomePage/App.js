import React from 'react';
import firebase from '../../firebase';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import './App.css';
import MainFeaturedPost from './MainFeaturedPost';
import { Link } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="Center">
            {'Copyright © '}
            {"Gefeasoft-Medical "}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
  );
}

const useStyles = theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },

  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    textDecoration: 'none',
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },

  paper: {
    margin: theme.spacing(3, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    padding: '20px',
  },

  image: 'https://source.unsplash.com/random',

  

  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },

});

const footers = [
  {
    title: 'Gefeasoft-Medical',
    description: [''],
  },
];

const mainFeaturedPost = {
  title: 'Gefeasoft-Medical Has Treated Over 11.000.000 Million Patients',
  description:
    "We make trasformation in the world by giving people what they want, advice on how to survive, how to stay healthy. We have offer over millions of heath equipment to people that are in need of emergency treatment.",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
};


// function App() {
//   return (
//     <div className="App">
//       hello there welcome to my app
//     </div>
//   );
// }
 
class App extends React.Component {

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("signed out!"));
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Gefeasoft-Medical
          </Typography>
          
          <Button href="#" color="primary" variant="outlined" className={classes.link}>
            Dashboard
          </Button>
          <Link className={classes.link}>
          <Button href="#" color="primary" variant="outlined" className={classes.link} onClick={this.handleSignout}>
            Sign Out
          </Button>
          </Link>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container maxWidth="lg" component="main" className={classes.heroContent}>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
        </main>
      </Container>
      {/* End hero unit */}
      
      {/* Footer */}
      <Container component="main" className={classes.main} maxWidth="lg">
        <Typography variant="h4" component="h3" >
          Support & News
        </Typography>
        <Paper>
          <Typography variant="p" component="p" gutterBottom className={classes.paper}>
            <h2>27.01.2021</h2>
            {'Many thanks to dear Op. Dr. Naki Bulut for allowing us to his laparoscopic cholecystectomy surgeries which is essential to see while developing our laparoscopic surgery simulators at GEFEASOFT. We will continue with his precious support and with full pace.'}
          </Typography>
          <Typography variant="p" component="p" gutterBottom className={classes.paper}>
            <h2>26.01.2021</h2>
            {'At Gefeasoft-Medical, we create healthcare technologies where we mainly focus on surgical oncological simulation systems, physiotherapy support systems and healthcare support systems.'}
            <p>{'Gefeasoft-Medical is a young company, and having a career with us is about being part of a team working on some of the most creatively rewarding and ambitious projects. Our company main project is being supported by TUBITAK(Turkish Research Council) and we are on the lookout for talented game programmers and physics programmers. This is a full-time permanent position.'}</p>
            {'You would be welcomed to a dedicated and inclusive team where you will find yourself in a never ending learning and collaboration environment.'}
          </Typography>
         
        </Paper>
      </Container>
      <Container maxWidth="md" component="footer" className={classes.footer}>
      <Grid container spacing={4} justify="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link to="/loginPage" variant="subtitle1" color="textSecondary" className={classes.link}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
    </React.Fragment>
    )
  }
}

 
export default withStyles(useStyles)(App);
