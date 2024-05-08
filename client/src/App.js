import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Add from './pages/Add';
import View from './pages/View';
import Header from './components/Header';

export default function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <ToastContainer />
        <Routes>
          {/* <Route exact path='/header'  component={Header} /> */}
          <Route exact path='/' element={<Home />} />
          <Route path='/add' element={<Add />} />
          <Route path='/add/:id' element={<Add />} />
          <Route path='/view/:id' element={<View />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
