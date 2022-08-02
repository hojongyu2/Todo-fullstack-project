import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom"
import LoginPage from './Pages/Loginpage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route index element={<LoginPage/>}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
