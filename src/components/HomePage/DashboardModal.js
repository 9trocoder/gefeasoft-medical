import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  link: {
    margin: theme.spacing(1, 1.5),
    textDecoration: 'none',
  },
}));

export default function DashboardModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Button href="#" color="primary" variant="outlined" className={classes.link} onClick={handleOpen}>
            Dashboard
        </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h3 id="transition-modal-title">Please select your dashboard according to your role.</h3>
            <Button href="#" color="primary" variant="outlined" className={classes.link}>
                <Link to="/patient">Patient</Link>
            </Button>
            <Button href="#" color="primary" variant="outlined" className={classes.link} onClick={handleOpen}>
                Doctor
            </Button>
            <Button href="#" color="primary" variant="outlined" className={classes.link} onClick={handleOpen}>
                Care-giver
            </Button>
            <Button href="#" color="primary" variant="outlined" className={classes.link} onClick={handleOpen}>
                Admin
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
