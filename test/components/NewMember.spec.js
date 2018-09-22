import React from 'react'
import Enzyme ,{ mount } from 'enzyme'
import NewMember from '../../src/components/Team/NewMember'
import td from 'testdouble'
import Adapter from 'enzyme-adapter-react-16'


Enzyme.configure({ adapter: new Adapter() })


describe('components', () => {
  describe('NewHeader', () => {
    it('should render name box on the page', () => {
      const handleSubmit = td.function();
      const newMember = mount(<NewMember onSubmit = {handleSubmit} teamId="magneto"/>);
      const name = newMember.find('#name');
      const submit = newMember.find('#submit');
      name.simulate('change',{target: {value: "akriti"}})
      submit.simulate("click")
      td.verify(handleSubmit('akriti',"magneto"))
      expect(name.exists()).toBeTruthy();
      expect(submit.exists()).toBeTruthy();
    })
  })
});
