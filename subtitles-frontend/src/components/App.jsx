import React from 'react';
import { connect } from 'react-redux';
import Header from './Header.jsx';
import PageTitle from './PageTitle.jsx';
import SearchBar from './SearchBar.jsx';
import Footer from './Footer.jsx';

import { ResultsPage } from './Results.jsx';

import actions from '../actions/actions';


const MainPage = ({children, onPageSwitch}) => {
	return (
		<div className="container-fluid">
			<Header onPageSwitch={onPageSwitch}/>
			<div className="container">
				<PageTitle />
				{children}
			</div>
		</div>
	);
};

const ResultsPage = ({children}) => {
	return (
		<div className="container">
			{children}
		</div>
	);
};

const Page = ({children, onPageSwitch}) => {
	return (
    <div className="container-fluid">
      <Header onPageSwitch={onPageSwitch}/>
			<div className="container">
				{children}
			</div>
			<Footer/>
    </div>
	);
};


const SearchPageComponent = ({query, videos, updateQuery, submitSearch}) => {
	const Component = videos && videos.length ? ResultsPage : SearchBar;
	return (
    <Component query={query} videos={videos} onChange={updateQuery} onSubmit={submitSearch}/>
	);
};

const mapStateToProps = ({query, videos}) => ({query, videos});
const SearchPage = connect(mapStateToProps, actions)(SearchPageComponent);


const AboutPage = () => {
	return (
		<div>
			<h2> About </h2>
			<p> Search youtube subs for what you want </p>
		</div>
	);
};

const ContactPage = () => {
	return (
		<div>
			<h2> Contacts </h2>
			<p> Anton Shevchenya </p>
		</div>
	);
};


class App extends React.Component {
	constructor() {
		super();
		this.state = {
			page: 'search'
		};

		this.switchPage = this.switchPage.bind(this);
	}

	switchPage(page) {
		this.setState({page});
	}

	render() {
		const page = this.state.page;
		const CurrentPage = page === 'search' ? SearchPage : page === 'about' ? AboutPage : ContactPage;
		return (
			<Page onPageSwitch={this.switchPage}>
				<PageTitle/>
				<CurrentPage/>
			</Page>
		);
	}
}

export default App;
