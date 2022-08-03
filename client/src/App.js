
import './App.css';
import { Routes, Route } from "react-router-dom"
import LoginPage from './Pages/Loginpage';
import TodoPage from './Pages/TodoPage';
import SignupPage from './Pages/SignupPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/sign-up" element={<SignupPage />}/>
          <Route path="/todo" element={<TodoPage/>}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
