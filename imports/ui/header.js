//React | Meteor imports
import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

import { LoginDialog } from './LoginDialog.js';

//material ui imports
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
//react router
import  { Redirect } from 'react-router-dom';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  paper: {
    width: 50,
    height: 50,
  }
});

class Header extends React.Component {

 constructor(props){
  super(props);

  this.state = {
    isLoggedIn: Meteor.userId(),
  }
 }


	handleLogOut = () => {
		if(Meteor.userId()){
			Meteor.logout((error) =>{
    		if (error) {
      		console.log(error.reason);
    		}else{
      		this.setState({isLoggedIn: !this.state.isLoggedIn,});
      		console.log("Logout successful");
     		}
 			});
		}
		else {
			//else load LoginDialog.js
			
		}
		
	}

	render() {
		const { classes } = this.props;
		return(
			<div className='row header'>
				

				<h1 className='offset-sm-1 col-sm-8'>Abouts Page</h1>
        {Meteor.user() &&

          <Button 
            onClick={this.handleLogOut}
            variant="contained" className={classes.button, classes.paper}>
          {Meteor.user().username}
        </Button>
        }
			</div>
		);
	}
}


Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);