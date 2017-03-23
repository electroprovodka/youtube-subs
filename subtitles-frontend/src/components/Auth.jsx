import React from 'react';
import {connect} from 'react-redux';
import { userActions } from '../actions/actions';
import GoogleLogin from 'react-google-login';

import {FRONTEND_HOST, GOOGLE_CLIENT_ID} from '../constants'


const GoogleLogout = ({onClick}) => {
	return <button value="Logout" onClick={onClick}>Logout</button>
}

// +.google-signin-container {
//  +    text-align: center;
//  +}
//  +
//  +#google-signin-button {
//  +    display: inline-block;
//  +    border-style: none;
//  +    width: 191px;
//  +    height: 46px;
//  +    background: url('../images/google/btn_google_signin_dark_normal_web@2x.png') center/contain no-repeat;
//  +}
//  +
//  +#google-signin-button:hover {
//  +    background: url('../images/google/btn_google_signin_dark_focus_web@2x.png') center/contain no-repeat;
//  +}
//  +
//  +#google-signin-button:active,#google-signin-button:focus {
//  +    background: url('../images/google/btn_google_signin_dark_pressed_web@2x.png') center/contain no-repeat;
//  +}

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
				/>
}
const mapSignInStateToProps = ({user}) => ({...user})


export default connect(mapSignInStateToProps, userActions)(SingInBarLayout)
