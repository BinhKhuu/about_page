// react component imports
import React from 'react';

// component imports
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Header } from '../ui/header.js';
import { Sidebar } from '../ui/sidebar.js';
import { Content } from '../ui/content.js';
import { EditPage } from '../ui/editPage.js';

//react router imports
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//all routes will have a template with header and sidebar
export const renderRoutes = () => (
	<Router>
		{/*each route page will have the template header and sidebar*/}
		<div className='container-fluid'>
			{/*header component*/}
			<Header />
			<div className='row'>
				{/*componet for the middle page*/}
				<Switch>
					<Route path="/new" component={Content}/>
					<Route path="/:pageId/edit" component={EditPage}/>
					<Route path="/:pageId" component={Content}/>
					<Route render={() => <p>404</p>}/>
				</Switch>
				{/*side bar component*/}
				<Sidebar />
			</div>
		</div>
	</Router>
)