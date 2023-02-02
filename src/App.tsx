import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './styles/styles.scss';
import Home from './pages/Home';
import UploadFeed from './pages/UploadFeed';
import FeedDetail from './pages/FeedDetail';
import { APP, FEED } from './constances/routes';
import Error from './pages/Error';
import EditFeed from './pages/EditFeed';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={APP.HOME} element={<Home />}></Route>
        <Route path={FEED.FEED} element={<FeedDetail />}></Route>
        <Route path={FEED.UPLOAD} element={<UploadFeed />}></Route>
        <Route path={FEED.EDIT} element={<EditFeed />}></Route>
        <Route path={APP.SIGNUP} element={<Signup />}></Route>
        <Route path={APP.ERROR} element={<Error />}></Route>
      </Routes>
    </div>
  );
}

export default App;
