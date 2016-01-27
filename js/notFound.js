import React from 'react';
import rest from 'rest';
var mime 			= require('rest/interceptor/mime');
var errorCode = require('rest/interceptor/errorCode');


var client 		= rest.wrap(mime, {
	mime: 'application/json'
})

class NF extends React.Component {
	componentWillMount() {
		var loc = window.location
		var str = loc.hash.substring(2,loc.hash.indexOf('?'))
		console.log("loc----",str)
		rest('http://localhost:9001/getUrl/?code='+str)
		.then(function(data){
			console.log("data-----",data);
			window.location = data.entity
		})

		/*var postObj = {
			method  : "POST",
			path    :"http://localhost:9001/getUrl/",
			entity  : {},
			params  : {
				code    : str
			},
			dataType: 'jsonp',
			headers : {
				"crossDomain": true,
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "X-Requested-With"
			}
		}

		//rest('http://localhost:9001/test/')
		client(postObj)
		.then(function(data){
			console.log("data in then-----",data);
		})*/
	}

	render() {
		return (
				<div className="wait">Waiting...</div>
		)
	}
}

export default NF;