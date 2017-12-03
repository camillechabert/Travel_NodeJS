import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import App from '../../src/components/App';
import { store } from '../../src/store';
import { Provider } from 'react-redux';

// unit tests for the App component
describe('App component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const wrapper = shallow(
        <Provider store={store}>
          <App children={{ userSession: false }} />
        </Provider>
      );

      assert.equal(wrapper.length, 1);
    });
  });
});
