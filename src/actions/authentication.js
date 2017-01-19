import axios from 'axios';
import Auth from '../modules/Auth';

import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE

} from './ActionTypes';



/*============================================================================
 authentication
 ==============================================================================*/

/* LOGIN */
export function loginRequest(email,password) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(login());

        // API REQUEST
        return axios.post('/auth/login',{email,password})
            .then((response) => {
                // SUCCEED
                //console.log("안녕하세요");
                //console.log(response.data.user.name);
                dispatch(loginSuccess(response.data.user.name));
                Auth.authenticateUser(response.data.token);
                console.log('The form is valid');
            }).catch((error) => {
                //console.log(error.response.data);
                //console.log(error.response.data.success);
                //console.log(error.response.data.message);
                //console.log(error.response.data.errors.email);
                //console.log(error.response.data.errors.password);
                const errorMessage =error.response.data.message;
                const errorEmail=error.response.data.errors.email;
                const errorPassword=error.response.data.errors.password;
                // FAILED
                dispatch(loginFailure(errorMessage,errorEmail,errorPassword));
            });
    };
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(user) {
    return {
        type: AUTH_LOGIN_SUCCESS
        ,user
    };
}

export function loginFailure(errorMessage,errorEmail,errorPassword) {
    return {
        type: AUTH_LOGIN_FAILURE,
        errorMessage,
        errorEmail,
        errorPassword
    };
}

/* REGISTER */
export function registerRequest(name, email, password) {
    return (dispatch) => {
        // Inform Register API is starting
        dispatch(register());

        return axios.post('/auth/signup', {name, email, password })
            .then((response) => {
                dispatch(registerSuccess());
                console.log('The form is valid');
            }).catch((error) => {
                // FAILED
                const errorMessage =error.response.data.message;
                const errorEmail=error.response.data.errors.email;
                const errorPassword=error.response.data.errors.password;
                const errorName=error.response.data.errors.name;

                dispatch(registerFailure(errorMessage,errorName,errorEmail,errorPassword));
            });
    };

}

export function register() {
    return {
        type: AUTH_REGISTER
    };
}

export function registerSuccess() {
    return {
        type: AUTH_REGISTER_SUCCESS,
    };
}

export function registerFailure(errorMessage,errorName,errorEmail,errorPassword) {
    return {
        type: AUTH_REGISTER_FAILURE,
        errorMessage,
        errorEmail,
        errorPassword,
        errorName
    };
}

/* GET STATUS */
/*
export function getStatusRequest() {
    return (dispatch) => {
        // inform Get Status API is starting
        dispatch(getStatus());

        return axios.get('/api/account/getInfo')
            .then((response) => {
                dispatch(getStatusSuccess(response.data.info.username));
            }).catch((error) => {
                dispatch(getStatusFailure());
            });
    };
}

export function getStatus() {
    return {
        type: AUTH_GET_STATUS
    };
}

export function getStatusSuccess(username) {
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        username
    };
}

export function getStatusFailure() {
    return {
        type: AUTH_GET_STATUS_FAILURE
    };
}
*/
/* Logout */
/*
export function logoutRequest() {
    return (dispatch) => {
        return axios.post('/auth/logout')
            .then((response) => {
                dispatch(logout());
            });
    };
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}
*/