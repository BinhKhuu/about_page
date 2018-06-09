import { Mongo } from 'meteor/mongo';

/* 
 * page collection holds: 	
 * { _id:string, title:String, category:String, createdAt:Date, value:String }
 * in: server/main.js
 */
export const Pages = new Mongo.Collection('page');
