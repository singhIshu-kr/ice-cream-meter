import td from 'testdouble'
import { axiosInstance as axios } from '../../src/axios-wrapper/axios.config';
import MockAdapter from 'axios-mock-adapter'
import * as actions from '../../src/actions/index'

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
    it('should add team and dispatch email id when status is 200', (done) => {
      const body = { name: "Ishu", password: "1234", email: "abcd@gmail.com" };
      mockAdapter.onPost('/addTeam', body).reply(() => {
        return Promise.resolve([200])
      })
      const dispatch = td.function();
      const expectedAction = {
        type: "LOGIN_TEAM"
      }

      actions.addTeam(dispatch, "Ishu", "abcd@gmail.com", "1234").then(() => {
        td.verify(dispatch(expectedAction), { times: 1 })
        done();
      })
    });

    it('should not dispatch email if the response it not 200', (done) => {
      const body = { name: "Ishu", password: "1234", email: "abcd@gmail.com" };
      mockAdapter.onPost('/addTeam', body).reply(() => {
        return Promise.resolve([201])
      })
      const dispatch = td.function();
      const expectedAction = {
        type: "OPEN_TEAM",
        email: "abcd@gmail.com"
      }

      actions.addTeam(dispatch, "Ishu", "abcd@gmail.com", "1234").then(() => {
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
      expect(actions.toggleLogin()).toEqual(expectedAction);
      done()
    });
  });
})
