import { render, screen } from '@testing-library/react';
import Login from "../components/authentication/Login";
import {MemoryRouter} from "react-router-dom";

test('Check if / route is the login page', () => {
  render(<Login />, {wrapper: MemoryRouter});
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});