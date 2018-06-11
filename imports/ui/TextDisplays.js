import React from 'react';
import TextField from '@material-ui/core/TextField';
var MarkdownIt = require('markdown-it');

export class RawText extends React.Component {
  render() {
    return (
      <TextField multiline
      	onChange={this.props.handleKeyPress} 
      	id='markdown-box' 
      	rows='30'
        col='100' 
      	type='text' 
      	className='form-control' 
      	value={this.props.value} >
    	</TextField>
      );
  }
}

/*Markup text*/
/* to do set limit on characters per new line*/
export class Markup extends React.Component {
  createMarkup() {
    var md = new MarkdownIt()
    return {__html: md.render(this.props.value)};
  }
  render() {
    return (   
      <div dangerouslySetInnerHTML={this.createMarkup()} />
      );
  }
}