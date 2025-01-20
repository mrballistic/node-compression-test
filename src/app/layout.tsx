'use client';

import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider, useMediaQuery } from '@mui/material';
import { theme, darkTheme } from '../theme';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata moved to a separate file since 'use client' components can't export metadata
function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider theme={prefersDarkMode ? darkTheme : theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
