
import './App.css';
import { Routes, Route } from "react-router-dom"
import { useState } from 'react';
import LoginPage from './Pages/Loginpage';
import TodoPage from './Pages/TodoPage';
import SignupPage from './Pages/SignupPage';



function App() {

  const [isAuthLoading, setIsAuthLoading] = useState('');
  const [showUsername, setShowUsername] = useState('')//show username when logged in

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<LoginPage isAuthLoading={isAuthLoading} 
          setIsAuthLoading={setIsAuthLoading} showUsername={showUsername} setShowUsername={setShowUsername} />}/>
          <Route path="/sign-up" element={<SignupPage isAuthLoading={isAuthLoading} 
          setIsAuthLoading={setIsAuthLoading} />}/>
          <Route path="/todo" element={<TodoPage isAuthLoading={isAuthLoading} 
          setIsAuthLoading={setIsAuthLoading} showUsername={showUsername} setShowUsername={setShowUsername}/>}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
