import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Divider, Grid } from '@mui/material';
import { ChromePicker } from 'react-color';

const ThemeCustomizer = () => {
  const [settings, setSettings] = useState({
    primaryColor: '#000000',
    secondaryColor: '#cc0000',
    headerTitle: 'App Service Desk',
    headerBgColor: '#000000',
    headerTextColor: '#ffffff',
    footerText: 'Em caso de dúvida, entre em contato com o Service Desk...',
    footerBgColor: '#000000',
    footerTextColor: '#ffffff',
    logoUrl: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const response = await fetch('/api/site-settings');
      const data = await response.json();
      if (response.ok) setSettings(data);
    };
    fetchSettings();
  }, []);

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    await fetch('/api/site-settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(settings)
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Personalização do Tema</Typography>
      <Divider sx={{ my: 2 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Cabeçalho</Typography>

          <TextField
            label="Título"
            fullWidth
            value={settings.headerTitle}
            onChange={(e) => handleChange('headerTitle', e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            label="URL do Logo"
            fullWidth
            value={settings.logoUrl}
            onChange={(e) => handleChange('logoUrl', e.target.value)}
            sx={{ mb: 2 }}
          />

          <Typography variant="subtitle2">Cor de Fundo</Typography>
          <ChromePicker
            color={settings.headerBgColor}
            onChangeComplete={(color) => handleChange('headerBgColor', color.hex)}
            sx={{ mb: 2 }}
          />

          <Typography variant="subtitle2">Cor do Texto</Typography>
          <ChromePicker
            color={settings.headerTextColor}
            onChangeComplete={(color) => handleChange('headerTextColor', color.hex)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>Rodapé</Typography>

          <TextField
            label="Texto"
            fullWidth
            multiline
            rows={4}
            value={settings.footerText}
            onChange={(e) => handleChange('footerText', e.target.value)}
            sx={{ mb: 2 }}
          />

          <Typography variant="subtitle2">Cor de Fundo</Typography>
          <ChromePicker
            color={settings.footerBgColor}
            onChangeComplete={(color) => handleChange('footerBgColor', color.hex)}
            sx={{ mb: 2 }}
          />

          <Typography variant="subtitle2">Cor do Texto</Typography>
          <ChromePicker
            color={settings.footerTextColor}
            onChangeComplete={(color) => handleChange('footerTextColor', color.hex)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 2 }}
          >
            Salvar Configurações
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ThemeCustomizer;