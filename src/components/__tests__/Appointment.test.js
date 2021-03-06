import React from 'react';
import { render, act } from '@testing-library/react';

import Application from 'components/Application';

describe('Appointment', () => {

  it('renders without crashing', async () => {
    await act(async () => {
      render(<Application />);
    });
  });

  it("it doesn't call the function", () => {
    const fn = jest.fn();
    expect(fn).toHaveBeenCalledTimes(0);
  });

  it('it calls the function', () => {
    const fn = jest.fn();
    fn();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('calls the function with specific arguments', () => {
    const fn = jest.fn();
    fn(10);
    expect(fn).toHaveBeenCalledWith(10);
  });

  it('uses the mock impletementation', () => {
    const fn = jest.fn((a, b) => 42);
    fn(1, 2);
    expect(fn).toHaveReturnedWith(42);
  });
});
