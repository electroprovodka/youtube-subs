import React from 'react';

export default ({size}) => {
	let title = <h1>YouTube Search</h1>;
	if (size && size == 'small') {
		title = <h4>YouTube Search</h4>;
	}
	return (
		<div className="container">
			{title}
		</div>
	);
};
