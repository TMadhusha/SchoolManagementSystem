import {BrowserRouter, Routes,Route,Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import PrincipalDashboard from './pages/PrincipalDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import './App.css'

function App() {
  const role=localStorage.getItem('role');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/admin' element={role === 'admin' ? <AdminDashboard/> : <Navigate to="/" />} />
        <Route path='/principal' element={role === 'principal' ? <PrincipalDashboard/> : <Navigate to="/" />} />
        <Route path='/teacher' element={role === 'teacher' ? <TeacherDashboard/> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
