import configureStore from 'redux-mock-store';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {spy, stub} from 'sinon';
import Container from '../../src/containers/ScoreUpdater';
import teamActions from "../../src/actions/teamActions";
import HomePageContainer from "../../src/containers/HomeContainer";
import HomePage from "../../src/components/Home/Home";
import userActions from "../../src/actions/userActions";

const addScoreAction = { type : "addScoreMock" };
const decreaseScoreAction = { type : "decreaseScoreMock" };
const resetScoreAction = { type : "resetScoreMock" };
const addMemberAction = { type : "addMemberMock" };
const removeMemberAction = { type : "removeMemberMock" };
const getSavedStateAction = { type : "getSavedStateMock" };

teamActions.addScore = jest.fn(() => (addScoreAction));
teamActions.decreaseScore = jest.fn(() => (decreaseScoreAction));
teamActions.resetScore = jest.fn(() => (resetScoreAction));
teamActions.addMember = jest.fn(() => (addMemberAction));
teamActions.removeMember = jest.fn(() => (removeMemberAction));
teamActions.getSavedState = jest.fn(() => (getSavedStateAction));

Enzyme.configure({ adapter: new Adapter() })

const mockStore = configureStore();
const dispatch = spy();

describe('Score Update Container', () => {
  const store = {
    meterUpdaters: {
      teamInfo: ,
      teamId: state.meterUpdaters.teamId,
      nameInUse: state.meterUpdaters.nameInUse,
      teamName: state.meterUpdaters.teamName,
      userType
      : true,
      isLoggedIn: true,
      hasError: true,
      errorMessage: 'Error Message'
    }
  };
  const mockStore = configureStore()(store);
  const dispatchMock = jest.fn();
  mockStore.dispatch = dispatchMock;
  const wrapper = shallow(<HomePageContainer store={mockStore}/>);
  const component = wrapper.find(HomePage);


  beforeEach(() => {
    dispatchMock.mockClear();
  });

  it('should map state to props', () => {
    const props = component.props();

    expect(props.showLogin).toBe(true);
    expect(props.isLoggedIn).toBe(true);
    expect(props.hasError).toBe(true);
    expect(props.errorMessage).toBe('Error Message');
  });

  describe('map dispatch to props', () => {
    it('should dispatch loginTeam', () => {
      const name = 'name';
      const password = 'password';

      wrapper.prop('loginTeam')(name, password);

      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith(loginTeamAction);
      expect(userActions.loginTeam).toHaveBeenCalledTimes(1);
      expect(userActions.loginTeam).toHaveBeenCalledWith(name, password);
    });

    it('should dispatch addUser with passed props', () => {
      const name = 'abc';
      const email = 'net.com';
      const password = '1234';

      wrapper.prop('addUser')(name, email, password);

      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith(addUserAction);
      expect(userActions.addUser).toHaveBeenCalledTimes(1);
      expect(userActions.addUser).toHaveBeenCalledWith(name, email, password);
    });

    it('should dispatch toggleLogin', () => {
      wrapper.prop('toggleLogin')();

      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith(toggleLoginAction);
      expect(userActions.toggleLogin).toHaveBeenCalledTimes(1);
      expect(userActions.toggleLogin).toHaveBeenCalledWith();
    });

    it('should dispatch checkLoggedIn', () => {
      wrapper.prop('checkLoggedIn')();

      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith(checkLoggedInAction);
      expect(userActions.checkLoggedIn).toHaveBeenCalledTimes(1);
      expect(userActions.checkLoggedIn).toHaveBeenCalledWith();
    });

    it('should dispatch displayError with applied message', () => {
      let errorMessage = 'Error Message';
      wrapper.prop('displayError')(errorMessage);

      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith(displayErrorAction);
      expect(userActions.displayError).toHaveBeenCalledTimes(1);
      expect(userActions.displayError).toHaveBeenCalledWith(errorMessage);
    });
  });
});


describe('Score Update Container', () => {
  let wrapper, store;

  beforeEach(() => {
    store = mockStore({meterUpdaters:{team:[]}})
    store.dispatch = dispatch;
    wrapper = shallow(<Container store={store} />)  
  });

  afterEach(() => {
    store.dispatch = null;
  });

  describe('map State to Props', () => {
    it('should map state and dispatch to props', () => {
      expect(wrapper.props()).toEqual(expect.objectContaining({
        teamInfo:[],
        fetchTeamInfo:expect.any(Function),
        addScore: expect.any(Function),
        decreaseScore: expect.any(Function),
        addMember: expect.any(Function),
        removeMember: expect.any(Function),
        resetScore: expect.any(Function),
      }))
    });
  });

  describe('map Dispatch to props', () => {
    it('should fetch team Info', () => {
      const stubFetchTeamInfo = stub(actions,'getSavedState');
      wrapper.prop('fetchTeamInfo')();
      expect(stubFetchTeamInfo.calledOnce).toBeTruthy();
      expect(stubFetchTeamInfo.calledWith(dispatch)).toBeTruthy();
    });  

    it('should add Score', () => {
      const stubbedAddScore = stub(actions,'addScore');
      wrapper.prop('addScore')(1);
      expect(stubbedAddScore.calledOnce).toBeTruthy();
      expect(stubbedAddScore.calledWith(dispatch,1)).toBeTruthy();
    });

    it('should decrease score', () => {
      const stubDecreaseScore = stub(actions, 'decreaseScore');
      wrapper.prop('decreaseScore')(1);
      expect(stubDecreaseScore.calledOnce).toBeTruthy();
      expect(stubDecreaseScore.calledWith(dispatch,1)).toBeTruthy();
    });

    it('should add member ', () => {
      const stubAddMember = stub(actions, 'addMember');
      wrapper.prop('addMember')("ishu");
      expect(stubAddMember.calledOnce).toBeTruthy();
      expect(stubAddMember.calledWith(dispatch,"ishu")).toBeTruthy();
    });

    it('should remove member', () => {
      const stubRemoveMember = stub(actions, 'removeMember');
      wrapper.prop('removeMember')(1);
      expect(stubRemoveMember.calledOnce).toBeTruthy();
      expect(stubRemoveMember.calledWith(dispatch,1)).toBeTruthy();
    });

    it('should reset score', () => {
      const stubResetScore = stub(actions, 'resetScore');
      wrapper.prop('resetScore')(1);
      expect(stubResetScore.calledOnce).toBeTruthy();
      expect(stubResetScore.calledWith(dispatch,1)).toBeTruthy();
    });
  });
});
