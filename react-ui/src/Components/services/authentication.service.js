import { BehaviorSubject } from 'rxjs';

import config from '../Config/config';
import { handleResponse } from '../helpers';

const currentUserSubject = new BehaviorSubject(null);

const authenticationService = {
    login,
    logout,
    register,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password,token) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            email:username, 
            password:password,
            token:token })
    };

    return fetch(`${config.apiUrl}/api/user/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // Keep user only in memory
            currentUserSubject.next(user);

            return user;
        });
}

function register(name,email,password,confirmPassword) {
    if(password !== confirmPassword)
    {
        return;
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            name:name,
            email:email, 
            password:password
            })
    };

    return fetch(`${config.apiUrl}/api/user/register`, requestOptions)
        .then(handleResponse)
        .then(data => {
            // Keep user only in memory
            //currentUserSubject.next(user);

            return data;
        });
}

function logout() {
    // Set user to null
    currentUserSubject.next(null);
}

export default authenticationService;