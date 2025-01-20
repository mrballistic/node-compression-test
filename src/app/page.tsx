'use client';

import { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import pako from 'pako';

export default function Home() {
	const [input, setInput] = useState('');
	const [compressed, setCompressed] = useState('');
	const [decompressed, setDecompressed] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		
		try {
			// Convert input string to Uint8Array
			const textEncoder = new TextEncoder();
			const data = textEncoder.encode(input);
			
			// Compress the data using pako with maximum compression
			const compressed = pako.deflateRaw(data, { level: 9 });
			
			// Convert compressed data to base64
			const base64 = btoa(Array.from(compressed).map(byte => String.fromCharCode(byte)).join(''));
			setCompressed(base64);
		} catch (error) {
			console.error('Compression failed:', error);
			setCompressed('Error: Compression failed');
		}
	};

	return (
		<main className="min-h-screen p-8">
			<Paper elevation={3} className="max-w-2xl mx-auto p-6">
				<Typography variant="h4" component="h1" gutterBottom>
					Text Compression Tool
				</Typography>
				
				<form onSubmit={handleSubmit}>
					<Box className="space-y-4">
						<TextField
							fullWidth
							multiline
							rows={4}
							label="Enter text to compress"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							variant="outlined"
						/>
						
						<Button 
							type="submit" 
							variant="contained" 
							color="primary"
							fullWidth
							disabled={!input}
						>
							Compress Text
						</Button>
					</Box>
				</form>

				{compressed && (
					<Box className="mt-6 space-y-4">
						<Typography variant="h6" gutterBottom>
							Compressed Output (Base64):
						</Typography>
						<Paper 
							elevation={1} 
							className="p-4 bg-gray-50 break-all"
						>
							<Typography variant="body2">
								{compressed}
							</Typography>
						</Paper>
						
						<Button
							variant="outlined"
							color="primary"
							fullWidth
							onClick={() => {
								try {
									// Convert base64 to byte array
									const compressedData = Uint8Array.from(
										atob(compressed),
										c => c.charCodeAt(0)
									);
									
									// Decompress the data
									const decompressedData = pako.inflateRaw(compressedData);
									
									// Convert back to string
									const decoder = new TextDecoder();
									const originalText = decoder.decode(decompressedData);
									
									setDecompressed(originalText);
								} catch (error) {
									console.error('Decompression failed:', error);
									setDecompressed('Error: Decompression failed');
								}
							}}
						>
							Decompress Text
						</Button>
						
						{decompressed && (
							<Box>
								<Typography variant="h6" gutterBottom>
									Decompressed Text:
								</Typography>
								<Paper 
									elevation={1} 
									className="p-4 bg-gray-50"
								>
									<Typography variant="body2">
										{decompressed}
									</Typography>
								</Paper>
							</Box>
						)}
					</Box>
				)}
			</Paper>
		</main>
	);
}
