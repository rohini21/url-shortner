import React from 'react';
import ReactDOM from 'react-dom';

var NF =  React.createClass({
	componentDidMount: function() {
		window.location = "http://google.com";
	},
	render() {
		return (
				<div>not found</div>
		)
	}
})

export default NF;