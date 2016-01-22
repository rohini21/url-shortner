import React from 'react';
import rest from 'rest';

class NF extends React.Component {
	componentDidMount() {
		var loc = window.location;
		var str = loc.hash.substring(2,loc.hash.indexOf('?'))
		console.log("loc----",str)
		rest('http://localhost:9001/getUrl/?code='+str)
		.then(function(data){
			console.log("data-----",data);
			window.location = data.entity
		})
	}

	render() {
		return (
				<div className="wait">Waiting...</div>
		)
	}
}

export default NF;