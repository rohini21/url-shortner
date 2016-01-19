import React from 'react';
import ReactDOM from 'react-dom';

var App =  React.createClass({
	 getInitialState: function() {
    return {
      url: ""
    }
  },
	componentDidMount: function() {
		console.log("in componentDidMount",this.state.url);
		var url = "google.com";
	},
	shortenURL: function(){
		var url = ReactDOM.findDOMNode(this.refs.input).value;
		var shortenedUrl = "http://localhost:8000/#/?_k=iutyxs"+ "/xyz";
		console.log("in shortenURL",shortenedUrl)

		ReactDOM.findDOMNode(this.refs.output).value = shortenedURL;
		this.setState({
			url: url
		})
	},
	render() {
		return (<div className="container">
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
			</div>)
	}
})

export default App;