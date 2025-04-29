import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  Chip,
  LinearProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { getUsers, getCurrentUser } from '../utils/auth';

const AllUsersScoreHistory = ({ darkMode }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [userScores, setUserScores] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const allUsers = getUsers();
      const loggedInUser = getCurrentUser();
      setCurrentUser(loggedInUser);
      
      // Add the current user to the list if they're not in the database (e.g., guest)
      if (loggedInUser && !allUsers.some(user => user.email === loggedInUser.email)) {
        allUsers.push(loggedInUser);
      }
      
      setUsers(allUsers);

      // Get score history for each user
      const scores = {};
      allUsers.forEach(user => {
        const historyKey = `quizHistory_${user.email}`;
        const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
        scores[user.email] = history;
      });
      setUserScores(scores);
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  
  const calculateAverageScore = (quizzes) => {
    if (!quizzes || quizzes.length === 0) return 0;
    const validQuizzes = quizzes.filter(quiz => quiz.totalQuestions && quiz.totalQuestions > 0);
    if (validQuizzes.length === 0) return 0;
    
    const sum = validQuizzes.reduce((total, quiz) => 
      total + (quiz.score / quiz.totalQuestions) * 100, 0);
    return Math.round(sum / validQuizzes.length);
  };
  
  const getScoreColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate(-1)}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            All Users Score History
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {users.map((user) => {
          const isCurrentUser = currentUser && user.email === currentUser.email;
          const averageScore = calculateAverageScore(userScores[user.email]);
          
          return (
            <Paper 
              key={user.email}
              sx={{ 
                mb: 4, 
                p: 3,
                borderRadius: 2,
                background: isCurrentUser 
                  ? (darkMode ? 'rgba(25, 118, 210, 0.1)' : 'rgba(25, 118, 210, 0.05)')
                  : (darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)'),
                border: isCurrentUser ? `1px solid ${theme.palette.primary.main}` : 'none'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  {user.firstName} {user.lastName} {isCurrentUser && "(You)"}
                </Typography>
                <Chip 
                  label={`Avg Score: ${averageScore}%`} 
                  color={getScoreColor(averageScore)}
                  variant="outlined"
                />
              </Box>
              
              <LinearProgress 
                variant="determinate" 
                value={averageScore} 
                color={getScoreColor(averageScore)}
                sx={{ height: 8, borderRadius: 4, mb: 2 }}
              />
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Email: {user.email} | Total Tests: {userScores[user.email]?.length || 0}
              </Typography>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Score</TableCell>
                      <TableCell>Total Questions</TableCell>
                      <TableCell>Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userScores[user.email]?.map((quiz, index) => (
                      <TableRow key={index}>
                        <TableCell>{formatDate(quiz.date)}</TableCell>
                        <TableCell>{quiz.score}</TableCell>
                        <TableCell>{quiz.totalQuestions}</TableCell>
                        <TableCell>
                          {quiz.totalQuestions ? 
                            `${Math.round((quiz.score / quiz.totalQuestions) * 100)}%` :
                            'N/A'}
                        </TableCell>
                      </TableRow>
                    ))}
                    {(!userScores[user.email] || userScores[user.email].length === 0) && (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          No quiz attempts yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          );
        })}
      </Container>
    </Box>
  );
};

export default AllUsersScoreHistory; 