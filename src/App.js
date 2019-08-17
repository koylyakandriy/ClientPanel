import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import AppNavBar from "./components/layout/AppNavBar";
import Dashboard from "./components/layout/Dashboard"

import './App.css';

function App() {
	return (
		<Router>
			<div className="App">
				<AppNavBar/>
				<div className="container">
					<Switch>
						<Route exact path="/" component={Dashboard} />
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
