import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../page';

describe('Home Component', () => {
	it('renders the compression form', () => {
		render(<Home />);
		
		expect(screen.getByText('Text Compression Tool')).toBeInTheDocument();
		expect(screen.getByLabelText(/enter text to compress/i)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /compress text/i })).toBeInTheDocument();
	});

	it('disables submit button when input is empty', () => {
		render(<Home />);
		
		const submitButton = screen.getByRole('button', { name: /compress text/i });
		expect(submitButton).toBeDisabled();
	});

	it('enables submit button when input has text', async () => {
		render(<Home />);
		
		const input = screen.getByLabelText(/enter text to compress/i);
		await userEvent.type(input, 'test text');
		
		const submitButton = screen.getByRole('button', { name: /compress text/i });
		expect(submitButton).toBeEnabled();
	});

	it('compresses and decompresses text correctly', async () => {
		render(<Home />);
		
		const testText = 'Hello, World!';
		const input = screen.getByLabelText(/enter text to compress/i);
		await userEvent.type(input, testText);
		
		// Compress
		const compressButton = screen.getByRole('button', { name: /compress text/i });
		fireEvent.click(compressButton);
		
		// Check if compressed output is displayed
		expect(await screen.findByText(/compressed output/i)).toBeInTheDocument();
		
		// Decompress
		const decompressButton = screen.getByRole('button', { name: /decompress text/i });
		fireEvent.click(decompressButton);
		
		// Check if decompressed text matches original
		const decompressedText = await screen.findByText(testText);
		expect(decompressedText).toBeInTheDocument();
	});

	it('handles compression of empty string', async () => {
		render(<Home />);
		
		const input = screen.getByLabelText(/enter text to compress/i);
		const compressButton = screen.getByRole('button', { name: /compress text/i });
		
		await userEvent.clear(input);
		expect(compressButton).toBeDisabled();
	});

	it('handles compression of long text', async () => {
		render(<Home />);
		
		const longText = 'a'.repeat(1000);
		const input = screen.getByLabelText(/enter text to compress/i);
		await userEvent.type(input, longText);
		
		const compressButton = screen.getByRole('button', { name: /compress text/i });
		fireEvent.click(compressButton);
		
		// Check if compressed output is displayed
		expect(await screen.findByText(/compressed output/i)).toBeInTheDocument();
		
		// Decompress and verify
		const decompressButton = screen.getByRole('button', { name: /decompress text/i });
		fireEvent.click(decompressButton);
		
		const decompressedText = await screen.findByText(longText);
		expect(decompressedText).toBeInTheDocument();
	});
});
