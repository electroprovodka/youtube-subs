import React from 'react';
import {connect} from 'react-redux';
import { Nav, NavItem, Col, Row } from 'react-bootstrap';

import { moveTo, clearVideosState } from '../actions/actions';


const CustomNavItemLayout = ({children, to, moveTo, handleClick, ...props}) => {
	return(
		<NavItem onClick={(e) => moveTo(to, handleClick)} {...props}>
			{children}
		</NavItem>
	);
};

const CustomNavItem = connect((state, ownProps)=>({...ownProps}), {moveTo})(CustomNavItemLayout);

const Header = ({clearVideosState}) => {
	return (
		<Row>
			<Col xs={12}>
		    <Nav bsStyle="tabs">
		      <CustomNavItem to="/" handleClick={clearVideosState}>Search</CustomNavItem>
					<CustomNavItem to="/about">About</CustomNavItem>
					<CustomNavItem to="/contacts">Contacts</CustomNavItem>
		    </Nav>
			</Col>
		</Row>
	);
};

export default connect(null, {clearVideosState})(Header);
