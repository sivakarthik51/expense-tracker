import config from '../Config/config';
import { authHeader, handleResponse } from '../helpers';

const userService = {
    getAll
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

export default userService;