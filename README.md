# Text Compression Tool

A Next.js application that provides a simple interface for compressing text using zlib compression (via pako).

## Features

- Clean, responsive UI built with Material-UI components
- Text input field supporting multiline content
- Real-time text compression using zlib algorithm
- Base64 encoded output display
- Error handling for compression failures

## Technologies Used

- Next.js 15.1 with TypeScript
- Material-UI (MUI) for components
- Pako for zlib compression
- Tailwind CSS for styling
- Jest and React Testing Library for testing

## Getting Started

1. Navigate to the app directory:
   ```bash
   cd app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to use the application.

## How to Use

1. Enter any text in the input field
2. Click the "Compress Text" button to see the compressed output in base64 format
3. Click "Decompress Text" to verify the compression by seeing the original text restored

## Implementation Details

The application uses the pako library, which is a pure JavaScript port of zlib, to compress the input text. The implementation uses:

- `deflateRaw` method to remove zlib headers for smaller output
- Maximum compression level (9) for best compression ratio
- Base64 encoding for the final output

These optimizations ensure the smallest possible compressed output while maintaining browser compatibility and not requiring server-side processing.

## Testing

The application includes a comprehensive test suite using Jest and React Testing Library. Tests cover:

- Component rendering
- Form interactions
- Compression functionality
- Decompression functionality
- Error handling
- Edge cases (empty input, long text)

To run the tests:
```bash
npm test           # Run tests once
npm test:watch    # Run tests in watch mode
```

## Compression Details

The compression/decompression process:
1. Compression:
   - Converts input text to a Uint8Array using TextEncoder
   - Applies raw deflate compression with level 9 (maximum compression)
   - Converts the compressed bytes to base64 for display

2. Decompression:
   - Converts base64 back to a byte array
   - Uses pako's inflateRaw to decompress the data
   - Decodes the resulting bytes back to text using TextDecoder

The use of `deflateRaw` instead of regular `deflate` removes the zlib header and checksum, resulting in slightly smaller output, while the maximum compression level ensures the best possible compression ratio at the cost of slightly more processing time.
