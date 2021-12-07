import { render, screen } from '@testing-library/react';
import Register from "../components/authentication/Register";
import {MemoryRouter} from "react-router-dom";


test('Check if on correct page', () => {
    render(<Register/>, {wrapper: MemoryRouter});
    const linkElement = screen.getByText(/Register here/i);
    expect(linkElement).toBeInTheDocument();
});
