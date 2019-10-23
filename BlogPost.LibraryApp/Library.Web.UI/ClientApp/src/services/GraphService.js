var graph = require('@microsoft/microsoft-graph-client');

function getAuthenticatedClient(accessToken) {
    // Initialize Graph client
    const client = graph.Client.init({
        // Use the provided access token to authenticate
        // requests
        authProvider: (done) => {
            done(null, accessToken.accessToken);
        }
    });

    return client;
}

export async function getUserDetails(userId, accessToken) {

    const client = getAuthenticatedClient(accessToken);

    const user = await client.api('/' + userId).get();

    return user;
}

export async function getUserPhoto(userId, accessToken) {

    var url = 'https://graph.microsoft.com/v1.0/' + userId + '/photo/$value';

    return fetch(url, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + accessToken.accessToken,
            'Content-Type': 'application/json',
        },
    });

}