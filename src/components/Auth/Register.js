import React from 'react';
import firebase from '../../firebase';
import md5 from 'md5';
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
import Image from '../../image/sign.jpg';
import {Link} from "react-router-dom";

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
        backgroundImage: `url(${Image})`,
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


class Register extends React.Component {

    state = {
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
        errors: [],
        loading: false,
        usersRef: firebase.database().ref("users")
    };

    isFormValid = () => {
        let errors = [];
        let error;

        if(this.isFormEmpty(this.state)) {
            error = { message: "Fill in all fields" };
            this.setState({ errors: errors.concat(errors) });
            return false;
        } else if (!this.isPasswordValid(this.state)) {
            error = { message: "Password is invalid" };
            this.setState({ errors: errors.concat(error) });
            return false;
        } else {
            return true;
        }
    };

    isFormEmpty = ({ username, email, password, repeatPassword }) => {
        return (
            !username.length || !email.length || !password.length || !repeatPassword.length
        );
    };

    isPasswordValid = ({ password, repeatPassword }) => {
        if(password.length < 6 || repeatPassword.length < 6) {
            return false;
        } else if (password !== repeatPassword) {
            return false;
        } else {
            return true;
        }
    };

    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);
    
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        if(this.isFormValid()) {
            this.setState({ errors: [], loading: true });
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(createdUser => {
                    createdUser.user
                        .updateProfile({
                            displayName: this.state.username,
                            photoURL: `http://gravatar.com/avatar/${md5(
                                createdUser.user.email
                            )}?d=identicon`
                        })
                        .then(() => {
                            this.saveUser(createdUser).then(() => {
                                console.log("user saved");
                            });
                        })
                        .catch(err => {
                            console.error(err);
                            this.setState({
                                errors: this.state.errors.concat(err),
                                loading: false
                            });
                        });
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

    saveUser = createdUser => {
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        });
    };

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName)) ? "error" : "";
    };

    render() {
        const { username, email, password, repeatPassword, errors, loading } = this.state;
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
                        <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                onChange={this.handleChange}
                                value={username}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                onChange={this.handleChange}
                                value={email}
                                className={this.handleInputError(errors, "email")}
                                name="email"
                                autoComplete="email"
                            />
                            <TextField 
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={this.handleChange}
                                value={password}
                                autoComplete="current-password"
                                className={this.handleInputError(errors, "password")}
                            />
                            <TextField 
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="repeatPassword"
                                label="Repeat Password"
                                onChange={this.handleChange}
                                value={repeatPassword}
                                type="password"
                                id="Repeat-password"
                                className={this.handleInputError(errors, "password")}
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
                                disabled={loading}
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                            
                                <Grid item>
                                    <Link to="/login" variant="body2">
                                    {"Already have account? Login"}
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

export default withStyles(useStyles)(Register);