import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { getDynamicTheme, applyGlobalStyles } from './theme/ThemeManager';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Select from './components/Select/Select';
import Caption from './components/Caption/Caption';
import AdmView from './components/AdmView/AdmView';
import './style/styles.css';

const App = () => {
  const [theme, setTheme] = useState(getDynamicTheme());
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/site-settings');
        const data = await response.json();
        setSettings(data);
        setTheme(getDynamicTheme(data));
        applyGlobalStyles(data);
      } catch (error) {
        console.error('Error loading theme settings:', error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className='app'>
          <Header settings={settings} />
          <div className="limitationWidth">
            <main>
              <Routes>
                <Route path="/" element={
                  <>
                    <Select />
                    <Caption />
                  </>
                } />
                <Route path="/admin/*" element={<AdmView />} />
              </Routes>
            </main>
          </div>
          <Footer settings={settings} />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;