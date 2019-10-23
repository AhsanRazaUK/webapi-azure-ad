import { MsalAuthProvider, LoginType } from 'react-aad-msal';

export const authProvider = new MsalAuthProvider(
    {
        auth: {
            authority: "https://login.microsoftonline.com/YOUR-TENANT-ID", //Directory (tenant) ID Overview blade of App Registration
            clientId: "YOUR-APPLICATION-CLIENT-ID" //Application (client) ID
        },
        cache: {
            cacheLocation: 'sessionStorage',
            storeAuthStateInCookie: true,
        },
    },
    {
        scopes: ['https://graph.microsoft.com/.default']
    },

    LoginType.Popup
);

export const authFetch = async url => {
    const token = await authProvider.getIdToken();
    return fetch(url, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token.idToken.rawIdToken,
            'Content-Type': 'application/json',
        },
    });
};