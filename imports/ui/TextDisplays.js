import React from 'react';
var MarkdownIt = require('markdown-it');

export class RawText extends React.Component {
  render() {
    return (
      <textarea 
      	onChange={this.props.handleKeyPress} 
      	id='markdown-box' 
      	rows='22'
        col='100' 
      	type='text' 
      	className='form-control' 
      	value={this.props.value} >
    	</textarea>
      );
  }
}

/*Markup text*/
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