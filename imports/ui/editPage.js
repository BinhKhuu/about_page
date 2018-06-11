import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Pages } from '../api/pages';
import {RawText, Markup } from './TextDisplays.js';

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

	//TBD
	renderLoading() {

	}

	render() {
		const { page, loading } = this.props;
		const { value } = this.state;
		if (loading) {
			// Loading.
		}
		if (!page) {
			// not found.
		}
		//if value is not null there is page data
		//with page data set submit button to disabled
		const useValue = value != null ? value : page.value;
		return(
			<div className='col-md-8 aboutTitle'>
				<Link to={`/${page._id}/edit`}>Edit</Link>
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
	const id = match.params.pageId;
	const handle = Meteor.subscribe('page', id);
	const defaultPage = { title: 'test', value: '' };
	return {
		page: Pages.findOne(id) || defaultPage,
		loading: !handle.ready(),
	};
})(ContentInner);

