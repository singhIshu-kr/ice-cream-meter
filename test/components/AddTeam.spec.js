import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import AddMember from '../../src/components/Home/AddTeam'
import td from 'testdouble'
import Adapter from 'enzyme-adapter-react-16'


Enzyme.configure({ adapter: new Adapter() })

describe('Add Team',()=>{
  it('should call add team and password', () => {
    const addTeamAndPassword = td.function();
    const addMember = shallow(<AddMember addTeamAndPassword={addTeamAndPassword} isLoggedIn={false}/>);
    let name = addMember.find('#teamName');
    let password = addMember.find('#password');
    let email = addMember.find('#email');
    let submit = addMember.find('#submit');

    name.simulate('change',{target:{value:"abc"}});
    password.simulate('change', { target: { value: "cba" } });
    email.simulate('change', { target: { value:"abc@gmail.com"}});
    submit.simulate('click');
    td.verify(addTeamAndPassword("abc","abc@gmail.com","cba"));
  });
})
