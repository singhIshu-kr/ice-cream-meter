import { axiosInstance as axios } from '../axios-wrapper/axios.config';
import cookie from 'react-cookies';

export const addScore = (dispatch, id,teamId) => {
  let body = { id,teamId};
  return axios.post('addScore', body, { headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') } }).then((res) => {
    if (res.status === 200) {
      return getSavedState(dispatch,teamId);
    }
  })
}

export const decreaseScore = (dispatch, id, teamId) => {
  let body = { id, teamId };
  return axios.post('reduceScore', body, { headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') } }).then((res) => {
    if (res.status === 200) {
      return getSavedState(dispatch,teamId);
    }
  })
}

export const resetScore = (dispatch, id, teamId) => {
  let body = { id };
  return axios.post('reset-score', body, { headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') } }).then((res) => {
    if (res.status === 200) {
      return getSavedState(dispatch,teamId);
    }
  })
}

export const addMember = (dispatch, name,teamId) => {
  let body = { name,teamId};
  console.log(teamId)
  return axios.post('addMember',body, { headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') }}).then((res) => {
    if (res.status === 200) {
      return getSavedState(dispatch,teamId);
    }
  }).catch(()=>{
    return dispatch({
      type:"ID_IN_USE"
    })
  })
}

export const removeMember = (dispatch, id, teamId) => {
  let body = { id};
  return axios.post('/remove', body, { headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') }}).then((res) => {
    if (res.status === 200) {
      return getSavedState(dispatch,teamId);
    }
  })
}

export const getSavedState = (dispatch,teamId) => {
  return axios.get(`/read/${teamId}`, {headers: {accesstoken:cookie.load('accessToken'),email:cookie.load('email')}}).then((response) => {
    return dispatch(
      {
        type: "SET_TEAM",
        payload: response.data
      }
    )
  });
}

export const addTeam = (dispatch, name, email, password) => {
  let body = {
    name, email, password
  }
  return axios.post('addTeam',body).then((res) => {
    if (res.status === 200) {
      cookie.save("email", email, { path: "/" });
      cookie.save("accessToken", res.data, { path: "/" });
      return dispatch({
        type: "LOGIN_TEAM"
      })
    }
  })
}

export const loginTeam = (dispatch, email, password) =>{
  let body = {
    email,password
  }
  return axios.post('loginTeam', body)
    .then((res) => {
      if (res.status === 200) {
        cookie.save("email",email,{path:"/"});
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
  return{
      type: "TOGGLE_LOGIN"
  }
}

export const signOutTeam = (dispatch,id) => {
  return axios.get('/isLoggedIn',{ headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') } }).then((res) => {
    if (res.status === 204) {
      cookie.remove("email", { path: "/" });
      cookie.remove("accessToken", { path: "/" });
      return getSavedState(dispatch, id);
    }
  })
}

export const checkLoggedIn = (dispatch) =>{
  return axios.get('/isLoggedIn',{ headers: { accesstoken: cookie.load('accessToken'), email: cookie.load('email') } }).then((res) => {
    if(res.status === 204){
      return dispatch({
        type: "IS_LOGGED_IN"
      })
    }
  })
}
