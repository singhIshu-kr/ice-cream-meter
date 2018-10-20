import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import AddMember from '../../src/components/Home/addUser'
import td from 'testdouble'
import Adapter from 'enzyme-adapter-react-16'


Enzyme.configure({ adapter: new Adapter() })

describe('Add Team',()=>{
  it('should call add team and password', () => {
    const addUserAndPassword = td.function();
    const addMember = shallow(<AddMember addUserAndPassword={addUserAndPassword} isLoggedIn={false}/>);
    let name = addMember.find('#userName');
    let password = addMember.find('#password');
    let email = addMember.find('#email');
    let submit = addMember.find('#submit');

    name.simulate('change',{target:{value:"abc"}});
    password.simulate('change', { target: { value: "cba" } });
    email.simulate('change', { target: { value:"abc@gmail.com"}});
    submit.simulate('click');
    td.verify(addUserAndPassword("abc","abc@gmail.com","cba"));
  });
})
