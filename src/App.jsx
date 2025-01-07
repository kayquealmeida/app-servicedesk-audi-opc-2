import React from 'react';
import './style/styles.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Select from './components/Select/Select';
import Caption from './components/Caption/Caption';

const App = () => {
  return (
    <div className='app'>
      <Header />
      <div className="limitationWidth">
        <main>
          <Select />
        </main>
        <Caption />
      </div>
      <Footer />
    </div>
  );
};

export default App;