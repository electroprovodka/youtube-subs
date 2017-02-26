import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';

const Header = ({onPageSwitch}) => {
	return (
    <Nav bsStyle="tabs">
      <NavItem eventKey={1} onSelect={() => onPageSwitch('search')}>Search</NavItem>
      <NavItem eventKey={2} onSelect={() => onPageSwitch('about')}>About</NavItem>
      <NavItem eventKey={3} onSelect={() => onPageSwitch('contact')}>Contact</NavItem>
    </Nav>
	);
};

export default Header;
