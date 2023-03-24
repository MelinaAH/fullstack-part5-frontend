import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tobblable from './Togglable';

describe('<Togglable />', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Tobblable buttonLabel='view'>
        <div className='testDiv'>
          togglable content
        </div>
      </Tobblable>
    );
  });

  test('renders its children', () => {
    expect(component.container).toHaveTextContent('togglable content');
  });

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    const div = component.container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none');
  });

  test('toggled content can be closed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    const closeButton = screen.getByText('cancel');
    await user.click(closeButton);

    const div = component.container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });
});