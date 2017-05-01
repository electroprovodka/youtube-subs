import React from 'react';
import {connect} from 'react-redux';
import { userActions } from '../actions/actions';
import GoogleLogin from 'react-google-login';

import {FRONTEND_HOST, GOOGLE_CLIENT_ID} from '../constants';


const GoogleLogout = ({onClick}) => {
	return <button value="Logout" onClick={onClick}>Logout</button>;
};


const SingInBarLayout = ({loading, authenticated, loginSuccess, loginFail, logout}) => {
	return authenticated
	? <GoogleLogout onClick={logout}/>
	: <GoogleLogin
					disabled={loading}
					clientId={GOOGLE_CLIENT_ID}
					buttonText="Login"
					onSuccess={loginSuccess}
					onError={loginFail}
					redirectUri={FRONTEND_HOST}
				/>;
};
const mapSignInStateToProps = ({user}) => ({...user});


export default connect(mapSignInStateToProps, userActions)(SingInBarLayout);
