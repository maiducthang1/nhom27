import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './components/main/MainPage';
import ErrorPage from './components/other/ErrorPage';
import Register from './components/sign/Register';
import Login from './components/sign/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from './components/main/admin';
import ForgotPass from './components/sign/ForgotPass';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='*' element={<MainPage/>} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/ForgotPass' element={<ForgotPass />} />
        <Route path='/Error' errorElement={<ErrorPage />} /> 
        <Route path='/admin/*' element={<Admin />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
