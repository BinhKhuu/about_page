import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';

export class LoginDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false }, ()=> {
      alert('closed')
    });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Open form dialog</Button>
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
              id="name"
              label="Username"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Password"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Log in
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
