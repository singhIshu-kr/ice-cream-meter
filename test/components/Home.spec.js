import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import td from 'testdouble';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../../src/components/Home/Home';
import AddTeam from '../../src/components/Home/AddTeam';
import Login from '../../src/components/Home/ShowTeam';

Enzyme.configure({ adapter: new Adapter() })

describe('Home Component', () => {
  it('should render the add team component if showLogin is false', () => {
    const stubAddTeam = td.function();
    const homePage = shallow(<Home addTeam={stubAddTeam} showLogin={false}/>);
    const addTeam = homePage.find(AddTeam);
    expect(addTeam.exists()).toBeTruthy();
  });

  it('should render login component if showLogin is false', () => {
    const stubAddTeam = td.function();
    const homePage = shallow(<Home addTeam={stubAddTeam} showLogin={true} />);
    const login = homePage.find(Login);
    expect(login.exists()).toBeTruthy();
  });

  it('should call toggleLogin function onclicking the link on add team component',()=>{
    const stubAddTeam = td.function();
    const toggleLogin = td.function();
    const homePage = shallow(<Home addTeam={stubAddTeam} showLogin={false} toggleLogin={toggleLogin}/>)
    const link = homePage.find("#teamLink");
    link.simulate('click');
    td.verify(toggleLogin());
  })

  it('should call toggleLogin function onclicking the link on login component', () => {
    const stubAddTeam = td.function();
    const toggleLogin = td.function();
    const homePage = shallow(<Home addTeam={stubAddTeam} showLogin={true} toggleLogin={toggleLogin} />)
    const link = homePage.find("#teamLink");
    link.simulate('click');
    td.verify(toggleLogin());
  })
});

