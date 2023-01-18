import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './styles/styles.scss';
import Home from './pages/Home';
import UploadFeed from './pages/UploadFeed';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/upload" element={<UploadFeed />}></Route>
      </Routes>
    </div>
  );
}

export default App;
