import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class Sidebar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			pages: [],
		};
	}

	componentDidMount() {
		Meteor.call('pages.list', (error, result) => {
			if (!error) {
				this.setState({ pages: result });
			}
		});

	}

	getGroupedPages = () => {
		const { pages } = this.state;
		const grouped = pages.reduce((map, page) => {
			const key = page.category || 'More';
			//get value (array) from category or if it doesn't exist make empty array
			const arr = map.get(key) || [];
			//push to the into the entry with categoryname
			arr.push(page);
			//set accumulator with (category, list of pages)
			return map.set(key, arr);
		}, new Map());
		return [...grouped.entries()];
	}



	renderCategory = ([category, pages]) => {
		return (
			<div key={category}>
				{category}
				<ul>
				{
					pages.map((page, i) =>
						<li key={i}>
							<Link to={`/${page._id}`}>{page.title}</Link>
						</li>
					)
				}
				</ul>
			</div>
		);
	}

	render() {
		const grouped = this.getGroupedPages();
		return(
			<div className='sideBar col-md-2'> 
				{/*sidebar content*/}
				{ grouped.map(this.renderCategory) }				
			</div>
		);
	}
}

/* Legecy stuff deleted later
class ListTitle extends React.Component {
	render() {
		return (
			<div>
				<h3>{this.props.category}</h3>
				<ListItem 
					title={this.props.title}
				/>
			</div>
		);
	}
}

class ListItem extends React.Component {
	render() {
		return(
			<ul>
				<li>{this.props.title}</li>
			</ul>		
		);
	}
}

*/