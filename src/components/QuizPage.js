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
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

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
    const fetchUserData = async () => {
      // Get Firebase user first
      const firebaseUser = auth.currentUser;
      let userData = null;
      
      if (firebaseUser) {
        try {
          // Try to get user data from Firestore first
          const docRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            // Use data from Firestore
            const firestoreData = docSnap.data();
            userData = {
              uid: firebaseUser.uid,
              firstName: firestoreData.firstName || firebaseUser.displayName?.split(' ')[0] || 'User',
              lastName: firestoreData.lastName || firebaseUser.displayName?.split(' ').slice(1).join(' ') || '',
              email: firebaseUser.email
            };
          } else {
            // No Firestore record, use Firebase auth data
            userData = {
              uid: firebaseUser.uid,
              firstName: firebaseUser.displayName?.split(' ')[0] || 'User',
              lastName: firebaseUser.displayName?.split(' ').slice(1).join(' ') || '',
              email: firebaseUser.email
            };
          }
          
          // Store consistent user data in localStorage
          localStorage.setItem('currentUser', JSON.stringify(userData));
        } catch (err) {
          console.error("Error fetching user data from Firestore:", err);
          // Fall back to using just the Firebase auth data
          userData = {
            uid: firebaseUser.uid,
            firstName: firebaseUser.displayName?.split(' ')[0] || 'User',
            lastName: firebaseUser.displayName?.split(' ').slice(1).join(' ') || '',
            email: firebaseUser.email
          };
        }
      } else {
        // Fallback to local user
        userData = getCurrentUser();
        if (!userData) {
          console.log("No authenticated user found");
          navigate('/signin');
          return null;
        }
      }
      
      return userData;
    };
    
    const initializeQuiz = async () => {
      try {
        const userData = await fetchUserData();
        if (!userData) return; // No user data available or redirected to signin
        
        console.log("Quiz initialized with user:", userData);
        setUser(userData);
        
        // Load random questions for this user
        const fetchedQuestions = getRandomQuestions(30, userData);
        console.log("Fetched questions:", fetchedQuestions.length);
        setQuestions(fetchedQuestions);
        setLoading(false);
      } catch (error) {
        console.error("Error initializing quiz:", error);
        setLoading(false);
      }
    };
    
    initializeQuiz();
  }, [navigate]);
  
  // Get user initials for avatar
  const getInitials = () => {
    if (!user) return '';
    return `${(user.firstName || '').charAt(0)}${(user.lastName || '').charAt(0)}`;
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
      category: questions[0]?.category || 'General',
      questions: questions.map((q, index) => ({
        question: q.question,
        correctAnswer: q.correctAnswer,
        userAnswer: answers[index] || 'No answer',
        correct: answers[index] === q.correctAnswer
      }))
    };
    
    if (user) {
      // Always save with the logged-in user's email
      const userHistoryKey = `quizHistory_${user.email}`;
      const userHistory = JSON.parse(localStorage.getItem(userHistoryKey) || '[]');
      userHistory.push(quizResult);
      localStorage.setItem(userHistoryKey, JSON.stringify(userHistory));
      console.log(`Quiz result saved for ${user.email}`);
    } else {
      console.warn("No user found when saving quiz results");
    }
    
    // Navigate to score page with the same user data
    navigate('/score', { 
      state: { 
        score, 
        totalQuestions: questions.length, 
        questions: quizResult.questions,
        user: user // Pass along the user data to ensure consistency
      } 
    });
  }, [questions, answers, navigate, user]);
  
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
  
  if (typeof window !== "undefined") {
    // safe to use localStorage
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
            <HelpOutlineIcon sx={{ mr: 1, color: darkMode ? 'inherit' : 'primary.main' }} />
            <Typography variant="subtitle1" sx={{ mr: 2, color: darkMode ? 'inherit' : 'text.primary', fontWeight: 'medium' }}>
              Questions: {Object.keys(answers).length}/{questions.length}
            </Typography>
            {user && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                bgcolor: darkMode ? 'transparent' : 'rgba(25, 118, 210, 0.08)',
                borderRadius: 2,
                px: 1.5,
                py: 0.5
              }}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    mr: 1, 
                    display: { xs: 'none', sm: 'block' },
                    color: darkMode ? 'inherit' : 'primary.main',
                    fontWeight: 'medium'
                  }}
                >
                  {user.firstName} {user.lastName}
                </Typography>
                <Tooltip title={`${user.firstName} ${user.lastName}`}>
                  <Avatar sx={{ 
                    width: 32, 
                    height: 32, 
                    bgcolor: darkMode ? 'primary.dark' : 'primary.main',
                    color: 'white',
                    fontWeight: 'bold'
                  }}>
                    {getInitials()}
                  </Avatar>
                </Tooltip>
              </Box>
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
          
          {questions.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 5 }}>
              <Typography variant="h6" color="text.secondary">
                No questions available to display.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Please try refreshing the page or contact support.
              </Typography>
            </Box>
          ) : (
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