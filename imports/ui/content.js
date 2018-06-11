//react imports
import React from 'react';
//Meteor imports
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
//react router imports
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
//collection imports
import { Pages } from '../api/pages';
//component imports
import {RawText, Markup } from './TextDisplays.js';

class ContentInner extends React.Component {
  constructor(props) {
    super(props);
		this.state = {};
  }
  /* props
	 * @page, page collection 
	 * @loading, TBD
   */
	static propTypes = {
		page: PropTypes.object.isRequired,
		loading: PropTypes.bool.isRequired,
	}

	static defaultProps = {
		loading: false,
	}

	render() {
		const { page, loading } = this.props;
		return(
				<div className='col-md-8 aboutTitle'>
					<div>
						{/*tile and edit on the same line*/}
						<div className='row'>
							<h1 className='col-md-10'>{page.title}</h1>
							<Link to={`/${page._id}/edit`}>Edit</Link>			
						</div>
						<Markup value={page.value}/>
					</div>
				</div>
		);
	}
}

//set up live data feed to collection
export const Content = withTracker(({ match }) => {
	const id = match.params.pageId;
	const handle = Meteor.subscribe('page', id);
	const defaultPage = { title: 'test', value: '' };
	return {
		page: Pages.findOne(id) || defaultPage,
		loading: !handle.ready(),
	};
})(ContentInner);