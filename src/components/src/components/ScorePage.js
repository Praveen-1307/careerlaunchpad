import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Avatar,
  Tooltip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { getCurrentUser } from '../utils/auth';

const ScorePage = ({ darkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scoreData, setScoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Get current user
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    
    // If state was passed directly through navigation
    if (location.state) {
      setScoreData(location.state);
      setLoading(false);
      return;
    }
    
    // Otherwise try to get the most recent quiz from user-specific history
    if (currentUser) {
      const userHistoryKey = `quizHistory_${currentUser.email}`;
      const userHistory = JSON.parse(localStorage.getItem(userHistoryKey) || '[]');
      if (userHistory.length > 0) {
        // Get the most recent quiz
        const latestQuiz = userHistory[userHistory.length - 1];
        setScoreData({
          score: latestQuiz.score,
          totalQuestions: latestQuiz.totalQuestions,
          questions: latestQuiz.questions
        });
      }
    }
    setLoading(false);
  }, [location.state]);
  
  // Get user initials for avatar
  const getInitials = () => {
    if (!user) return '';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  // If no score data is available, show a message
  if (!scoreData) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="home"
              onClick={() => navigate('/home')}
              sx={{ mr: 2 }}
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Career Launch Pad - Quiz Results
            </Typography>
            {user && (
              <Tooltip title={`${user.firstName} ${user.lastName}`}>
                <Avatar sx={{ 
                  width: 32, 
                  height: 32, 
                  bgcolor: darkMode ? 'primary.dark' : 'primary.light',
                  color: 'white'
                }}>
                  {getInitials()}
                </Avatar>
              </Tooltip>
            )}
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Alert severity="info" sx={{ mb: 3 }}>
            No quiz results available. Please take a quiz first.
          </Alert>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth
            onClick={() => navigate('/quiz')}
          >
            Take a Quiz
          </Button>
        </Container>
      </Box>
    );
  }
  
  const { score, totalQuestions, questions } = scoreData;
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getGradeColor = (percent) => {
    if (percent >= 80) return 'success.main';
    if (percent >= 60) return 'info.main';
    if (percent >= 40) return 'warning.main';
    return 'error.main';
  };
  
  const getGradeText = (percent) => {
    if (percent >= 80) return 'Excellent';
    if (percent >= 60) return 'Good';
    if (percent >= 40) return 'Average';
    return 'Needs Improvement';
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="home"
            onClick={() => navigate('/home')}
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Career Launch Pad - Quiz Results
          </Typography>
          <IconButton
            color="inherit"
            aria-label="history"
            onClick={() => navigate('/score-history')}
            sx={{ mr: 1 }}
          >
            <AssessmentIcon />
          </IconButton>
          {user && (
            <Tooltip title={`${user.firstName} ${user.lastName}`}>
              <Avatar sx={{ 
                width: 32, 
                height: 32, 
                bgcolor: darkMode ? 'primary.dark' : 'primary.light',
                color: 'white'
              }}>
                {getInitials()}
              </Avatar>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
                  <CircularProgress 
                    variant="determinate" 
                    value={percentage} 
                    size={120} 
                    thickness={5} 
                    sx={{ color: getGradeColor(percentage) }}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h4" component="div" color="text.secondary">
                      {percentage}%
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h5" gutterBottom>
                  Score: {score}/{totalQuestions}
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: getGradeColor(percentage),
                    fontWeight: 'bold'
                  }}
                >
                  {getGradeText(percentage)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Summary
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1">
                  You answered {score} out of {totalQuestions} questions correctly.
                </Typography>
              </Box>
              
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                sx={{ mb: 2 }}
                onClick={() => navigate('/quiz')}
              >
                Take Another Quiz
              </Button>
              
              <Button 
                variant="outlined" 
                fullWidth
                onClick={() => navigate('/score-history')}
              >
                View Score History
              </Button>
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Question Details
              </Typography>
              <List>
                {questions && questions.map((q, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Box sx={{ mr: 1 }}>
                              {q.correct ? (
                                <CheckCircleIcon color="success" />
                              ) : (
                                <CancelIcon color="error" />
                              )}
                            </Box>
                            <Typography>
                              {index + 1}. {q.question}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 1, ml: 4 }}>
                            <Typography variant="body2">
                              Your answer: {q.userAnswer}
                            </Typography>
                            {!q.correct && (
                              <Typography variant="body2" color="success.main">
                                Correct answer: {q.correctAnswer}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < questions.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ScorePage; 