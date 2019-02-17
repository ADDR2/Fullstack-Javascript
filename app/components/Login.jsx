/* 3rd party libraries */
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

/* Local libraries */
import { login } from 'userServices';
import Authentication from "Authentication";

export class Login extends Component {
    state = {
        username: '',
        password: '',
        loggedIn: false,
        sending: false,
        error: null
    };

    updateInput(name, { target: { value } }) {
        this.setState({ [name]: value });
    }

    submit = async (event) => {
        event.preventDefault();
        const { username, password } = this.state;

        try {
            this.setState({ sending: true, error: null });
            const { data: { access_token } } = await login(username, password);
            Authentication.storeToken(access_token);
            this.setState({ loggedIn: true, sending: false });
        } catch(error) {
            console.log(error);
            this.setState({ sending: false, error: 'Invalid username or password :/' });
        }

    }

	render() {
        const { username, password, loggedIn, sending, error } = this.state;
        if (loggedIn) return <Redirect to="map"/>;

		return (
            <div className="login-page">
                <div className="form">
                    <form onSubmit={this.submit}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={this.updateInput.bind(this, 'username')}
                            spellCheck="false"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={this.updateInput.bind(this, 'password')}
                            spellCheck="false"
                            required
                        />
                        <button type="submit" disabled={sending}>Login</button>
                        {error?
                                <p>{error}</p>
                            :
                                ''
                        }
                    </form>
                </div>
            </div>
		);
	}
}

export default Login;