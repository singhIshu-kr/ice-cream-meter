import configureStore from 'redux-mock-store';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {spy, stub} from 'sinon';
import ScoreUpdater from '../../src/containers/ScoreUpdater';
import teamActions from "../../src/actions/teamActions";
import TeamPage from "../../src/components/Team/TeamBar";

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
teamActions.fetchTeamInfo = jest.fn(() => (getSavedStateAction));

Enzyme.configure({ adapter: new Adapter() })

describe('Score Update Container', () => {
  const store = {
    meterUpdaters: {
      teamInfo: [],
      teamId: "1234",
      nameInUse: "Magneto",
      teamName: "WonderWoman",
      userType: "ADMIN"
    }
  };

  const mockStore = configureStore()(store);
  const dispatchMock = jest.fn();
  mockStore.dispatch = dispatchMock;
  const wrapper = shallow(<ScoreUpdater store={mockStore}/>);
  const component = wrapper.find(TeamPage);

  beforeEach(() => {
    dispatchMock.mockClear();
  });

  it('should map state to props', () => {
    const props = component.props();
    console.log(props);
    expect(props.teamInfo).toEqual([]);
    expect(props.teamId).toBe("1234");
    expect(props.nameInUse).toBe("Magneto");
    expect(props.teamName).toBe("WonderWoman");
    expect(props.userType).toBe("ADMIN");
  });

  describe('map dispatch to props', () => {

    it('should dispatch addScore', () => {
      const id = '1234';
      const teamId = 't123';

      wrapper.prop('addScore')(id, teamId);

      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith(addScoreAction);
      expect(teamActions.addScore).toHaveBeenCalledTimes(1);
      expect(teamActions.addScore).toHaveBeenCalledWith(id, teamId);
    });

    it('should dispatch decreaseScore', () => {
      const id = '1234';
      const teamId = 't123';

      wrapper.prop('decreaseScore')(id, teamId);

      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith(decreaseScoreAction);
      expect(teamActions.decreaseScore).toHaveBeenCalledTimes(1);
      expect(teamActions.decreaseScore).toHaveBeenCalledWith(id, teamId);
    });

    it('should dispatch addMember', () => {
      const name = 'salman';
      const teamId = 't123';

      wrapper.prop('addMember')(name, teamId);

      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith(addMemberAction);
      expect(teamActions.addMember).toHaveBeenCalledTimes(1);
      expect(teamActions.addMember).toHaveBeenCalledWith(name, teamId);
    });

    it('should dispatch removeMember', () => {
      const id = '1234';
      const teamId = 't123';

      wrapper.prop('removeMember')(id, teamId);

      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith(removeMemberAction);
      expect(teamActions.removeMember).toHaveBeenCalledTimes(1);
      expect(teamActions.removeMember).toHaveBeenCalledWith(id, teamId);
    });

    it('should dispatch resetScore', () => {
      const id = '1234';
      const teamId = 't123';

      wrapper.prop('resetScore')(id, teamId);

      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith(resetScoreAction);
      expect(teamActions.resetScore).toHaveBeenCalledTimes(1);
      expect(teamActions.resetScore).toHaveBeenCalledWith(id, teamId);
    });

    it('should dispatch getSavedState', () => {
      const id = '1234';

      wrapper.prop('fetchTeamInfo')(id);

      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith(getSavedStateAction);
      expect(teamActions.fetchTeamInfo).toHaveBeenCalledTimes(1);
      expect(teamActions.fetchTeamInfo).toHaveBeenCalledWith(id);
    });
  });
});