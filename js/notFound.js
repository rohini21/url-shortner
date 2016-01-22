import React from 'react';
import ReactDOM from 'react-dom';

var NF =  React.createClass({
	componentDidMount: function() {
		$.ajax({
	    url: 'http://localhost:9001/',
	    complete : function(res){
	      console.log("res---------",res)
	    },
	    success: function(xml){
	    }
		});
		window.location = "http://google.com";
	},
	render() {
		return (
				<div>not found</div>
		)
	}
})

export default NF;