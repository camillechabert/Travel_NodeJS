import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import App from '../../src/components/App';

// unit tests for the App component
describe('App component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const childProps = { dataPropagation: { userSession: false } };
      const wrapper = shallow(<App children={childProps} />);
      assert.equal(wrapper.length, 1);
    });
  });
});
