import React from "react";
import { connect } from 'react-redux';
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";

import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
	// state = { isSignedIn: null };

	componentDidMount() {
		// loads client library from Google Servers
		window.gapi.load('client:auth2', () => {
			// after library is loaded, initialize app using cid -- doesn't initiate oauth process
			window.gapi.client.init({
				clientId: '8173417289-sru5lg3f5d5idnsbug54iot9d9g1ifm2.apps.googleusercontent.com',
				scope: 'email',
				plugin_name: 'streamy'
			}).then(() => {
				// execute after gapi lib ready
				this.auth = window.gapi.auth2.getAuthInstance();
				this.onAuthChange(this.auth.isSignedIn.get());
				this.auth.isSignedIn.listen(this.onAuthChange);
			});
		});
	}
	
	onAuthChange = (isSignedIn) => {
		isSignedIn ? this.props.signIn() : this.props.signOut();
	};

	onSignInClick = () => {
		this.auth.signIn();
	};

	onSignOutClick = () => {
		this.auth.signOut();
	};

	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<button onClick={this.onSignOutClick} className="ui red google button">
					<i className="google icon" />
					Sign Out
				</button>
			);
		} else {
			return (
				<button onClick={this.onSignInClick} className="ui red google button">
					<i className="google icon" />
					Sign In with Google
				</button>
			);
		}
	}

	render () {
		return (
			<div>{this.renderAuthButton()}</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
	mapStateToProps, 
	{ signIn, signOut }
)(GoogleAuth);