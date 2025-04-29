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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../utils/auth';

const AllUsersScoreHistory = ({ darkMode }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [userScores, setUserScores] = useState({});

  useEffect(() => {
    const fetchData = () => {
      const allUsers = getUsers();
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
        {users.map((user) => (
          <Paper 
            key={user.email}
            sx={{ 
              mb: 4, 
              p: 3,
              borderRadius: 2,
              background: darkMode 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(255, 255, 255, 0.8)',
            }}
          >
            <Typography variant="h6" gutterBottom>
              {user.firstName} {user.lastName} ({user.email})
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
                        {Math.round((quiz.score / quiz.totalQuestions) * 100)}%
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
        ))}
      </Container>
    </Box>
  );
};

export default AllUsersScoreHistory; 