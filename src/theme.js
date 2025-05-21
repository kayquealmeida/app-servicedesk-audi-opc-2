import { createTheme } from '@mui/material/styles';

const fetchThemeSettings = async () => {
  try {
    const response = await fetch('/api/site-settings');
    const settings = await response.json();
    return createTheme({
      palette: {
        primary: {
          main: settings.primaryColor || '#1976d2',
        },
        secondary: {
          main: settings.secondaryColor || '#dc004e',
        },
      },
    });
  } catch (error) {
    console.error('Error loading theme settings, using defaults:', error);
    return createTheme();
  }
};

export default fetchThemeSettings;