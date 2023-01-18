import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
