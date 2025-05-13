import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Landing from './components/Landing';
import EmailVerification from './components/EmailVerification';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={
            <div className="container">
              <Register />
            </div>
          } />
          <Route path="/login" element={
            <div className="container">
              <Login />
            </div>
          } />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<EmailVerification />} />
          {/* Add more routes as your application grows */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
