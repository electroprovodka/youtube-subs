import React from 'react';
import { FormGroup, InputGroup, FormControl, Glyphicon } from 'react-bootstrap';

const SearchBar = ({query, onChange, onSubmit}) => {
	return (<div>
		<FormGroup>
			<InputGroup>
				<FormControl type="text" value={query} onChange={(e) => onChange(e.target.value)}/>
				<InputGroup.Addon onClick={(e) => onSubmit()}>
					<Glyphicon glyph="search"/>
				</InputGroup.Addon>
			</InputGroup>
		</FormGroup>
	</div>);
};


export default SearchBar;
