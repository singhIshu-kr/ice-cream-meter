import configureStore from 'redux-mock-store';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {spy, stub} from 'sinon';
import Container from '../../src/containers/ScoreUpdater';
import * as actions from '../../src/actions/index';

Enzyme.configure({ adapter: new Adapter() })

const mockStore = configureStore();
const dispatch = spy();

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
