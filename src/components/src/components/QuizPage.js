import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Paper,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  CircularProgress,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
  Avatar,
  Tooltip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { getRandomQuestions } from '../data/questionBank';
import { getCurrentUser } from '../utils/auth';

const QuizPage = ({ darkMode }) => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [skippedQuestions, setSkippedQuestions] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  
  useEffect(() => {
    // Get current user
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      // Load random questions for this user
      setQuestions(getRandomQuestions(30, currentUser));
    } else {
      setQuestions([]);
    }
    setLoading(false);
  }, []);
  
  // Get user initials for avatar
  const getInitials = () => {
    if (!user) return '';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  };
  
  // Memoize handleSubmit to avoid dependency warning
  const handleSubmit = useCallback(() => {
    // Calculate score
    let score = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });
    
    // Store score and questions in localStorage
    const quizResult = {
      date: new Date().toISOString(),
      score,
      totalQuestions: questions.length,
      questions: questions.map((q, index) => ({
        question: q.question,
        correctAnswer: q.correctAnswer,
        userAnswer: answers[index] || 'No answer',
        correct: answers[index] === q.correctAnswer
      }))
    };
    
    // Get current user and store history per user
    const currentUser = getCurrentUser();
    if (currentUser) {
      // Create a unique key for this user's quiz history
      const userHistoryKey = `quizHistory_${currentUser.email}`;
      
      // Get existing history for this user or create a new array
      const userHistory = JSON.parse(localStorage.getItem(userHistoryKey) || '[]');
      userHistory.push(quizResult);
      
      // Save back to localStorage with the user-specific key
      localStorage.setItem(userHistoryKey, JSON.stringify(userHistory));
      
      // Also maintain the global history for backward compatibility
      const globalHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]');
      globalHistory.push(quizResult);
      localStorage.setItem('quizHistory', JSON.stringify(globalHistory));
    }
    
    // Navigate to score page
    navigate('/score', { state: { score, totalQuestions: questions.length, questions: quizResult.questions } });
  }, [questions, answers, navigate]);
  
  const handleAnswerChange = (e) => {
    setAnswers({
      ...answers,
      [currentQuestion]: e.target.value
    });
    setAnsweredQuestions(prev => new Set([...prev, currentQuestion]));
  };
  
  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const goToPrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  // Calculate progress percentage
  const calculateProgress = () => {
    const answeredCount = Object.keys(answers).length;
    const progressValue = (answeredCount / questions.length) * 100;
    
    // If all questions are answered, return 100% regardless of current question
    if (answeredCount >= questions.length) {
      return 100;
    }
    
    return progressValue;
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={() => navigate('/home')}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Career Launch Pad - Aptitude Test
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <HelpOutlineIcon sx={{ mr: 1 }} />
            <Typography variant="subtitle1" sx={{ mr: 2 }}>
              Questions: {Object.keys(answers).length}/{questions.length}
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
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ 
          p: 3,
          borderRadius: 2,
          boxShadow: 3
        }}>
          <Box sx={{ mb: 2 }}>
            <Stepper 
              activeStep={currentQuestion % 10} 
              alternativeLabel
              sx={{
                '& .MuiStepIcon-root': {
                  width: 32,
                  height: 32,
                  '& .MuiStepIcon-text': {
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }
                }
              }}
            >
              {Array.from({ length: 10 }, (_, i) => {
                const questionNumber = Math.floor(currentQuestion / 10) * 10 + i;
                const isAnswered = answeredQuestions.has(questionNumber);
                const isPastQuestion = questionNumber < currentQuestion;
                
                let icon;
                let color;
                
                if (questionNumber >= currentQuestion) {
                  // Current and future questions
                  icon = questionNumber + 1;
                  color = 'inherit';
                } else if (isAnswered) {
                  // Answered past questions
                  icon = '✓';
                  color = '#4caf50';
                } else {
                  // Unanswered past questions
                  icon = 'X';
                  color = '#ff0000';
                }
                
                return (
                  <Step key={i}>
                    <StepLabel StepIconProps={{
                      icon: icon,
                      sx: {
                        '& .MuiStepIcon-text': {
                          color: color,
                          fontWeight: 'bold'
                        }
                      }
                    }} />
                  </Step>
                );
              })}
            </Stepper>
            <Typography variant="subtitle1" align="center" sx={{ mt: 1 }}>
              Questions {Math.floor(currentQuestion / 10) * 10 + 1} to {Math.min(Math.floor(currentQuestion / 10) * 10 + 10, questions.length)} of {questions.length}
            </Typography>
            <Box sx={{ mt: 2, mb: 1 }}>
              <LinearProgress variant="determinate" value={calculateProgress()} color="success" />
              <Typography variant="caption" sx={{ mt: 0.5, display: 'block', textAlign: 'right' }}>
                Completion: {Math.round(calculateProgress())}%
              </Typography>
            </Box>
          </Box>
          
          {questions.length > 0 && (
            <Card variant="outlined" sx={{ 
              mb: 3,
              borderRadius: 2,
              boxShadow: 1
            }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {questions[currentQuestion].category}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {questions[currentQuestion].question}
                </Typography>
                <FormControl component="fieldset" sx={{ width: '100%', mt: 2 }}>
                  <RadioGroup
                    value={answers[currentQuestion] || ''}
                    onChange={handleAnswerChange}
                  >
                    {questions[currentQuestion].options.map((option, index) => (
                      <FormControlLabel 
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>
          )}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              variant="outlined"
              onClick={goToPrevQuestion}
              disabled={currentQuestion === 0}
              sx={{ borderRadius: 28, px: 3 }}
            >
              Previous
            </Button>
            
            <Button
              variant="contained"
              color="primary"
              onClick={currentQuestion < questions.length - 1 ? goToNextQuestion : handleSubmit}
              sx={{ 
                borderRadius: 28, 
                px: 3,
                fontWeight: 'bold'
              }}
            >
              {currentQuestion < questions.length - 1 ? 'Next' : 'Submit Quiz'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default QuizPage; 