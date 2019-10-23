import React, { Component } from 'react';
import {
    Button
} from 'reactstrap';
import '../styles/profile-page.css';

export class Home extends Component {
    static displayName = Home.name;

    static renderUserProfile(props) {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="profile-img">
                        <img className="rounded-circle" src={props.state.photo} alt="" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="profile-head">
                        <h5>
                            {props.state.user.displayName}
                        </h5>
                        <h6>
                            {props.state.user.jobTitle}
                        </h6>
                    </div>
                </div>
                <div className="col-md-2">
                    <Button color="primary" onClick={props.authButtonMethod}>Logout</Button>
                </div>
            </div>
        );
    }

    render() {
        let contents = null;

        if (this.props.isAuthenticated) {
            contents = this.props.state.isLoading
                ? <p className="text-center"><em>... Loading Your Profile ...</em></p>
                : Home.renderUserProfile(this.props);
        }

        else {
            contents =
                <div>
                    <h2>Welcome to Library - React App</h2>
                    <Button color="primary" onClick={this.props.authButtonMethod}>Click here to sign in</Button>
                </div>;
        }

        return (
            <div className="container user-profile">
                {contents}
            </div>
        );
    }
}
