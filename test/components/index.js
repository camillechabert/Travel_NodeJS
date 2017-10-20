import React from "react";
import { render, shallow } from "enzyme";
import assert from "assert";
import  Index  from "../../src/components/Index";
import XHR from '../../src/helpers/XHRClient';
import FetchMock from 'fetch-mock';

// unit tests for the Index component
describe('Index component', () => {

  describe('render()', () => {

    afterEach(() => {
      FetchMock.restore();
    });

    it('should render the component Index', () => {
      const wrapper = render( <Index/> );
      assert.ok(wrapper.find(".index"));
    });

    it('should return valid data from Api', async () => {
      const returnedValue = { response: 'Alright, everything is clear!' };

      FetchMock.mock('/dummy_url', { 
        body: returnedValue,
        status: 200
      }, { method: 'GET' });

      const resp = await XHR.get('/dummy_url');

      assert.deepEqual(resp, returnedValue);
    });

  });

});
