import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import { AboutPage, ContactsPage } from './StaticPages.jsx';
import SearchPage from './SearchPage.jsx';


const App = () => {
	return (
			<Router history={browserHistory}>
				<Route path="/" component={SearchPage} />
				<Route path="/about" component={AboutPage} />
				<Route path="/contacts" component={ContactsPage} />
			</Router>
	);
};

export default App;
