import React from 'react';
import './Footer.css';

const Footer = ({ settings }) => {

  console.log('Settings in Footer:', settings)

  return (
    <footer style={{
      backgroundColor: settings?.footerBgColor || '#000',
      color: settings?.footerTextColor || '#fff'
    }}>
      <p>{settings?.footerText || 'Em caso de dúvida, entre em contato com o Service Desk via e-mail: servicedesk@audi.com.br ou telefone: (11) 4347-3036.'}</p>
    </footer>
  );
};

export default Footer;