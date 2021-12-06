import { render, screen } from '@testing-library/react';
import Post from '../components/dashboard/makePost'
import {MemoryRouter} from "react-router-dom";


test('Check if on correct page', () => {
    render(<Post/>, {wrapper: MemoryRouter});
    const linkElement = screen.getByText(/Make a post/i);
    expect(linkElement).toBeInTheDocument();
});
