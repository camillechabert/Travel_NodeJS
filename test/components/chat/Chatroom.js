import React from "react";
import { render, shallow, mount } from "enzyme";
import assert from "assert";
import Chatroom  from "../../../src/components/chat/Chatroom";
import FetchMock from 'fetch-mock';

// unit tests for the Index component
describe('Chatroom component', () => {

  describe('render()', () => {

    it('should render the component Chatroom', () => {
        const wrapper = render(<Chatroom/>);
        assert.ok(wrapper.find(".chat"));
    });
  });

});
