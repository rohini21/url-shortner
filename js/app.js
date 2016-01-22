import React from 'react';
import ReactDOM from 'react-dom';
import rest from 'rest';

var App =  React.createClass({
	 getInitialState: function() {
    return {
      url: ""
    }
  },
	componentDidMount: function() {
	},
	shortenURL: function(){
		var url = ReactDOM.findDOMNode(this.refs.input).value;
		console.log("in shortenURL",url)
		rest('http://localhost:9001/?url='+url)
		.then(function(data){
			console.log("data-----",data);
		})
		/*ReactDOM.findDOMNode(this.refs.output).value = shortenedURL;
		this.setState({
			url: url
		})*/
	},
	render() {
		return (
			<div className="container">
				<div className="col-md-6">	
					<p>Welcome to Snipper</p>
					<p>Snip your url to a smalller one ;)</p>
				</div>
				<div className="col-md-6">
					<input ref="input" type="text" />
				</div>
				<button onClick={this.shortenURL}>Snip</button>
				<div>shortened url</div>
				<div className="col-md-6">
					<input ref="output" type="text" />
				</div>
			</div>
		)
	}
})

export default App;