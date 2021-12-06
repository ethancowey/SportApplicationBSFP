import { render, screen } from '@testing-library/react';
import Feed from "../components/dashboard/feed";
import {MemoryRouter} from "react-router-dom";


test('Check if on correct page', () => {
    render(<Feed/>, {wrapper: MemoryRouter});
    const linkElement = screen.getByText(/feed/i);
    expect(linkElement).toBeInTheDocument();
});
