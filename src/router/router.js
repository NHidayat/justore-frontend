import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Main from '../layouts/Main';

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="*" element={<Main />}></Route>
      </Routes>
    </HashRouter>
  );
};

export default Router;
