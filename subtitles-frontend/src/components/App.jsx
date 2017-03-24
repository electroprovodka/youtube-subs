import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import { AboutPage, ContactsPage } from './StaticPages.jsx';
import SearchPage from './SearchPage.jsx';


const NotFound = () => {
	return (
		<div>
			<h3>404 Not found</h3>
		</div>
	)
}

const App = () => {
	return (
			<Router history={browserHistory}>
				<Route path="/" component={SearchPage} />
				<Route path="/about" component={AboutPage} />
				<Route path="/contacts" component={ContactsPage} />
				<Route path="*" component={NotFound}/>
			</Router>
	);
};

export default App;
