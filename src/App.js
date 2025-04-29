import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, CircularProgress, Box } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import QuizPage from './components/QuizPage';
import ScorePage from './components/ScorePage';
import ScoreHistory from './components/ScoreHistory';
import AllUsersScoreHistory from './components/AllUsersScoreHistory';
import UserList from './components/UserList';
import PrivateRoute from './components/PrivateRoute';
import EditProfile from './components/EditProfile';
import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [user, loading] = useAuthState(auth);
  
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="App">
        <Routes>
          <Route path="/signin" element={user ? <Navigate to="/home" /> : <SignIn />} />
          <Route path="/signup" element={user ? <Navigate to="/home" /> : <SignUp />} />
          
          <Route path="/home" element={
            <PrivateRoute>
              <Home darkMode={darkMode} toggleTheme={toggleTheme} />
            </PrivateRoute>
          } />
          
          <Route path="/quiz" element={
            <PrivateRoute>
              <QuizPage darkMode={darkMode} />
            </PrivateRoute>
          } />
          
          <Route path="/score" element={
            <PrivateRoute>
              <ScorePage darkMode={darkMode} />
            </PrivateRoute>
          } />
          
          <Route path="/score-history" element={
            <PrivateRoute>
              <ScoreHistory darkMode={darkMode} />
            </PrivateRoute>
          } />

          <Route path="/edit-profile" element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          } />

          <Route path="/all-users-score-history" element={
            <PrivateRoute>
              <AllUsersScoreHistory darkMode={darkMode} />
            </PrivateRoute>
          } />

          <Route path="/users" element={
            <PrivateRoute>
              <UserList darkMode={darkMode} />
            </PrivateRoute>
          } />
          
          <Route path="/" element={<Navigate to={user ? "/home" : "/signin"} />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App; 