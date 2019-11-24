import {axiosInstance as axios} from '../axios-wrapper/axios.config';
import cookie from 'react-cookies';

export const signOutTeam = () => () => {
  return axios.post('/signOutUser', {}, { headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') } }).then((res) => {
    if (res.status === 200) {
      cookie.remove("email", { path: "/" });
      cookie.remove("accessToken", { path: "/" });
    }
  })
}

export const addNewTeam = (dispatch, userId, teamName) => {
  let body = { userId, teamName }
  return axios.post('/newTeam', body, { headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') } }).then((res) => {
    if (res.status === 200) {
      return dispatch({
        type: "TEAM_CREATED",
        newTeam: teamName
      })
    }
  })
}

export const getTeamsOfUser = (dispatch, userId) => {
  return axios.get(`/myTeams/${userId}`, { headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') } }).then((res) => {
    if (res.status === 200) {
      return dispatch({
        type: "GET_TEAMS_OF_USER",
        teams: res.data.allTeamsOfUser
      })
    }
  }).catch(() => {
    window.location.href = '/'
  })
}

export const getSearchedTeam = (dispatch, teamName) => {
  return axios.get(`/search/${teamName}`, { headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') } }).then((res) => {
    if (res.status === 200) {
      return dispatch({
        type: "SEARCH_TEAM",
        searchedTeam: res.data.name
      })
    }
  }).catch((error) => {
    if (error.response.status === 404) {
      return dispatch({
        type: "TEAM_DOESNOT_EXIST"
      })
    }
  })
}

export const requestAccess = (dispatch, userId, teamName) => {
  const body = { teamName, userId}
  return axios.post("/request", body, { headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') } }).then((res) => {
    if(res.status === 200){
      return dispatch({
        type: "REQUEST_SENT"
      })
    }
  }).catch((error)=>{
    if(error.response.status === 400){
      return dispatch({
        type: "INVALID_REQUEST"
      })
    }
  })
}

export const getAccessRequests = (dispatch, userId) =>{
  return axios.get(`/allRequests/${userId}`, { headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') } }).then((res) => {
    if (res.status === 200) {
      return dispatch({
        type: "GET_ACCESS_REQUESTS",
        accessRequests: res.data
      })
    }
  })
}

export const permitAccess = (dispatch, userId, requestUser, teamName, role) => {
  const body = { userId, requestUser, teamName, role}
  return axios.post(`/permitAccess`, body, { headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') } }).then((res) => {
    if(res.status === 200) {
      return getAccessRequests(dispatch, userId)
    }
  })
};

const userActions = {
  signOutTeam,
  addNewTeam,
  getTeamsOfUser,
  getSearchedTeam,
  requestAccess,
  getAccessRequests,
  permitAccess
}

export default userActions;