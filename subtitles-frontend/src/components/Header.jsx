import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { browserHistory } from 'react-router';


const CustomNavItem = ({children, to, ...props}) => {
	// TODO: move somewhere
	const moveTo = () => browserHistory.push(to);
	return(
		<NavItem onClick={moveTo} {...props}>
			{children}
		</NavItem>
	);
};

const Header = () => {
	return (
    <Nav bsStyle="tabs">
      <CustomNavItem to="/">Search</CustomNavItem>
			<CustomNavItem to="/about">About</CustomNavItem>
			<CustomNavItem to="/contacts">Contacts</CustomNavItem>
    </Nav>
	);
};

export default Header;
