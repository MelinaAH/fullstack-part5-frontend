import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('renders content, the content has a title and author', () => {
  const blog = {
    title: 'Test title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 6,
  };

  const component = render(<Blog blog={blog} />);

  screen.debug();

  expect(component.container).toHaveTextContent('Test title');
  expect(component.container).toHaveTextContent('Test Author');
});

test('clicking the button renders additional content: url, likes, user', async () => {
  const blog = {
    title: 'Test title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 6,
    user: { name: 'testuser' },
  };

  const component = render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);

  expect(component.container).toHaveTextContent('http://testurl.com');
  expect(component.container).toHaveTextContent(6);
  expect(component.container).toHaveTextContent('testuser');
});

test('if like button is pressed twice also updateBlog function is called twice', async () => {
  const blog = {
    title: 'Test title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 6,
    user: { name: 'testuser' },
  };

  const mockHandler = jest.fn();

  render(<Blog blog={blog} updateBlog={mockHandler} />);

  const user = userEvent.setup();
  const viewButton = screen.getByText('view');
  await user.click(viewButton);

  const likeButton = screen.getByText('likes');
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
