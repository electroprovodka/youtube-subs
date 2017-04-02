import React from 'react';
import { connect } from 'react-redux';

import { FormGroup, InputGroup, FormControl, Glyphicon } from 'react-bootstrap';

import actions from '../actions/actions';

const SearchBar = ({query, updateQuery, submitSearch}) => {
	return (<div>
		<FormGroup>
			<InputGroup>
				<FormControl type="text" value={query} onChange={(e) => updateQuery(e.target.value)}/>
				<InputGroup.Addon onClick={submitSearch}>
					<Glyphicon glyph="search"/>
					{' 	'}
					Search
				</InputGroup.Addon>
			</InputGroup>
		</FormGroup>
	</div>);
};

const mapStateToProps = ({data: {query}}) => ({query});
export default connect(mapStateToProps, actions)(SearchBar);
