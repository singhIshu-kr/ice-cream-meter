import {axiosInstance as axios} from "../axios-wrapper/axios.config";
import cookie from "react-cookies";

export const addScore = (id, teamId) => (dispatch) => {
    let body = { id, teamId };
    return axios.post('addScore', body, { headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') } }).then((res) => {
        if (res.status === 200) {
            return fetchTeamInfo(dispatch, teamId)
        }
    })
}

export const decreaseScore = (id, teamId) => (dispatch) => {
    let body = { id, teamId };
    return axios.post('reduceScore', body, { headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') } }).then((res) => {
        if (res.status === 200) {
            return fetchTeamInfo(dispatch, teamId);
        }
    })
}

export const resetScore = (id, teamId) => (dispatch) => {
    let body = { id };
    return axios.post('reset-score', body, { headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') } }).then((res) => {
        if (res.status === 200) {
            return fetchTeamInfo(dispatch, teamId);
        }
    })
}

export const addMember = (name, teamId) => (dispatch) => {
    let body = { name, teamId };
    return axios.post('addMember', body, { headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') } }).then((res) => {
        if (res.status === 200) {
            return fetchTeamInfo(dispatch, teamId);
        }

    }).catch((error) => {
        if (error.response.status === 400) {
            return dispatch({
                type: "NAME_IN_USE"
            })
        }
        return dispatch({
            type: "INTERNAL_SERVER_ERROR"
        })
    })
}

export const removeMember = (id, teamId) => (dispatch) => {
    let body = { id };
    return axios.post('/remove', body, { headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') } }).then((res) => {
        if (res.status === 200) {
            return fetchTeamInfo(dispatch, teamId);
        }
    })
}

export const fetchTeamInfo = (teamId) => (dispatch) => {
    return axios.get(`/read/${teamId}`, { headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') } })
        .then((response) => {
            return dispatch(
                {
                    type: "SET_TEAM",
                    payload: response.data
                }
            )
        }).catch(() => {
            window.location.href = "/";
        });
}

const teamActions = {
    addScore,
    decreaseScore,
    resetScore,
    addMember,
    removeMember,
    fetchTeamInfo
}

export default teamActions;