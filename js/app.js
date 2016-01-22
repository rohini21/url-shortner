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
		var regexObj =  /(((http|https|ftp|ftps):\/\/)|www\.)[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#!]*[\w\-\@?^=%&amp;\/~\+#])?/;
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
				<div className="about col-md-12">	
					<div className="jumbotron header">	
					<h1>Welcome to Snipper</h1>
					</div>
				</div>
				<div className="col-md-12 main">	
					<p>Snip your url to a smalller one!</p>
					<input ref="input" type="text" />
					<div className="button">
						<button className="btn btn-cus" onClick={this.shortenURL.bind(this)}>Snip</button>
					</div>
					<div className="output-wrap">
						<h2>Shortened URL</h2>
						<div className="output">
							<a href={url} type="text">{url}</a>
						</div>
					</div>
				</div>
				<button onClick={this.test.bind(this)}>Test</button>
			</div>
		)
	}
}

export default App;