import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from '../router/routes';
import PropTypes from 'prop-types';

const AppContent = ({ data }) => {
  const defaultData = data || routes;
  return (
    <Routes>
      {defaultData.map((data, i) => (
        <Route key={i} path={data.path} element={data.element} />
      ))}
    </Routes>
  );
};

AppContent.propTypes = {
  data: PropTypes.object
};

export default AppContent;
