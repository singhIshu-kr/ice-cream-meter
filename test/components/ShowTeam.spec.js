import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Login from '../../src/components/Home/ShowTeam'
import td from 'testdouble'
import Adapter from 'enzyme-adapter-react-16'


Enzyme.configure({ adapter: new Adapter() })

describe('Login', () => {
  it('should call add team and password', () => {
    const loginTeam = td.function();
    const addMember = shallow(<Login loginTeam={loginTeam} isLoggedIn={false} invalidCredentials={false}/>);
    let name = addMember.find('#teamName');
    let password = addMember.find('#password');
    let submit = addMember.find('#submit');

    name.simulate('change', { target: { value: "abc@gmail.com" } });
    password.simulate('change', { target: { value: "abc" } });
    submit.simulate('click');
    td.verify(loginTeam("abc@gmail.com","abc"));
  });
})
