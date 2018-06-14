//react imports
import React from 'react';
import PropTypes from 'prop-types';
//meteor imports
import { Meteor } from 'meteor/meteor';
//react router imports
import { Link } from 'react-router-dom';
//material ui imports
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import blue from '@material-ui/core/colors/blue';

//styles for classes prop
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    palette: {
    	primary: blue,
    },
    background: theme.palette.background.paper,
    border: 'solid 1px ' + theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 5,
  },
});

// Collapsable list items in a category
class CategoryItems extends React.Component {

	/*
	 * state@open, toggler for each category
	 */
	constructor(props) {
		super(props)
		this.state = {
			open: true,
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		this.setState({ open: !this.state.open });
	}

	render() {
		return(
			<div>
				<ListItem button onClick={this.handleClick}>
					{this.props.category}
				</ListItem>
				{/* Each Category is a collapsable button */}
				<Collapse 
					in={this.state.open} 
					timeout="auto" 
					unmountOnExit
					>
					{/* Each Item in the list of Categories Links to its own page  */}
          <List component="div" disablePadding>
						{
							this.props.pages.map((page, i) =>
								<ListItem 
									key={i} 
									className={this.props.classes.nested}
									button
								>
									<Link to={`/${page._id}`}>{page.title}</Link>
								</ListItem>
							)
						}
        	</List>
        </Collapse>
			
			</div>
		);
	}
}

class Sidebar extends React.Component {

	/*
   * state@pages, page object: { title:string, category:string, createdAt:date, value: string }
	 */
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
		const { classes } = this.props;
		return (	
			<div key={category}>	
				<List 			
					className={classes.root}
					component="nav"
					subheader={<ListSubheader component="div"></ListSubheader>}
				>
					<CategoryItems 
						category={category}
						pages={pages}
						classes={classes}
					/>
				</List>
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

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

//adds class prop into sidebar
export default withStyles(styles)(Sidebar);
