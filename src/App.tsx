import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './styles/styles.scss';
import Home from './pages/Home';
import UploadFeed from './pages/UploadFeed';
import FeedDetail from './pages/FeedDetail';
import { APP, FEED } from './constances/routes';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={APP.HOME} element={<Home />}></Route>
        <Route path={FEED.FEED} element={<FeedDetail />}></Route>
        <Route path={FEED.UPLOAD} element={<UploadFeed />}></Route>
      </Routes>
    </div>
  );
}

export default App;
