import td from 'testdouble'
import { axiosInstance as axios } from '../../src/axios-wrapper/axios.config';
import MockAdapter from 'axios-mock-adapter'
import * as actions from '../../src/actions/userActions'
import appActions from "../../src/actions/appActions";

describe('Should dispatch all the actions', () => {
  const mockAdapter = new MockAdapter(axios);

  describe("GetSavedState", () => {
    it('should fetch the team information', (done) => {
      const dispatch = td.function('dispatch');
      const expectedAction = {
        type: "SET_TEAM",
        payload:[]
      }
      mockAdapter.onGet('/read/1233').reply(() => {
        return Promise.resolve([200,[]])
      });

      actions.getSavedState(dispatch,"1233").then(() => {
        td.verify(dispatch(expectedAction), { times: 1 })
        done();
      })
    })
  })


  describe('addScore', () => {

    it('should send ID and get the new score', (done) => {
      const body = { id: 2 ,teamId : "1233"};
      mockAdapter.onPost('/addScore', body).reply(() => {
        return Promise.resolve([200])
      }).onGet('/read/1233').reply(() => {
        return Promise.resolve([200,[]])
      });

      const dispatch = td.function('dispatch');
      const expectedAction = {
        type: "SET_TEAM",
        payload:[]
      }
      actions.addScore(dispatch, 2,"1233").then(() => {
        td.verify(dispatch(expectedAction), { times: 1 })
        done();
      })
    })

    it('should not call dispatch when status code is not 200 ', (done) => {
      const body = { id: 2 ,teamId : "1233"};
      mockAdapter.onPost('/addScore', body).reply(() => {
        return Promise.resolve([201])
      }).onGet('/read/1233').reply(() => {
        return Promise.resolve([201,[]])
      });

      const dispatch = td.function('dispatch');
      const expectedAction = {
        type: "SET_TEAM",
        payload:[]
      }

      actions.addScore(dispatch, 2,"1233").then(() => {
        td.verify(dispatch(expectedAction), { times: 0 })
        done();
      })
    });
  });


  describe('Decrease Score', () => {
    it('should send ID and get the decreased score', (done) => {
      const dispatch = td.function('dispatch');
      const body = { id: 2 ,teamId : "1233"};
      const expectedAction = {
        type: "SET_TEAM",
        payload:[]
      }
      mockAdapter.onPost('/reduceScore', body).reply(() => {
        return Promise.resolve([200])
      }).onGet('/read/1233').reply(() => {
        return Promise.resolve([200,[]])
      });

      actions.decreaseScore(dispatch, 2,"1233").then(() => {
        td.verify(dispatch(expectedAction), { times: 1 })
        done();
      })
    })

    it('should not call dispatch when status code is not 200 ', (done) => {
      const body = { id: 2 ,teamId : "1233"};
      mockAdapter.onPost('/reduceScore', body).reply(() => {
        return Promise.resolve([201])
      }).onGet('/read/1233').reply(() => {
        return Promise.resolve([201, { team: [{ id: 2 }] }])
      });

      const dispatch = td.function('dispatch');
      const expectedAction = {
        type: "SET_TEAM",
        payload: [{ id: 2 }]
      }

      actions.decreaseScore(dispatch, 2,"1233").then(() => {
        td.verify(dispatch(expectedAction), { times: 0 })
        done();
      })
    });
  })

  describe('Add Member', () => {
    it('should send name and get the updated team', (done) => {
      const dispatch = td.function('dispatch');
      const body = { name: "ishu",teamId:"1233" };
      const expectedAction = {
        type: "SET_TEAM",
        payload: { team: [{ name: "ishu" }] }
      }

      mockAdapter.onPost('/addMember', body).reply(() => {
        return Promise.resolve([200])
      }).onGet('/read/1233').reply(() => {
        return Promise.resolve([200, { team: [{ name: "ishu" }] }])
      });

      actions.addMember(dispatch, "ishu","1233").then(() => {
        td.verify(dispatch(expectedAction), { times: 1 })
        done();
      })
    })

    it('should not call dispatch when status code is not 200 ', (done) => {
      const dispatch = td.function('dispatch');
      const expectedAction = {
        type: "SET_TEAM",
        payload: { team: [{ name: "ishu" }] }
      }
      const body = { name: "ishu" };
      mockAdapter.onPost('/addMember', body).reply(() => {
        return Promise.resolve([201])
      }).onGet('/read/1233').reply(() => {
        return Promise.resolve([201, { team: [{ name: "ishu" }] }])
      });


      actions.addMember(dispatch, "ishu").then(() => {
        td.verify(dispatch(expectedAction), { times: 0 })
        done();
      })
    });

    it('should dispatch name in use action on error', (done) => {
      const dispatch = td.function('dispatch');
      const expectedAction = {
        type: "NAME_IN_USE"
      }
      const body = { name: "ishu" };
      mockAdapter.onPost('/addMember', body).reply(400);
      actions.addMember(dispatch, "ishu").then(() => {
        td.verify(dispatch(expectedAction), { times: 1 })
        done();
      })   
    });

    it('should dispatch INTERNAL_SERVER_ERROR for errors other than 400', (done) => {
      const dispatch = td.function('dispatch');
      const expectedAction = {
        type: "INTERNAL_SERVER_ERROR"
      }
      const body = { name: "ishu" };
      mockAdapter.onPost('/addMember', body).reply(500);
      actions.addMember(dispatch, "ishu").then(() => {
        td.verify(dispatch(expectedAction), { times: 1 })
        done();
      })
    });
  })

  describe('Remove Member', () => {
    it('should send id and get the updated team', (done) => {
      const dispatch = td.function('dispatch');
      const body = { id: 2 };
      const expectedAction = {
        type: "SET_TEAM",
        payload: { team: [{ id: 2 }] }
      }

      mockAdapter.onPost('/remove', body).reply(() => {
        return Promise.resolve([200])
      }).onGet('/read/1233').reply(() => {
        return Promise.resolve([200, { team: [{ id: 2 }] }])
      });

      actions.removeMember(dispatch, 2,"1233").then(() => {
        td.verify(dispatch(expectedAction), { times: 1 })
        done();
      })
    })

    it('should not call dispatch when status code is not 200 ', (done) => {
      const body = { id: 2 };
      mockAdapter.onPost('/remove', body).reply(() => {
        return Promise.resolve([201])
      }).onGet('/read/1233').reply(() => {
        return Promise.resolve([201, { team: [{ id: 2 }] }])
      });

      const dispatch = td.function('dispatch');
      const expectedAction = {
        type: "SET_TEAM",
        payload: { team: [{ id: 2 }] }
      }

      actions.removeMember(dispatch, 2,"1233").then(() => {
        td.verify(dispatch(expectedAction), { times: 0 })
        done();
      })
    });
  });

  describe('Reset Score', () => {
    it('should dispatch the id of the user when sate code is 200', (done) => {
      const body = { id: 2 };
      mockAdapter.onPost('/reset-score', body).reply(() => {
        return Promise.resolve([200])
      }).onGet('/read/1233').reply(() => {
        return Promise.resolve([200, { team: [{ id: 2 }] }])
      })

      const dispatch = td.function();
      const expectedAction = {
        type: "SET_TEAM",
        payload: { team: [{ id: 2 }] }
      }

      actions.resetScore(dispatch, 2,"1233").then(() => {
        td.verify(dispatch(expectedAction), { times: 1 })
        done();
      })
    });

    it('should not dispatch the id of the user when status code is not 200', (done) => {
      const body = { id: 2 };
      mockAdapter.onPost('/reset-score', body).reply(() => {
        return Promise.resolve([201])
      }).onGet('/read/1233').reply(() => {
        return Promise.resolve([200], { team: [{ id: 2 }] })
      })
      const dispatch = td.function();
      const expectedAction = {
        type: "SET_TEAM",
        payload: { team: [{ id: 2 }] }
      }

      actions.resetScore(dispatch, 2,"1233").then(() => {
        td.verify(dispatch(expectedAction), { times: 0 })
        done();
      })
    });
  })

  describe('Add team', () => {
    it.skip('should add team and dispatch email id when status is 200', (done) => {
      const body = { name: "Ishu", password: "1234", email: "abcd@gmail.com" };
      mockAdapter.onPost('/addUser', body).reply(() => {
        return Promise.resolve([200])
      })
      const dispatch = td.function();
      const expectedAction = {
        type: "LOGIN_TEAM"
      }

      appActions.addUser(dispatch, "Ishu", "abcd@gmail.com", "1234").then(() => {
        td.verify(dispatch(expectedAction), { times: 1 })
        done();
      })
    });

    it.skip('should not dispatch email if the response it not 200', (done) => {
      const body = { name: "Ishu", password: "1234", email: "abcd@gmail.com" };
      mockAdapter.onPost('/addUser', body).reply(() => {
        return Promise.resolve([201])
      })
      const dispatch = td.function();
      const expectedAction = {
        type: "OPEN_TEAM",
        email: "abcd@gmail.com"
      }

      dispatch(appActions.addUser("Ishu", "abcd@gmail.com", "1234"), () => {
        td.verify(dispatch(expectedAction), { times: 0 })
        done();
      })
    });
  });

  describe('toggleLogin', () => {
    it('should return action type toggle login', (done) => {
      const expectedAction = {
        type: "TOGGLE_LOGIN"
      }
      expect(appActions.toggleLogin()).toEqual(expectedAction);
      done()
    });
  });

  describe('login Team', () => {
    it.skip('should dispatch login team action when response is 200', (done) => {
      const expectedAction = {
        type: "LOGIN_TEAM"
      }
      const body = {
        email:"abcd@gmail.com",
        password:"abcd"
      }
      mockAdapter.onPost('/loginUser',body).reply(() => {
        return Promise.resolve([200])
      });
      
      const dispatch = td.function();
      appActions.loginTeam(dispatch,"abcd@gmail.com","abcd").then(() => {
        td.verify(dispatch(expectedAction), { times: 1})
        done();
      }) 
    });

    it.skip('should dispatch invalid credentials action on error response', (done) => {
      const expectedAction = {
        type: "INVALID_CREDENTIALS"
      }
      const body = {
        email: "abcd@gmail.com",
        password: "abcd"
      }

      mockAdapter.onPost('/loginUser', body).reply(() => {
        return Promise.resolve([400])
      });

      const dispatch = td.function();
      appActions.loginTeam(dispatch, "abcd@gmail.com", "abcd").then(() => {
        td.verify(dispatch(expectedAction), { times: 1 })
        done();
      })
    });
  });

  describe('checkLoggedIn', () => {
    it('should dispatch IS_LOGGED_IN action if response is 204', (done) => {
      mockAdapter.onGet("/isLoggedIn").reply(()=>{
        return Promise.resolve([204])
      })
      const dispatch = td.function();
      const expectedAction = {
        type: "IS_LOGGED_IN"
      }
      appActions.checkLoggedIn(dispatch).then(()=>{
        td.verify(dispatch(expectedAction),{times:1})
        done();
      })
    });
  });

  describe('addNewTeam', () => {
    it('should dispatch ADD_NEW_TEAM action if the response is 204', (done) => {
      const body = {
        userId: "abcd@gmail.com",
        teamName: "NewTeam"
      }
      const expectedAction = { type: "TEAM_CREATED", newTeam: "NewTeam" }
      const dispatch = td.function();

      mockAdapter.onPost("/newTeam", body).reply(() => {
        return Promise.resolve([200])
      })

      actions.addNewTeam(dispatch, "abcd@gmail.com", "NewTeam").then(() => {
        td.verify(dispatch(expectedAction), { times: 1 })
        done();
      })
    });
  });

  describe('getTeamOfUser', () => {
    it('should dispatch GET_TEAMS_OF_USER action if the response is 200', (done) => {
      const expectedAction = {
        type: "GET_TEAMS_OF_USER",
        teams: [{ userId: "abcd@gmail.com", teamId: "abcd", role: "ADMIN" }]
      }
      const dispatch = td.function();

      mockAdapter.onGet("/myTeams/abcd@gmail.com").reply(() => {
        return Promise.resolve([200, { allTeamsOfUser: [{userId:"abcd@gmail.com",teamId:"abcd",role: "ADMIN"}] }])
      })

      actions.getTeamsOfUser(dispatch, "abcd@gmail.com").then(() => {
        td.verify(dispatch(expectedAction), { times: 1 })
        done();
      })
    });
  });

  describe('getSearchedTeam', () => {
    it('should dispatch SEARCH_TEAM action if the response is 200', (done) => {
      const expectedAction = {
        type: "SEARCH_TEAM",
        searchedTeam: "Magneto"
      }
      const dispatch = td.function();

      mockAdapter.onGet("/search/Magneto").reply(() => {
        return Promise.resolve([200, {name:"Magneto"}])
      })

      actions.getSearchedTeam(dispatch, "Magneto").then(() => {
        td.verify(dispatch(expectedAction), { times: 1 })
        done();
      })
    });

    it('should dispatch TEAM_DOESNOT_EXIST action if the response is 404', (done) => {
      const expectedAction = {
        type: "TEAM_DOESNOT_EXIST"
      }
      const dispatch = td.function();

      mockAdapter.onGet("/search/Magneto").reply(() => {
        return Promise.resolve([404])
      })

      actions.getSearchedTeam(dispatch, "Magneto").then(() => {
        td.verify(dispatch(expectedAction), { times: 1 })
        done();
      })
    });
  });

  describe('getAccessRequests', () => {
    it('should dispatch GET_ACCESS_REQUESTS action if the response is 200', (done) => {
      const expectedAction = {
        type: "GET_ACCESS_REQUESTS",
        accessRequests: [{ "userId": "ponu@gmail.com", "teamId": "Ishu", "role": "WAITING" }]
      }
      const dispatch = td.function();

      mockAdapter.onGet("/allRequests/abcd@gmail.com").reply(() => {
        return Promise.resolve([200, [{ "userId": "ponu@gmail.com", "teamId": "Ishu", "role": "WAITING" }]])
      })

      actions.getAccessRequests(dispatch, "abcd@gmail.com").then(() => {
        td.verify(dispatch(expectedAction), { times: 1 })
        done();
      })
    });
  })

    it('should dispatch TEAM_DOESNOT_EXIST action if the response is 404', (done) => {
      const expectedAction = {
        type: "TEAM_DOESNOT_EXIST"
      }
      const dispatch = td.function();

      mockAdapter.onGet("/search/Magneto").reply(() => {
        return Promise.resolve([404])
      })

      actions.getSearchedTeam(dispatch, "Magneto").then(() => {
        td.verify(dispatch(expectedAction), { times: 1 })
        done();
      })
    });

  describe('permitAccess',()=>{
    it('should dispatch GET_ACCESS_REQUESTS action if the response is 200', (done) => {
      const expectedAction = {
        type: "GET_ACCESS_REQUESTS",
        accessRequests: []
      }
      const dispatch = td.function();
      const body = {
        userId: "ponu@gmail.com",
        teamName: "Magneto",
        role: "ADMIN",
        requestUser: "abcd@gmail.com"
      }

      mockAdapter.onPost("/permitAccess",body).reply(()=>{
        return Promise.resolve([200])
      }).onGet("/allRequests/ponu@gmail.com").reply(() => {
        return Promise.resolve([200, []])
      })

      actions.permitAccess(dispatch, "ponu@gmail.com","abcd@gmail.com", "Magneto", "ADMIN").then(() => {
        td.verify(dispatch(expectedAction), { times: 1 })
        done();
      })
    });
  })

  describe('requestAccess', () => {
    it('should dispatch REQUEST_SENT action if the response is 200', (done) => {
      const expectedAction = {
        type: "REQUEST_SENT"
      }
      const dispatch = td.function();
      const body = {
        teamName: "Magneto",
        userId: "ponu@gmail.com"
      }

      mockAdapter.onPost("/request", body).reply(() => {
        return Promise.resolve([200])
      })

      actions.requestAccess(dispatch,"ponu@gmail.com", "Magneto").then(() => {
        td.verify(dispatch(expectedAction), { times: 1 })
        done();
      })
    });

    it('should dispatch INVALID_REQUEST action if the response is 400', (done) => {
      const expectedAction = {
        type: "INVALID_REQUEST"
      }
      const dispatch = td.function();
      const body = {
        teamName: "Magneto",
        userId: "ponu@gmail.com"
      }

      mockAdapter.onPost("/request", body).reply(() => {
        return Promise.resolve([400])
      })

      actions.requestAccess(dispatch, "ponu@gmail.com", "Magneto").then(() => {
        td.verify(dispatch(expectedAction), { times: 1 })
        done();
      })
    });
  })
})
