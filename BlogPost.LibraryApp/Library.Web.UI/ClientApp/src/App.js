import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { authProvider } from './authProvider';
import { AzureAD, AuthenticationState } from 'react-aad-msal';
import { getUserDetails, getUserPhoto } from './services/GraphService';
import { FetchBooks } from './components/FetchBooks';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            user: null
        };

        var user = authProvider.getAccount();

        if (user) {

            this.getMyProfile();
        }
    }

    async login() {

        await authProvider.login();

        await this.getMyProfile();
    }

    async getMyProfile() {

        try {

            var accessToken = await authProvider.getAccessToken();

            if (accessToken) {
                this.setState({

                    isLoading: false,
                    user: await getUserDetails("me", accessToken),
                    photo: await this.getMyPhoto(accessToken)

                });
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    async getMyPhoto(accessToken) {
        return await getUserPhoto("me", accessToken).then(
            function (response) {
                if (response.ok) {
                    return response.blob();
                }
            })
            .then(
                function (photoBlob) {
                    if (photoBlob) {
                        return URL.createObjectURL(photoBlob);
                    }
                });
    }

    render() {
        return (
            <AzureAD provider={authProvider}>
                {
                    ({ logout, authenticationState }) => {
                        return (
                            <Layout>
                                {
                                    <React.Fragment>
                                        <Route exact path="/"
                                            render={(props) =>
                                                <Home {...props}
                                                    state={this.state}
                                                    isAuthenticated={authenticationState === AuthenticationState.Authenticated}
                                                    authButtonMethod={authenticationState === AuthenticationState.Authenticated ?
                                                        logout.bind(this) : this.login.bind(this)} />
                                            } />
                                        {authenticationState === AuthenticationState.Authenticated && (
                                            <Route path="/fetch-books" render={(props) => <FetchBooks {...props} />} />)}
                                        <Route path='/counter' component={Counter} />
                                        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
                                    </React.Fragment>
                                }
                            </Layout>
                        );
                    }
                }
            </AzureAD>
        );
    }
}

