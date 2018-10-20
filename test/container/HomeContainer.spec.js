import configureStore from 'redux-mock-store';
import Enzyme, {shallow} from 'enzyme';
import {spy, stub} from 'sinon';
import React from 'react';
import HomePageContainer from '../../src/containers/Home';
import Adapter from 'enzyme-adapter-react-16';
import * as actions from '../../src/actions/index';

Enzyme.configure({ adapter: new Adapter() })
const mockStore = configureStore();
const dispatch = spy();

describe('HomePage Container', () => {
  let wrapper,store;
  beforeEach(() => {
    store = mockStore({
      homePage: {
        email: "abcd"
      }
    })
    store.dispatch = dispatch;
    wrapper = shallow(<HomePageContainer store = {store}/>);
  });

  afterEach(() => {
    store.dispatch = null;
  });

  describe('map state to props', () => {
    it('should map dispatch to props', () => {
        expect(wrapper.props()).toEqual(expect.objectContaining({
        addUser: expect.any(Function)
      }))    
    });
  });

  describe('map dispatch to props', () => {
    it('should call addUser of actions with dispatch and team info', () => {
      const stubaddUser = stub(actions,'addUser');
      wrapper.prop('addUser')("abc","net.com","1234");
      expect(stubaddUser.calledOnce).toBeTruthy();
      expect(stubaddUser.calledWith(dispatch,"abc", "net.com", "1234")).toBeTruthy();
    });

    it('should dispatch the return value of toggleLogin in action', () => {
      wrapper.prop('toggleLogin')();
      expect(dispatch.calledOnce).toBeTruthy();
      expect(dispatch.calledWith({type:"TOGGLE_LOGIN"})).toBeTruthy();
    });
  });
});
