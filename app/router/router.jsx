/* 3rd party libraries */
import React from "react";
import { Route, Switch, HashRouter, Redirect } from "react-router-dom";

/* Local libraries */
import Authentication from "Authentication";

/* Components */
import MapComponent from "MapComponent";
import Login from "Login";

export default (
	<HashRouter>
		<Switch>
			<Route exact path="/"
				render={() => {
					if (Authentication.isAuthenticated()) return <Redirect to='/map'/>
					return <Redirect to='/login'/>
				}}
			/>
			<Route
				exact
				path="/login"
				render={props => {
					if (Authentication.isAuthenticated()) return <Redirect to='/map'/>
					return <Login {...props}/>;
				}}
			/>
			<Route
				exact
				path="/map"
				render={props => {
					if (Authentication.isAuthenticated()) return <MapComponent {...props}/>
					return <Redirect to='/login'/>;
				}}
			/>
		</Switch>
	</HashRouter>
);