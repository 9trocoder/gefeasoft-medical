import React from 'react';
import firebase from '../../firebase';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';

function CopyRight() {
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
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});


class Login extends React.Component {
    state = {
        email: "",
        password: "",
        errors: [],
        loading: false
      };
    
      displayErrors = errors =>
        errors.map((error, i) => <p key={i}>{error.message}</p>);
    
      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
    
      handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
          this.setState({ errors: [], loading: true });
          firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(signedInUser => {
              console.log(signedInUser);
            })
            .catch(err => {
              console.error(err);
              this.setState({
                errors: this.state.errors.concat(err),
                loading: false
              });
            });
        }
      };
    
      isFormValid = ({ email, password }) => email && password;
    
      handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName))
          ? "error"
          : "";
      };
    
    render() {
        const { email, password, errors, loading } = this.state;
        const { classes } = this.props;
    return (

        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                        <Typography component="h1" variant="h4">
                            Gefeasoft-Medical
                        </Typography>
                    <form onSubmit={this.handleSubmit} className={classes.form} noValidate>                    
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            onChange={this.handleChange}
                            value={email}
                            className={this.handleInputError(errors, "email")}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField 
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            onChange={this.handleChange}
                            value={password}
                            className={this.handleInputError(errors, "password")}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel 
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        {errors.length > 0 && (
                            <Box mt={5}>
                                <Typography variant="body2" color="textSecondary" align="Center">
                                    {this.displayErrors(errors)}
                                </Typography>
                            </Box>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={loading}
                        >
                            Login
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/register" variant="body2">
                                {"Don't have an account? Sign up"}
                                </Link>
                            </Grid>
                            </Grid>
                            <Box mt={5}>
                                <CopyRight />
                            </Box>
                    </form>
                </div>
            </Grid>
            
        </Grid>
    )
    }
}

export default withStyles(useStyles)(Login);