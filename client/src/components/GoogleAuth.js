import React from "react";

class GoogleAuth extends React.Component {
	state = { isSignedIn: null };

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
				this.setState({ isSignedIn: this.auth.isSignedIn.get() });
				this.auth.isSignedIn.listen(this.onAuthChange);
			});
		});
	}

	renderAuthButton() {
		if (this.state.isSignedIn === null) {
			return null;
		} else if (this.state.isSignedIn) {
			return (
				<button className="ui red google button">
					<i className="google icon" />
					Sign Out
				</button>
			);
		} else {
			return (
				<button className="ui red google button">
					<i className="google icon" />
					Sign In with Google
				</button>
			);
		}
	}

	onAuthChange = () => {
		this.setState({ isSignedIn: this.auth.isSignedIn.get() });
	};

	render () {
		return (
			<div>{this.renderAuthButton()}</div>
		);
	}
}

export default GoogleAuth;