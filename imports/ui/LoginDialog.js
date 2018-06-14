//react | meteor imports
import { Meteor } from 'meteor/meteor';
import React from 'react';

//material-ui imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//react router imports
import { withRouter } from 'react-router';


export class LoginDialogInner extends React.Component {

  state = {
    open: this.props.open,
    name: '',
    password: '',
    errorText: '',
  };


  handleClickOpen = () => {
    //if user had already logged in
    if(Meteor.user()) {
      this.props.history.push(`/${this.props.page._id}/edit`);
    }
    //if user is not logged in open login dialog
    else {
     this.setState({ open: true }); 
    }  
  };

  handleClose = () => {
    this.setState({ open: false });
  }

  handleSubmit = () => {
    const { name, password } = this.state;
    this.setState({ errorText: '' });
    Meteor.loginWithPassword(name, password, (err) => {
      //if login errored display error
      if (err) {
        this.setState({ errorText: err.reason, name: '', password: '' });
      } else { //if login was successfull
        this.setState({ open: false, password: '', name: '', });
        this.props.history.push(`/${this.props.page._id}/edit`);
      }
    });
  }

  handleChangeUsername = (event) => {
    this.setState({ name: event.target.value });
  }

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <div>

        <Button onClick={this.handleClickOpen}>Edit</Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Log in</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To register an account please contact the administrator
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Username"
              type="text"
              onChange={this.handleChangeUsername}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              onChange={this.handleChangePassword}
              fullWidth
            />
            <DialogContentText>
              {this.state.errorText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Log in
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    );
  }
}

/*
  Router wrapper.
*/
export const LoginDialog = withRouter(LoginDialogInner);
