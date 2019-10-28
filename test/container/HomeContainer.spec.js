import configureStore from 'redux-mock-store';
import Enzyme, {shallow} from 'enzyme';
import React from 'react';
import HomePageContainer from '../../src/containers/HomeContainer';
import Adapter from 'enzyme-adapter-react-16';
import HomePage from "../../src/components/Home/Home";
import userActions from "../../src/actions/userActions";

const loginTeamAction = {type: 'loginTeamMock'};
const addUserAction = {type: 'addUserMock'};
const toggleLoginAction = {type: 'toggleLoginMock'};
const checkLoggedInAction = {type: 'checkLoggedInMock'};
const displayErrorAction = {type: 'displayErrorMock'};

userActions.loginTeam = jest.fn(() => (loginTeamAction));
userActions.addUser = jest.fn(() => (addUserAction));
userActions.toggleLogin = jest.fn(() => (toggleLoginAction));
userActions.checkLoggedIn = jest.fn(() => (checkLoggedInAction));
userActions.displayError = jest.fn(() => (displayErrorAction));

Enzyme.configure({adapter: new Adapter()});

describe('HomePage Container', () => {
    const store = {
        homePage: {
            showLogin: true,
            isLoggedIn: true,
            hasError: true,
            errorMessage: 'Error Message'
        }
    };
    const mockStore = configureStore()(store);
    const dispatchMock = jest.fn();
    mockStore.dispatch = dispatchMock;
    const wrapper = shallow(<HomePageContainer store={mockStore}/>);
    const component = wrapper.find(HomePage);


    beforeEach(() => {
        dispatchMock.mockClear();
    });

    it('should map state to props', () => {
        const props = component.props();

        expect(props.showLogin).toBe(true);
        expect(props.isLoggedIn).toBe(true);
        expect(props.hasError).toBe(true);
        expect(props.errorMessage).toBe('Error Message');
    });

    describe('map dispatch to props', () => {
        it('should dispatch loginTeam', () => {
            const name = 'name';
            const password = 'password';

            wrapper.prop('loginTeam')(name, password);

            expect(dispatchMock).toHaveBeenCalledTimes(1);
            expect(dispatchMock).toHaveBeenCalledWith(loginTeamAction);
            expect(userActions.loginTeam).toHaveBeenCalledTimes(1);
            expect(userActions.loginTeam).toHaveBeenCalledWith(name, password);
        });

        it('should dispatch addUser with passed props', () => {
            const name = 'abc';
            const email = 'net.com';
            const password = '1234';

            wrapper.prop('addUser')(name, email, password);

            expect(dispatchMock).toHaveBeenCalledTimes(1);
            expect(dispatchMock).toHaveBeenCalledWith(addUserAction);
            expect(userActions.addUser).toHaveBeenCalledTimes(1);
            expect(userActions.addUser).toHaveBeenCalledWith(name, email, password);
        });

        it('should dispatch toggleLogin', () => {
            wrapper.prop('toggleLogin')();

            expect(dispatchMock).toHaveBeenCalledTimes(1);
            expect(dispatchMock).toHaveBeenCalledWith(toggleLoginAction);
            expect(userActions.toggleLogin).toHaveBeenCalledTimes(1);
            expect(userActions.toggleLogin).toHaveBeenCalledWith();
        });

        it('should dispatch checkLoggedIn', () => {
            wrapper.prop('checkLoggedIn')();

            expect(dispatchMock).toHaveBeenCalledTimes(1);
            expect(dispatchMock).toHaveBeenCalledWith(checkLoggedInAction);
            expect(userActions.checkLoggedIn).toHaveBeenCalledTimes(1);
            expect(userActions.checkLoggedIn).toHaveBeenCalledWith();
        });

        it('should dispatch displayError with applied message', () => {
            let errorMessage = 'Error Message';
            wrapper.prop('displayError')(errorMessage);

            expect(dispatchMock).toHaveBeenCalledTimes(1);
            expect(dispatchMock).toHaveBeenCalledWith(displayErrorAction);
            expect(userActions.displayError).toHaveBeenCalledTimes(1);
            expect(userActions.displayError).toHaveBeenCalledWith(errorMessage);
        });
    });
});
