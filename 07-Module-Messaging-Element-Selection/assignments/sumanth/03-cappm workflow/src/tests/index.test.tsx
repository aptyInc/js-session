import React from 'react';
import { render, screen } from '@testing-library/react';
import TestComponent from '../popup/test.component';

test('checking component tests', () => {
    render(<TestComponent />);
    const lol = screen.getByTestId('custom-element');
    expect(lol.textContent).toEqual('Hello');
});
