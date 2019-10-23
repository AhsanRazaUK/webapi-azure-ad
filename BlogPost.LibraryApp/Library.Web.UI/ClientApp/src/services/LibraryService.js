import config from '../Config';
import { authFetch } from '../authProvider';

export async function getAllBooks() {

    return await authFetch(config.apiBaseUrl + `/api/books`);

}