import React from 'react';
import Header from './Header';
import MainSection from './MainSection';
import Footer from './Footer';

const Homepage = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <MainSection />
      <Footer />
    </div>
  );
};

export default Homepage;
