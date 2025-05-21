import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ settings }) => {
  const navigate = useNavigate();
  const isAdmin = true; // Substitua por sua lógica de autenticação

  return (
    <header style={{ backgroundColor: settings?.headerBgColor || '#000' }}>
      <div className="header-content">
        <div className="header-titleImg">
          <a href="/">
            <img
              src={settings?.logoUrl || '/assets/Audi_Rings_Medium_bl-RGB.png'}
              alt="Logo"
              className="logo"
            />
          </a>
          <h1 style={{ color: settings?.headerTextColor || '#fff' }}>
            {settings?.headerTitle || 'App Service Desk'}
          </h1>
        </div>

        {isAdmin && (
          <button
            className="admin-button"
            onClick={() => navigate('/admin')}
            aria-label="Painel Administrativo"
            style={{
              backgroundColor: settings?.secondaryColor || '#cc0000',
              color: '#fff'
            }}
          >
            <div className="admin-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h2V7zm0 8h-2v2h2v-2z" />
              </svg>
            </div>
            Admin
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;