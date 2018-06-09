import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/routes/routes.js'

if(Meteor.isClient) {
	Meteor.startup(function(){
		render(renderRoutes(), document.getElementById("app"))
	})
}