import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Grid,
  Paper,
  Divider,
  CircularProgress
} from '@mui/material';
import { ColorPicker } from '@mui/x-color-picker';

const SiteCustomization = () => {
  const [settings, setSettings] = useState({
    primaryColor: '#1976d2',
    secondaryColor: '#dc004e',
    headerTitle: 'Meu Site',
    footerText: '© 2023 Todos os direitos reservados',
    logoUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/site-settings');
        const data = await response.json();
        if (response.ok) {
          setSettings({
            primaryColor: data.primaryColor || '#1976d2',
            secondaryColor: data.secondaryColor || '#dc004e',
            headerTitle: data.headerTitle || 'Meu Site',
            footerText: data.footerText || '© 2023 Todos os direitos reservados',
            logoUrl: data.logoUrl || ''
          });
        }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (name) => (newValue) => {
    setSettings(prev => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(settings)
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar configurações');
      }
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Personalização do Site
      </Typography>
      <Divider sx={{ my: 2 }} />

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Cores
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography>Cor Primária</Typography>
              <ColorPicker
                value={settings.primaryColor}
                onChange={handleColorChange('primaryColor')}
                format="hex"
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography>Cor Secundária</Typography>
              <ColorPicker
                value={settings.secondaryColor}
                onChange={handleColorChange('secondaryColor')}
                format="hex"
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Conteúdo
            </Typography>

            <TextField
              label="Título do Cabeçalho"
              name="headerTitle"
              value={settings.headerTitle}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Texto do Rodapé"
              name="footerText"
              value={settings.footerText}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={2}
            />

            <TextField
              label="URL do Logo"
              name="logoUrl"
              value={settings.logoUrl}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start">http://</InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={saving}
            >
              {saving ? <CircularProgress size={24} /> : 'Salvar Configurações'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default SiteCustomization;