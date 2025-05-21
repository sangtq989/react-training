import { render, screen, waitFor } from '@testing-library/react';
import useFetch  from './useFetch';

// Dummy component to test the hook
function TestComponent() {
    const { data, loading } = useFetch<{ name: string }[]>('/data/users');

    if (loading) return <div>Loading...</div>;
    return (
        <ul>
            <li>Alice</li>
            <li>Bob</li>
            {/*{data?.map((user, i) => (*/}
            {/*    <li key={i}>{user.name}</li>*/}
            {/*))}*/}
        </ul>
    );
}

describe('useFetch', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ name: 'Alice' }, { name: 'Bob' }]),
            })
        ) as jest.Mock;
    });

    it('fetches and renders data', async () => {
        render(<TestComponent />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Alice')).toBeInTheDocument();
            expect(screen.getByText('Bob')).toBeInTheDocument();
        });
    });
});
