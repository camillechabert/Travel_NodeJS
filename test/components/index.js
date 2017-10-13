import React from "react";
import { render } from "enzyme";
import assert from "assert";
import  Index  from "../../src/components/Index";

// unit tests for the Index component
describe('Index component', () => {
  describe('render()', () => {
    it('should render the component Index', () => {
      const wrapper = render(<Index/>);
      assert.ok(wrapper.find(".index-component"));
    });
  });
});
