import React from 'react';
import rest from 'rest';
var mime 			= require('rest/interceptor/mime');
var errorCode = require('rest/interceptor/errorCode');


var client 		= rest.wrap(mime, {
	mime: 'application/json'
})

class App extends React.Component {
	
	constructor() {
	  super();
	  this.state = {
	  	url: "no shortened url"
	  }
	}

	shortenURL() {
		var self     = this
		var regexObj =  /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
		var url      = this.refs.input.value

		if(!regexObj.test(url)){
			alert("Enter correct URL")
			return
		}

		rest('http://localhost:9001/?url='+url)
		.then(function(data){
			self.setState({
				url: data.entity
			})
		})
	}
	
	test() {
		var self = this;
		var postObj = {
				method  : "POST",
				path    :"http://localhost:9001/test",
				entity  : {
				data    : "xyz"
				},
				params  : {},
				headers : {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Headers": "X-Requested-With",
					"crossDomain": true
				}
		}

		client(postObj)
		.then(function(data){
			console.log("data in then-----",data);
		})
	}
	
	render() {
		var url = this.state.url;
		return (
			<div className="container">
				<div className="col-md-12">	
					<p>Welcome to Snipper</p>
					<p>Snip your url to a smalller one ;)</p>
				</div>
				<div className="col-md-12">	
					<input ref="input" type="text" />
				</div>
				<div>shortened url</div>
				<div className="col-md-12">	
					<input value={url} ref="output" type="text" />
				</div>
				<button onClick={this.shortenURL.bind(this)}>Snip</button>
				<button onClick={this.test.bind(this)}>Test</button>
			</div>
		)
	}
}

export default App;