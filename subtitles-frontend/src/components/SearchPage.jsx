import React from 'react';
import { connect } from 'react-redux';

import SearchBar from './SearchBar.jsx';
import ResultsPage from './Results.jsx';
import PageTitle from './PageTitle.jsx';
import PageLayout from './PageLayout.jsx';


const SearchPage = () => {
	return (
		<PageLayout>
			<PageTitle/>
			<SearchBar/>
		</PageLayout>
	)
}

const SearchPageLayout = ({totalLength}) => {
	return totalLength > 0 ? <ResultsPage/> : <SearchPage/>
};

const mapStateToProps = ({data: {totalLength}}) => ({totalLength});
export default connect(mapStateToProps)(SearchPageLayout);
