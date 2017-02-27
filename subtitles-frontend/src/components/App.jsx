import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import PageTitle from './PageTitle.jsx';
import SearchBar from './SearchBar.jsx';
import PageLayout from './PageLayout.jsx';

import { ResultsPage } from './Results.jsx';

import actions from '../actions/actions';


const SearchPageLayout = ({query, updateQuery, submitSearch}) => {
	return (
		<PageLayout>
			<PageTitle/>
			<SearchBar query={query} onChange={updateQuery} onSubmit={submitSearch} />
		</PageLayout>
	);
};

const mapStateToProps = ({query}) => ({query});
const SearchPage = connect(mapStateToProps, actions)(SearchPageLayout);

const AboutPage = () => {
	return (
		<PageLayout>
			<PageTitle/>
			<div>
				<h2> About </h2>
				<p> Search youtube subs for what you want </p>
			</div>
		</PageLayout>
	);
};

const ContactsPage = () => {
	return (
		<PageLayout>
			<PageTitle/>
			<div>
				<h2> Contacts </h2>
				<p> Anton Shevchenya </p>
			</div>
		</PageLayout>
	);
};

const App = () => {
	return (
			<Router history={browserHistory}>
				<Route path="/" component={SearchPage} />
				<Route path="/about" component={AboutPage} />
				<Route path="/contacts" component={ContactsPage} />
				<Route path="/results" component={ResultsPage} />
			</Router>
	);
};

export default App;
