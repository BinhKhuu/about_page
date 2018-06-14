import React from 'react';
import TextField from '@material-ui/core/TextField';

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

var MarkdownIt = require('markdown-it');

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  paper: {
    width: 50,
    height: 50,
  }
});

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
export class MarkupInner extends React.Component {
  createMarkup() {
    var md = new MarkdownIt()
    return {__html: md.render(this.props.value)};
  }
  render() {
    return (   
      <Paper elevation={2}>
        <div dangerouslySetInnerHTML={this.createMarkup()} />
      </Paper>
      );
  }
}

export const Markup = withStyles(styles)(MarkupInner);

