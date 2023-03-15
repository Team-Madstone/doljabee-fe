import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './styles/config/reset.scss';
import Home from './pages/Home';
import UploadFeed from './pages/UploadFeed';
import FeedDetail from './pages/FeedDetail';
import { APP, FEED } from './constances/routes';
import EditFeed from './pages/EditFeed';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import Notice from './pages/Notice';
import MyProfile from './pages/MyProfile';
import ChangePassword from './pages/ChangePassword';
import ChangeUsername from './pages/ChangeUsername';
import ForgotPassword from './pages/ForgotPassword';
import ForgotPasswordNotice from './pages/ForgotPasswordNotice';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={APP.HOME} element={<Home />}></Route>
        <Route path={FEED.FEED} element={<FeedDetail />}></Route>
        <Route path={FEED.UPLOAD} element={<UploadFeed />}></Route>
        <Route path={FEED.EDIT} element={<EditFeed />}></Route>
        <Route path={APP.SIGNUP} element={<Signup />}></Route>
        <Route path={APP.NOTICE} element={<Notice />}></Route>
        <Route path={APP.AUTH} element={<Auth />}></Route>
        <Route path={APP.LOGIN} element={<Login />}></Route>
        <Route path={APP.MYPROFILE} element={<MyProfile />}></Route>
        <Route path={APP.CHANGEPASSWORD} element={<ChangePassword />}></Route>
        <Route path={APP.CHANGEUSERNAME} element={<ChangeUsername />}></Route>
        <Route path={APP.FORGOTPASSWORD} element={<ForgotPassword />}></Route>
        <Route
          path={APP.FORGOTPASSWORDNOTICE}
          element={<ForgotPasswordNotice />}
        ></Route>
        <Route path={APP.RESETPASSWORD} element={<ResetPassword />}></Route>
        <Route path={'*'} element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
