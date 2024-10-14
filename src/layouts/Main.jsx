import React from 'react';
import AppContent from './AppContent';
import Navbar from './Navbar';

const Main = () => {
  return (
    <>
      <Navbar />
      <div className="mt-10 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <AppContent />
      </div>
    </>
  );
};

export default Main;
