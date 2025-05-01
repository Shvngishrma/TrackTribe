import React from 'react';
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 import LandingPage from './components/LandingPage';
 import SignUpLogin from './Components/SignUpLogin';
import HomePage from './Pages/HomePage';

 function App() {
  return (
  <Router>
  <Routes>
  <Route path="/" element={<HomePage/>} />
  <Route path="/auth" element={<SignUpLogin/>} />
  {/* <Route path="/host" element={<HostPartyPage />} />
  <Route path="/join" element={<JoinPartyPage />} /> */}
  </Routes>
  </Router>
  );
 }

 export default App;