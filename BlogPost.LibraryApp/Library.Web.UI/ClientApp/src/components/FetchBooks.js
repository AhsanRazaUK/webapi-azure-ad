import React, { Component } from 'react';
import { getAllBooks } from '../services/LibraryService';


export class FetchBooks extends Component {

    state = {
        isLoading: true,
        apiResponse: ''
    };

    async componentDidMount() {

        await getAllBooks().then(
            (response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            this.setState({
                                isLoading: false,
                                apiResponse: JSON.stringify(responseData, null, 2)
                            })
                        });
                }
                else if (response.status === 401) {
                    throw new Error("User not authorized");
                }
                else {
                    throw new Error("Not working");
                }
            })
            .catch((err) => {

                // Don't forget to handle errors!
                console.error(err);
                this.setState({ isLoading: false, apiResponse: 'Error: ' + err.message });
            });

    }

    render() {
        let contents = this.state.isLoading
            ? <p><em>Loading...</em></p>
            : <pre>{this.state.apiResponse}</pre>;

        return (
            <div className="container user-profile">
                {contents}
            </div>
        );
    }
}

