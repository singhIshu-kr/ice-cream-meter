import React from 'react';
import td from 'testdouble'
import PartyPending from '../../src/components/Team/PartyPending'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'


Enzyme.configure({ adapter: new Adapter() })

describe('Party Pending', () => {
  let memberInfos;
  beforeEach(() => {
    memberInfos = [{ name: 'Ishu', id: 1, score: 1,teamID:"1233" }, { name: 'Ishu', id: 2, score: 1,teamID:"1234" }]; 
  });
  
  it('should render the details of the Member in the Team', () => {
    const resetScore = td.function();
    const partyPending = shallow(<PartyPending pendingList={memberInfos} resetScore={resetScore} />);   
    const reset = partyPending.find('#resetScore');
    const memberBar = partyPending.find('#memberName');
    expect(memberBar.length).toBe(2);
    expect(reset.length).toBe(2);
  })

  it('should call the reset score function onclicking the reset', () => {
    const resetScore = td.function();
    const partyPending = shallow(<PartyPending pendingList={memberInfos} resetScore={resetScore} />);   
    const reset = partyPending.find('#resetScore').first();
    reset.simulate('click');
    td.verify(resetScore(1,"1233"));
  });
})

