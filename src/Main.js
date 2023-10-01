import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './Pages/Home'
import Settings from './Pages/Settings'

const Main = () => {
  return (
    <Routes> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='./pages/Home.js' component={Home}></Route>
      <Route exact path='./pages/Settings.js' component={Settings}></Route>
    </Routes>
  );
}

export default Main;