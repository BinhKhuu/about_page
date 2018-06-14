//Meteor imports
import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

//component imports
import { Pages } from '../api/pages';
import {RawText, Markup } from './TextDisplays.js';
import { LoginDialog } from './LoginDialog.js';

//router imports
import { withRouter } from 'react-router';
import  { Redirect } from 'react-router-dom';

//material-ui imports 
import Button from '@material-ui/core/Button';


//MarkdownIt library can change to other but you need to replace the converter call
class ContentInner extends React.Component {

	/* @state.value, value for Markup Component*/
  constructor(props) {
    super(props);
		this.state = {
			value: null,
		};
		this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  //update Page collection when submit is called
  handleSubmit = (event) => {
  	event.preventDefault();
  	const { page } = this.props;
  	const { value } = this.state;
  	Meteor.call('page.update', page._id, value, (error, result) => {
  		this.setState({ value: null });
  	});
  }

	/*
		handle key press for Markup component
		as text is input it changes on screen
	*/
  handleKeyPress(event) {

    var text = event.target.value;
    var pos = event.target.selectionEnd;

    this.setState({
    	value: text,
    });
  }

  /* static props types */
	static propTypes = {
		page: PropTypes.object.isRequired,
		loading: PropTypes.bool.isRequired,
	}

	static defaultProps = {
		loading: false,
	}

	renderLoading() {

		return (
			<p className='col-md-8 aboutTitle'>Loading</p>
		);
	}

	renderBack() {
		//return login dialog
		return (
			<p>Please login</p>
		);
	}

	renderNotFound() {

		return (
			<p>Not Found</p>
		);
	}

	render() {

		const { page, loading, user } = this.props;
		const { value } = this.state;

		//loading state
		if (loading) {
			return this.renderLoading();
		}
		//404 error state
		if (!page) {
		}
		//prevent non admins from accessing /:pageId/edit 
		if (!user) {
			return <Redirect to={`/${this.props.page._id}`} />
		}
		//if value is not null there is page data
		//submit disabled until new data is added to page data
		const useValue = value != null ? value : page.value;
		const isLoggedIn = this.props.user;

		return(
			<div className='col-md-8 aboutTitle'>
				<div>
					<h1>{page.title}</h1>
					<h4><u>Editor</u></h4>
					<RawText handleKeyPress={this.handleKeyPress} value={useValue}/>
					<Button
						disabled={value == null}
						onClick={this.handleSubmit}
						>
						Submit
					</Button>
					<br />
					<h4><u>Preview</u></h4>
					<Markup value={useValue}/>
				</div>
			</div>
		);
	}
}

export const EditPage = withTracker(({ match }) => {

	const DEFAULT_PAGE = { 
		title: 'test',
		value: '',
	};

	const id = match.params.pageId;
	const handle = Meteor.subscribe('page', id);
	//props
	return {
		page: Pages.findOne(id) || DEFAULT_PAGE,
		loading: !handle.ready(),
		user: Meteor.user(),
	};

})(ContentInner);

