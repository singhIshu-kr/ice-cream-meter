import { axiosInstance as axios } from '../axios-wrapper/axios.config';
import cookie from 'react-cookies';

export const addScore = (dispatch, id, teamId) => {
  let body = { id, teamId };
  return axios.post('addScore', body, { headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') } }).then((res) => {
    if (res.status === 200) {
      return getSavedState(dispatch, teamId)
    }
  })
}

export const decreaseScore = (dispatch, id, teamId) => {
  let body = { id, teamId };
  return axios.post('reduceScore', body, { headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') } }).then((res) => {
    if (res.status === 200) {
      return getSavedState(dispatch, teamId);
    }
  })
}

export const resetScore = (dispatch, id, teamId) => {
  let body = { id };
  return axios.post('reset-score', body, { headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') } }).then((res) => {
    if (res.status === 200) {
      return getSavedState(dispatch, teamId);
    }
  })
}

export const addMember = (dispatch, name, teamId) => {
  let body = { name, teamId };
  return axios.post('addMember', body, { headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') } }).then((res) => {
    if (res.status === 200) {
      return getSavedState(dispatch, teamId);
    }

  }).catch((error) => {
    if (error.response.status == 400) {
      return dispatch({
        type: "NAME_IN_USE"
      })
    }
    return dispatch({
      type: "INTERNAL_SERVER_ERROR"
    })
  })
}

export const removeMember = (dispatch, id, teamId) => {
  let body = { id };
  return axios.post('/remove', body, { headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') } }).then((res) => {
    if (res.status === 200) {
      return getSavedState(dispatch, teamId);
    }
  })
}

export const getSavedState = (dispatch, teamId) => {
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

export const addUser = (dispatch, name, email, password) => {
  let body = {
    name, email, password
  }
  return axios.post('addUser', body).then((res) => {
    if (res.status === 200) {
      cookie.save("email", email, { path: "/" });
      cookie.save("accessToken", res.data, { path: "/" });
      return dispatch({
        type: "LOGIN_TEAM"
      })
    }
  })
}

export const loginTeam = (dispatch, email, password) => {
  let body = {
    email, password
  }
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
}

export const toggleLogin = () => {
  return {
    type: "TOGGLE_LOGIN"
  }
}

export const signOutTeam = () => {
  return axios.post('/signOutUser', {}, { headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') } }).then((res) => {
    if (res.status === 200) {
      cookie.remove("email", { path: "/" });
      cookie.remove("accessToken", { path: "/" });
    }
  })
}

export const checkLoggedIn = (dispatch) => {
  return axios.get('/isLoggedIn', { headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') } }).then((res) => {
    if (res.status === 204) {
      return dispatch({
        type: "IS_LOGGED_IN"
      })
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
}

export const displayError = (errorMessage) => {
  return {
    type: "ERROR",
    errorMessage
  }
}
