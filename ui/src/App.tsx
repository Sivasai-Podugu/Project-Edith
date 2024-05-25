import { Login } from './components/Login';
import './App.css'
import Chat from './components/chatpage/Chat';
import { Messages } from './components/messagespage/Messages';
import { Registration } from './components/Registration';

import { Navigate, Route, Router, Routes } from 'react-router-dom';
import { Logout } from './components/Logout';
import AuthGuard from './components/authguard/AuthGuard';
import { NotFound } from './components/errors/NotFound';

function App() {
  return (
    <div className="App">
    
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Registration />} />
        <Route element={<AuthGuard/>}>
          <Route path='/chat' element={<Chat />} />
          <Route path='/messages/:id' element={<Messages />} />
          <Route path='/logout' element ={<Logout />}/>
        
          <Route path='*' element={<NotFound/>} />
         

        </Route>
        
        <Route path="*" element={<Navigate to="/login" replace />} />
        
      </Routes>

     
      

  
    </div>
  );
}

export default App;