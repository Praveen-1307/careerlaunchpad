import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TimerIcon from '@mui/icons-material/Timer';
import CategoryIcon from '@mui/icons-material/Category';
import { getRandomQuestions, getTopicQuestions, questionBank } from '../data/questionBank';
import { getCurrentUser } from '../utils/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const QuizPage = ({ darkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [skippedQuestions, setSkippedQuestions] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [quizType, setQuizType] = useState('standard');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [questionCount, setQuestionCount] = useState(10); // Default to 10 questions
  
  useEffect(() => {
    // Check if any specific quiz parameters were passed
    if (location.state) {
      if (location.state.selectedTopic) {
        setQuizType('topic');
        setSelectedTopic(location.state.selectedTopic);
      } else if (location.state.timed) {
        setQuizType('timed');
        // Set 10 minutes (600 seconds) for timed quiz with 10 questions
        setTimeLeft(600);
        setTimerActive(true);
      } else if (location.state.category) {
        // Handle custom category like "General Quiz"
        setQuizType('standard');
        // Store the category name for later use in quizResult
        localStorage.setItem('customCategory', location.state.category);
      }
      
      // Set question count if provided
      if (location.state.questionCount) {
        setQuestionCount(location.state.questionCount);
      }
    }
    
    // Cleanup function to remove customCategory when component unmounts
    return () => {
      localStorage.removeItem('customCategory');
    };
  }, [location.state]);
  
  // Timer effect
  useEffect(() => {
    let timer;
    if (timerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timerActive && timeLeft === 0) {
      // Time's up - submit the quiz
      handleSubmit();
    }
    
    return () => {
      clearInterval(timer);
    };
  }, [timerActive, timeLeft]);
  
  // Format timer display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
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
        
        // Load questions based on quiz type
        let fetchedQuestions = [];
        
        try {
          if (quizType === 'topic' && selectedTopic) {
            // Get questions for specific topic
            fetchedQuestions = getTopicQuestions(selectedTopic, questionCount, userData);
            console.log(`Loaded ${fetchedQuestions.length} ${selectedTopic} questions`);
          } else if (quizType === 'timed') {
            // For timed quiz
            fetchedQuestions = getRandomQuestions(questionCount, userData);
            console.log(`Loaded ${fetchedQuestions.length} questions for timed quiz`);
          } else {
            // Standard quiz
            fetchedQuestions = getRandomQuestions(questionCount, userData);
            console.log(`Loaded ${fetchedQuestions.length} questions for standard quiz`);
          }
        } catch (error) {
          console.error("Error loading questions:", error);
          // Fallback to standard questions
          fetchedQuestions = getRandomQuestions(questionCount, userData);
          
          if (quizType === 'topic') {
            // Reset to standard quiz if topic quiz fails
            setQuizType('standard');
            setSelectedTopic(null);
          } else if (quizType === 'timed' && timeLeft) {
            // Keep timed mode but with standard question count
            console.log("Using standard question set for timed quiz");
          }
        }
        
        if (fetchedQuestions.length === 0) {
          console.warn("No questions fetched, using backup questions");
          // Use a set of backup questions
          fetchedQuestions = questionBank[0].questions.slice(0, questionCount).map(q => ({
            ...q,
            category: questionBank[0].category
          }));
        }
        
        console.log("Fetched questions:", fetchedQuestions.length);
        setQuestions(fetchedQuestions);
        setLoading(false);
      } catch (error) {
        console.error("Error initializing quiz:", error);
        setLoading(false);
      }
    };
    
    initializeQuiz();
  }, [navigate, quizType, selectedTopic, questionCount]);
  
  // Get user initials for avatar
  const getInitials = () => {
    if (!user) return '';
    return `${(user.firstName || '').charAt(0)}${(user.lastName || '').charAt(0)}`;
  };
  
  // Memoize handleSubmit to avoid dependency warning
  const handleSubmit = useCallback(() => {
    // Stop timer if active
    if (timerActive) {
      setTimerActive(false);
    }
    
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
      category: quizType === 'topic' ? `Topic Quiz (${selectedTopic})` : 
               quizType === 'timed' ? 'Timed Quiz' : 
               localStorage.getItem('customCategory') || 'Standard Quiz',
      quizType: quizType,
      timeSpent: quizType === 'timed' ? 600 - timeLeft : null,
      questions: questions.map((q, index) => ({
        question: q.question,
        correctAnswer: q.correctAnswer,
        userAnswer: answers[index] || 'No answer',
        correct: answers[index] === q.correctAnswer,
        category: q.category || 'General'
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
  }, [questions, answers, navigate, user, quizType, selectedTopic, timerActive, timeLeft]);
  
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
            Career Launch Pad - {quizType === 'topic' ? `${selectedTopic} Quiz` : 
                               quizType === 'timed' ? 'Timed Quiz' : 
                               localStorage.getItem('customCategory') || 'Standard Quiz'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {quizType === 'timed' && timeLeft !== null && (
              <Chip 
                icon={<TimerIcon />} 
                label={formatTime(timeLeft)}
                color={timeLeft < 60 ? "error" : timeLeft < 180 ? "warning" : "primary"}
                sx={{ 
                  mr: 2, 
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  padding: '4px'
                }} 
              />
            )}
            {quizType === 'topic' && (
              <Chip 
                icon={<CategoryIcon />} 
                label={selectedTopic}
                color="secondary"
                sx={{ mr: 2 }} 
              />
            )}
            <HelpOutlineIcon sx={{ mr: 1, color: darkMode ? 'inherit' : 'primary.main' }} />
            <Typography variant="subtitle1" sx={{ mr: 2, color: darkMode ? 'inherit' : 'text.primary', fontWeight: 'medium' }}>
              Questions: {Object.keys(answers).length}/{questions.length}
            </Typography>
            {user && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                bgcolor: 'rgba(25, 118, 210, 0.8)',
                borderRadius: 2,
                px: 1.5,
                py: 0.5
              }}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    mr: 1, 
                    display: { xs: 'none', sm: 'block' },
                    color: '#ffffff',
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
                    fontWeight: 'bold',
                    border: '2px solid #3f51b5',
                    boxShadow: '0 0 0 2px #2196f3, 0 0 10px rgba(0,0,0,0.3)'
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
            {/* Calculate current page and total pages based on 10 questions per page */}
            {(() => {
              const questionsPerPage = 10;
              const currentPage = Math.floor(currentQuestion / questionsPerPage);
              const totalPages = Math.ceil(questions.length / questionsPerPage);
              const startQuestionNum = currentPage * questionsPerPage + 1;
              const endQuestionNum = Math.min((currentPage + 1) * questionsPerPage, questions.length);
              
              return (
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      Questions {startQuestionNum}-{endQuestionNum}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Page {currentPage + 1} of {totalPages}
                    </Typography>
                  </Box>
                </Box>
              );
            })()}
            
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
                },
                '& .MuiStepConnector-line': {
                  borderTopWidth: '2px'
                },
                p: 2,
                borderRadius: 1,
                borderLeft: '4px solid',
                borderColor: 'primary.main',
                bgcolor: darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(25, 118, 210, 0.05)'
              }}
            >
              {(() => {
                const questionsPerPage = 10;
                const currentPage = Math.floor(currentQuestion / questionsPerPage);
                const startIdx = currentPage * questionsPerPage;
                const endIdx = Math.min(startIdx + questionsPerPage, questions.length);
                
                return Array.from({ length: endIdx - startIdx }, (_, i) => {
                  const questionIdx = startIdx + i;
                  const questionNumber = questionIdx + 1; // The actual question number (1-based)
                  const isAnswered = answeredQuestions.has(questionIdx);
                  const isCurrent = questionIdx === currentQuestion;
                  const isPastQuestion = questionIdx < currentQuestion;
                  
                  let icon;
                  let color;
                  
                  if (isCurrent) {
                    // Current question
                    icon = questionNumber;
                    color = 'inherit';
                  } else if (isAnswered) {
                    // Answered questions
                    icon = '✓';
                    color = '#4caf50';
                  } else if (isPastQuestion) {
                    // Unanswered past questions
                    icon = 'X';
                    color = '#ff0000';
                  } else {
                    // Future questions
                    icon = questionNumber;
                    color = 'inherit';
                  }
                  
                  return (
                    <Step key={questionIdx}>
                      <StepLabel 
                        onClick={() => setCurrentQuestion(questionIdx)}
                        StepIconProps={{
                          icon: icon,
                          sx: {
                            cursor: 'pointer',
                            '& .MuiStepIcon-text': {
                              color: color,
                              fontWeight: 'bold'
                            }
                          }
                        }} 
                      />
                    </Step>
                  );
                });
              })()}
            </Stepper>
            <Typography variant="subtitle1" align="center" sx={{ mt: 1 }}>
              Question {currentQuestion + 1} of {questions.length}
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