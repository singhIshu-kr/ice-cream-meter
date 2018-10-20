import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import td from 'testdouble';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../../src/components/Home/Home';
import AddUser from '../../src/components/Home/AddUser';
import Login from '../../src/components/Home/LoginUser';

Enzyme.configure({ adapter: new Adapter() })

describe('Home Component', () => {
  it('should render the add team component if showLogin is false', () => {
    const stubaddUser = td.function();
    const checkLoggedIn = td.func();
    const homePage = shallow(<Home addUser={stubaddUser} showLogin={false} checkLoggedIn={checkLoggedIn} />);
    const addUser = homePage.find(AddUser);
    expect(addUser.exists()).toBeTruthy();
    td.verify(checkLoggedIn());
  });

  it('should render login component if showLogin is false', () => {
    const stubaddUser = td.function();
    const checkLoggedIn = td.func();
    const homePage = shallow(<Home addUser={stubaddUser} showLogin={true} checkLoggedIn={checkLoggedIn} />);
    const login = homePage.find(Login);
    expect(login.exists()).toBeTruthy();
  });

  it('should call toggleLogin function onclicking the link on add team component', () => {
    const stubaddUser = td.function();
    const toggleLogin = td.function();
    const checkLoggedIn = td.func();
    const homePage = shallow(<Home addUser={stubaddUser} showLogin={false} toggleLogin={toggleLogin} checkLoggedIn={checkLoggedIn} />)
    const link = homePage.find("#teamLink");
    link.simulate('click');
    td.verify(toggleLogin());
  })

  it('should call toggleLogin function onclicking the link on login component', () => {
    const stubaddUser = td.function();
    const toggleLogin = td.function();
    const checkLoggedIn = td.func();
    const homePage = shallow(<Home addUser={stubaddUser} showLogin={true} toggleLogin={toggleLogin} checkLoggedIn={checkLoggedIn} />)
    const link = homePage.find("#teamLink");
    link.simulate('click');
    td.verify(toggleLogin());
  })
});

