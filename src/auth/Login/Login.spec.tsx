import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';

const renderWithRouter = (ui: any) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Login Component', () => {
    test('renders logo and heading', () => {
        renderWithRouter(<Login />);
        expect(screen.getByAltText('Simple KYC Logo')).toBeInTheDocument();
        expect(screen.getByText(/Simple KYC Authentication/i)).toBeInTheDocument();
        expect(screen.getByText(/Sign in to platform/i)).toBeInTheDocument();
    });

    test('renders email and password inputs', () => {
        renderWithRouter(<Login />);
        expect(screen.getByLabelText(/Your email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Your password/i)).toBeInTheDocument();
    });

    test('renders remember me checkbox', () => {
        renderWithRouter(<Login />);
        expect(screen.getByLabelText(/Remember me/i)).toBeInTheDocument();
    });

    test('renders login button', () => {
        renderWithRouter(<Login />);
        expect(screen.getByRole('button', { name: /Login to your account/i })).toBeInTheDocument();
    });

    test('renders Lost Password and Sign-up links', () => {
        renderWithRouter(<Login />);
        expect(screen.getByText(/Lost Password\?/i)).toBeInTheDocument();
        expect(screen.getByText(/Sign-up/i)).toBeInTheDocument();
    });
});
