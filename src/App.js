// import route
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {   LandingPage,Error,Dashboard,Register} from './pages'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Profile, AddJob, AllJobs, Stats, SharedLayout} from "../src/pages/dashboard"





function App() {
  return (
    <BrowserRouter>
    <Routes>

      <Route path='/' element={<SharedLayout />} >
         <Route index element={<Stats/>}></Route>
         <Route path='all-jobs' element={<AllJobs/>}></Route>
         <Route path='add-jobs'element={<AddJob/>}></Route>
         <Route path='profile'element={<Profile/>}></Route>

      </Route>
      <Route path='LandingPage' element={<LandingPage />} />
      <Route path='register' element={<Register />} />
      <Route path='*' element={<Error />} />
    </Routes>
    <ToastContainer position='top-center'></ToastContainer>
  </BrowserRouter>
  );
}

export default App;
