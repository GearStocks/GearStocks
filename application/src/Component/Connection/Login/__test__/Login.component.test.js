import React from 'react';
import LoginComponent from '../Login.component';
import renderer from 'react-test-renderer';

test('zob', () => {
  const tree = renderer.create(<LoginComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});