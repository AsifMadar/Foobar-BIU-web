import { render, screen } from '@testing-library/react'
import App from './App'

test('Displays the login page when disconnected', () => {
    render(<App />)
    expect(screen.getByText(/Sign-In/i)).toBeInTheDocument()
})
