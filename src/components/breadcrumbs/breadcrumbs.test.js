import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Breadcrumbs from './index.js';

afterEach(cleanup);

const div = document.createElement('div');
const breadcrumbs = [{ title: 'Home Page', slug: '/home' }];

it('renders with an empty trail of breadcrumbs', () => {
  render(<Breadcrumbs breadcrumbs={[]} />, div);
});

it('renders breadcrumb links', () => {
  render(<Breadcrumbs breadcrumbs={breadcrumbs} />, div);

  expect(screen.getByRole('button', { name: breadcrumbs[0].title })).toBeInTheDocument();
});

it('goes back on click', () => {
  const goBack = jest.fn();
  render(<Breadcrumbs breadcrumbs={breadcrumbs} goBack={goBack} />, div);

  userEvent.click(screen.getByText(breadcrumbs[0].title));

  expect(goBack.mock.calls.length).toBe(1);
});
