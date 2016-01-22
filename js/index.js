import "../css/lib/bootstrap.min.css";
import "./lib/bootstrap/bootstrap.min.js";

import "../css/style.css";

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import App from "./app";
import NF from "./notFound";


render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    </Route>
 		<Route path="*" component={NF}/>
  </Router>
), document.getElementById("app"))