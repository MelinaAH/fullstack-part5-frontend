import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('renders content', () => {
  const blog = {
    title: 'Test title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 6,
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent('Test title');
  expect(component.container).toHaveTextContent('Test Author');
});