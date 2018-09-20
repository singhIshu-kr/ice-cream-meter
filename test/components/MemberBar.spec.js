import React from 'react';
import Enzyme , { shallow } from 'enzyme'
import td from 'testdouble'
import MemberBar from '../../src/components/Team/MemberRow'
import Adapter from 'enzyme-adapter-react-16'


Enzyme.configure({ adapter: new Adapter() })

describe('MemberBar', () => {
  it('should render the details of the Member in the Team', () => {
    const memberInfo = {name:'Ishu',id:1,score:1};
    const handleRemove = td.function();    
    const handleAddScore = td.function();
    const handleDecreaseScore = td.function();
    const memberBar = shallow(<MemberBar increaseScore = {handleAddScore} removeMember = {handleRemove}
    decreaseScore = {handleDecreaseScore} memberInfo = {memberInfo} />);
    const memberScore = memberBar.find('#score');
    const memberName = memberBar.find('#memberName');
    expect(memberScore.length).toBe(1);
    expect(memberName.length).toBe(1);
  })

  it('should call the addScore function onclick the name of the member',()=>{
    const memberInfo = { name: 'Ishu', id: 1, score: 1, teamID: "1233" };    
    const handleAddScore = td.function();

    const memberBar = shallow(<MemberBar increaseScore={handleAddScore} memberInfo = {memberInfo}/>);
    const memberName = memberBar.find('#add');
    memberName.simulate('click');  
    td.verify(handleAddScore(1,"1233"));
  })

  it('should call the decreaseScore function onclick the name of the member', () => {
    const memberInfo = { name: 'Ishu', id: 1, score: 1, teamID: "1233" };
    const handleDecreaseScore = td.function();

    const memberBar = shallow(<MemberBar decreaseScore={handleDecreaseScore} memberInfo={memberInfo} />);
    const memberName = memberBar.find('#decrease');
    memberName.simulate('click');
    td.verify(handleDecreaseScore(1,"1233"));
  })

  it('should call the remove player function onclicking the remove member button', () => {
    const memberInfo = { name: 'Ishu', id: 1, score: 1, teamID: "1233"};
    const handleRemove = td.function();
    const handleAddScore = td.function();
    const memberBar = shallow(<MemberBar increaseScore={handleAddScore} removeMember={handleRemove} memberInfo = {memberInfo}/>);

    const removeButton = memberBar.find('#remove');
    removeButton.simulate('click');
    td.verify(handleRemove(1,"1233"));
  })
})

