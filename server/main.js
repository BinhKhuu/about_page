import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Pages } from '../imports/api/pages';

Meteor.startup(() => {

	// Init database.
	// dummy data
	if (Pages.find().count() === 0) {

		const DUMMY_TEXT = 'Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\n'+
	      'by a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**,'+
	      ' \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1.'+
	      ' apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Herman Fassett](https://freecodecamp.com/hermanfassett)*';

		const INITIAL_PAGES = [
			{ title:'first', category:'Test1', createdAt:'1/1/2018', value: DUMMY_TEXT },
			{ title:'second', category:'Test2', createdAt:'2/2/2018', value: DUMMY_TEXT },
			{ title:'third', category:'Test3', createdAt:'3/3/2018', value: DUMMY_TEXT },
			{ title:'fourth', category:'Test2', createdAt:'2/2/2018', value: DUMMY_TEXT },
		];

		INITIAL_PAGES.forEach(page => Pages.insert(page));
	}

});

Meteor.publish('page', function (id) {

	check(id, String);

	const query = { _id: id };
	const options = { limit: 1 };

	return Pages.find(query, options);

});

Meteor.methods({

	'pages.get'(id) {

		return Pages.findOne(id);

	},

	'pages.list'() {

		const query = {};

		const options = {
			fields: {
				title: 1,
				category: 1,
			},
			limit: 1000,
		};

		return Pages.find(query, options).fetch();

	},

	'page.update'(id, value) {

		check(id, String);
		check(value, String);

		// UNSAFE - CHECK VALUES.

		const query = { _id: id };
		const modifier = { $set: { value } };

		return Pages.update(query, modifier);

	},

	'page.getData' () {

		return '';

	}

});
