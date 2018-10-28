import React from 'react';
import Enzyme , {shallow} from 'enzyme'
import td from 'testdouble'
import MemberBar from '../../src/components/Team/MemberRow'
import TeamBar from '../../src/components/Team/TeamBar'
import NewMember from '../../src/components/Team/NewMember'
import Adapter from 'enzyme-adapter-react-16'


Enzyme.configure({ adapter: new Adapter() })


describe('TeamBar',()=>{

  it('should call funtion in ComponentDidMount', (done) => {
    const teamInfo = [{ name: "ishu", id: 1, teamId : "1233", score: 0 }];
    const fetchTeamInfo = td.function();
    const location={ state:{teamId:"1233"}};
    const teambar = shallow(<TeamBar teamInfo={teamInfo} fetchTeamInfo={fetchTeamInfo} location={location} email="1233"/>);

    teambar.instance().componentDidMount();
    td.verify(fetchTeamInfo("1233"));
    done();
  })

  it('should contain MemberBar for displaying score of all the members',(done)=>{
    const teamInfo = [{ name: "ishu", id: 1, score: 0 }];
    const removeMember = td.function();
    const addScore = td.function();
    const fetchTeamInfo = td.function();
    const location = { state: { teamId: "1233" } };
    const teambar = shallow(<TeamBar teamInfo={teamInfo} removeMember={removeMember} addScore={addScore} fetchTeamInfo={fetchTeamInfo} location={location} email="1233" teamId="1234"/>);

    teambar.instance().componentDidMount();
    const memberBar = teambar.find(MemberBar);
    expect(memberBar.exists()).toBeTruthy();
    expect(memberBar.props().increaseScore) .toEqual(addScore);
    expect(memberBar.props().memberInfo.id).toEqual(1);
    done();
  })

  it('should contain the NewMember Component to include NewMember in the team',()=>{
    const teamInfo = [{ name: "ishu", id: 1, score: 0 }];
    const addMember = td.function();
    const fetchTeamInfo = td.function();
    const location = { state: { teamId: "12344" } };
    const teambar = shallow(<TeamBar teamInfo={teamInfo} addMember={addMember} fetchTeamInfo={fetchTeamInfo} location={location} email="1233"/>);
    const newMember = teambar.find(NewMember);
    expect(newMember.exists()).toBeTruthy();
    expect(newMember.props().onSubmit).toEqual(addMember); 
  })

  it('should not contain MemberBar if team has no member', () => {
    const teamInfo = [];
    const removeMember = td.function();
    const addScore = td.function();
    const fetchTeamInfo = td.function();
    const location = { state: { teamId: "12344" } };
    const teambar = shallow(<TeamBar teamInfo={teamInfo} removeMember={removeMember} addScore={addScore}
      fetchTeamInfo={fetchTeamInfo} location={location} email="1233"/>);
    const memberBar = teambar.find(MemberBar);
    const newMember = teambar.find(NewMember);
    expect(memberBar.exists()).toBeFalsy();
    expect(newMember.exists()).toBeTruthy();    
  })

})

