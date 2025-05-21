import { createTheme } from '@mui/material/styles';

export const getDynamicTheme = (settings) => {
  return createTheme({
    palette: {
      primary: { main: settings?.primaryColor || '#000000' },
      secondary: { main: settings?.secondaryColor || '#cc0000' },
      background: {
        default: '#f9f9f9',
        paper: '#ffffff'
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            '&:hover': {
              backgroundColor: settings?.primaryColor ? `${settings.primaryColor}CC` : '#000000CC'
            }
          }
        }
      }
    },
    customSettings: {
      header: {
        title: settings?.headerTitle || 'App Service Desk',
        logo: settings?.logoUrl || '/assets/Audi_Rings_Medium_bl-RGB.png',
        backgroundColor: settings?.headerBgColor || '#000000',
        textColor: settings?.headerTextColor || '#ffffff'
      },
      footer: {
        text: settings?.footerText || 'Em caso de dúvida, entre em contato com o Service Desk via e-mail: servicedesk@audi.com.br ou telefone: (11) 4347-3036.',
        backgroundColor: settings?.footerBgColor || '#000000',
        textColor: settings?.footerTextColor || '#ffffff'
      }
    }
  });
};

export const applyGlobalStyles = (settings) => {
  const style = document.documentElement.style;
  style.setProperty('--primary-color', settings?.primaryColor || '#000000');
  style.setProperty('--secondary-color', settings?.secondaryColor || '#cc0000');
  style.setProperty('--header-bg-color', settings?.headerBgColor || '#000000');
  style.setProperty('--header-text-color', settings?.headerTextColor || '#ffffff');
  style.setProperty('--footer-bg-color', settings?.footerBgColor || '#000000');
  style.setProperty('--footer-text-color', settings?.footerTextColor || '#ffffff');
};