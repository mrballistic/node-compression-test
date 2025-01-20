'use client';

import { ThemeProvider, useMediaQuery } from '@mui/material';
import { theme, darkTheme } from '../theme';

export function Providers({ children }: { children: React.ReactNode }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  return (
    <ThemeProvider theme={prefersDarkMode ? darkTheme : theme}>
      {children}
    </ThemeProvider>
  );
}
