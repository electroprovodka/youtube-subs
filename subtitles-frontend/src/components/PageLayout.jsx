import React from 'react';

import Header from './Header.jsx';
import Footer from './Footer.jsx';


const PageLayout = ({children}) => {
	return (
		<div className="container-fluid">
			<Header/>
			<div className="container">
				{children}
			</div>
			<Footer/>
		</div>
	);
};

export default PageLayout;
