import { render, screen } from '@testing-library/react';
import App from '../App';

test('Check if / route is the login page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});
