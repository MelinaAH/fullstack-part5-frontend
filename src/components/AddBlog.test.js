import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddBlog from './AddBlog';
import userEvent from '@testing-library/user-event';

test('when the blog is created, the form calls the callback function with the correct data', async () => {
  const user = userEvent.setup();
  const addBlog = jest.fn();

  render(<AddBlog addBlog={addBlog} />);

  const createNewButton = screen.getByText('create a new blog');
  await user.click(createNewButton);

  const titleInput = screen.getByPlaceholderText('title');
  const authorInput = screen.getByPlaceholderText('author');
  const urlInput = screen.getByPlaceholderText('url');
  const createButton = screen.getByText('create');

  await user.type(titleInput, 'testing a form... title input');
  await user.type(authorInput, 'testing a form... author input');
  await user.type(urlInput, 'testing a form... url input');
  await user.click(createButton);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe('testing a form... title input');
  expect(addBlog.mock.calls[0][0].author).toBe('testing a form... author input');
  expect(addBlog.mock.calls[0][0].url).toBe('testing a form... url input');
});