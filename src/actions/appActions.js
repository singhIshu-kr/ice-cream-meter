import {axiosInstance as axios} from "../axios-wrapper/axios.config";
import cookie from "react-cookies";

export const addUser = (name, email, password) => (dispatch) => {
    let body = {
        name, email, password
    };

    return axios.post('addUser', body).then((res) => {
        if (res.status === 200) {
            cookie.save("email", email, {path: "/"});
            cookie.save("accessToken", res.data, {path: "/"});
            return dispatch({
                type: "LOGIN_TEAM"
            })
        }
    })
};

export const loginTeam = (email, password) => (dispatch) => {
    let body = {
        email, password
    };

    return axios.post('loginUser', body)
        .then((res) => {
            if (res.status === 200) {
                cookie.save("email", email, { path: "/" });
                cookie.save("accessToken", res.data, { path: "/" });
                return dispatch({
                    type: "LOGIN_TEAM"
                })
            }
        })
        .catch(() => {
            return dispatch({
                type: "INVALID_CREDENTIALS"
            })
        });
};

export const toggleLogin = () => {
    return {
        type: "TOGGLE_LOGIN"
    }
};

export const checkLoggedIn = () => {return (dispatch) => {
    return axios.get('/isLoggedIn', {
        headers: {
            accesstoken: cookie.load('accessToken'),
            email: cookie.load('email')
        }
    }).then((res) => {
        if (res.status === 204) {
            return dispatch({
                type: "IS_LOGGED_IN"
            })
        }
    })
}};

export const displayError = (errorMessage) => {
    return {
        type: "ERROR",
        errorMessage
    }
};

const appActions = {
    addUser,
    loginTeam,
    toggleLogin,
    checkLoggedIn,
    displayError,
};

export default appActions;