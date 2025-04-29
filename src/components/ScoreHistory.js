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
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Divider,
  Chip,
  Tabs,
  Tab,
  CircularProgress,
  Tooltip,
  Avatar,
  Stack,
  Grow,
  Fade,
  Zoom,
  Slide,
  Badge,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TimelineIcon from '@mui/icons-material/Timeline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PsychologyIcon from '@mui/icons-material/Psychology';
import StarIcon from '@mui/icons-material/Star';
import SpeedIcon from '@mui/icons-material/Speed';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const ScoreHistory = ({ darkMode }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [user, setUser] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [categoryBreakdown, setCategoryBreakdown] = useState({});
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get Firebase auth user first
        const firebaseUser = auth.currentUser;
        
        if (firebaseUser) {
          // Try to get user data from Firestore
          const docRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          
          let userData;
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
          
          setUser(userData);
          
          // Load quiz history for this user
          const historyKey = `quizHistory_${userData.email}`;
          const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
          setQuizHistory(history);
          calculateCategoryBreakdown(history);
          calculateAchievements(history);
          
          // Save consistent user data
          localStorage.setItem('currentUser', JSON.stringify(userData));
        } else {
          // Fallback to local user
          const currentUser = getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
            const historyKey = `quizHistory_${currentUser.email}`;
            const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
            setQuizHistory(history);
            calculateCategoryBreakdown(history);
            calculateAchievements(history);
          } else {
            // No user found, redirect to login
            navigate('/signin');
            return;
          }
        }
        
        setLoading(false);
        setShowStats(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
        // Attempt to fall back to local auth as a last resort
        const currentUser = getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        } else {
          navigate('/signin');
        }
      }
    };
    
    fetchUserData();
  }, [navigate]);

  const calculateCategoryBreakdown = (history) => {
    const breakdown = {};
    history.forEach(quiz => {
      if (!quiz.totalQuestions || quiz.totalQuestions === 0) return;
      const category = quiz.category || 'General';
      if (!breakdown[category]) {
        breakdown[category] = {
          total: 0,
          correct: 0,
          count: 0
        };
      }
      breakdown[category].total += quiz.totalQuestions;
      breakdown[category].correct += quiz.score;
      breakdown[category].count += 1;
    });
    setCategoryBreakdown(breakdown);
  };

  const calculateAchievements = (history) => {
    const newAchievements = [];
    const totalQuizzes = history.length;
    const highestScore = getHighestScore();
    const averageScore = calculateAverage();

    if (totalQuizzes >= 5) newAchievements.push({ name: 'Quiz Enthusiast', icon: '🏆' });
    if (totalQuizzes >= 10) newAchievements.push({ name: 'Quiz Master', icon: '👑' });
    if (highestScore >= 90) newAchievements.push({ name: 'Perfectionist', icon: '💯' });
    if (averageScore >= 80) newAchievements.push({ name: 'Consistent Performer', icon: '📈' });
    if (history.some(q => q.score === q.totalQuestions)) newAchievements.push({ name: 'Perfect Score', icon: '⭐' });

    setAchievements(newAchievements);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getValidQuizzes = () => quizHistory.filter(q => q.totalQuestions && q.totalQuestions > 0);

  const calculateAverage = () => {
    const validQuizzes = getValidQuizzes();
    if (validQuizzes.length === 0) return 0;
    const sum = validQuizzes.reduce((total, quiz) => total + (quiz.score / quiz.totalQuestions) * 100, 0);
    return Math.round(sum / validQuizzes.length) || 0;
  };

  const getHighestScore = () => {
    const validQuizzes = getValidQuizzes();
    if (validQuizzes.length === 0) return 0;
    return Math.max(...validQuizzes.map(quiz => Math.round((quiz.score / quiz.totalQuestions) * 100)));
  };

  const getImprovement = () => {
    const validQuizzes = getValidQuizzes();
    if (validQuizzes.length < 2) return 0;
    const sortedHistory = [...validQuizzes].sort((a, b) => new Date(a.date) - new Date(b.date));
    const firstScore = (sortedHistory[0].score / sortedHistory[0].totalQuestions) * 100;
    const lastScore = (sortedHistory[sortedHistory.length - 1].score / sortedHistory[sortedHistory.length - 1].totalQuestions) * 100;
    return Math.round(lastScore - firstScore);
  };

  const getPerformanceTrend = () => {
    if (quizHistory.length < 2) return 'stable';
    const improvement = getImprovement();
    if (improvement > 5) return 'improving';
    if (improvement < -5) return 'declining';
    return 'stable';
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'warning';
    return 'error';
  };

  const getStreak = () => {
    if (quizHistory.length === 0) return 0;
    const sortedHistory = [...quizHistory].sort((a, b) => new Date(b.date) - new Date(a.date));
    let streak = 0;
    let currentDate = new Date(sortedHistory[0].date);
    
    for (let i = 0; i < sortedHistory.length; i++) {
      const quizDate = new Date(sortedHistory[i].date);
      if (i === 0 || (currentDate - quizDate) / (1000 * 60 * 60 * 24) <= 1) {
        streak++;
        currentDate = quizDate;
      } else {
        break;
      }
    }
    return streak;
  };

  const getRecentActivity = () => {
    if (quizHistory.length === 0) return [];
    const sortedHistory = [...quizHistory].sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedHistory.slice(0, 5);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Mathematics': 'primary',
      'Science': 'success',
      'English': 'warning',
      'History': 'error',
      'General': 'info',
      'N/A': 'default'
    };
    return colors[category] || 'info';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Mathematics': '🧮',
      'Science': '🔬',
      'English': '📚',
      'History': '📜',
      'General': '📝',
      'N/A': '❓'
    };
    return icons[category] || '📝';
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
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
              Your Score History
            </Typography>
            {user && (
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography 
                  variant="subtitle1" 
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
                  <Avatar 
                    sx={{ 
                      bgcolor: darkMode ? theme.palette.primary.main : '#1976d2',
                      width: 40,
                      height: 40,
                      border: `2px solid ${darkMode ? theme.palette.primary.light : '#42a5f5'}`,
                      boxShadow: `0 0 10px ${darkMode ? theme.palette.primary.light : 'rgba(66, 165, 245, 0.5)'}`,
                      color: 'white',
                      fontWeight: 'bold',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        transition: 'transform 0.3s ease-in-out'
                      }
                    }}
                  >
                    {user.firstName?.[0]}{user.lastName?.[0]}
                  </Avatar>
                </Tooltip>
              </Stack>
            )}
          </Toolbar>
        </AppBar>
      </Slide>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Grow in={showStats} timeout={500}>
              <Card sx={{ height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EmojiEventsIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Highest Score</Typography>
                  </Box>
                  <Typography variant="h4" color="primary" sx={{ mb: 1 }}>
                    {getHighestScore()}%
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={getHighestScore()} 
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </CardContent>
              </Card>
            </Grow>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grow in={showStats} timeout={800}>
              <Card sx={{ height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Average Score</Typography>
                  </Box>
                  <Typography variant="h4" color="primary" sx={{ mb: 1 }}>
                    {calculateAverage()}%
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={calculateAverage()} 
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </CardContent>
              </Card>
            </Grow>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grow in={showStats} timeout={1100}>
              <Card sx={{ height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SpeedIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Performance Trend</Typography>
                  </Box>
                  <Typography variant="h4" color="primary" sx={{ mb: 1 }}>
                    {getImprovement()}%
                  </Typography>
                  <Chip 
                    label={getPerformanceTrend() === 'improving' ? 'Improving' : 
                           getPerformanceTrend() === 'declining' ? 'Declining' : 'Stable'}
                    color={getPerformanceTrend() === 'improving' ? 'success' : 
                           getPerformanceTrend() === 'declining' ? 'error' : 'warning'}
                    size="small"
                  />
                </CardContent>
              </Card>
            </Grow>
          </Grid>
        </Grid>

        <Fade in={true} timeout={1000}>
          <Paper sx={{ mb: 4 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab icon={<AssessmentIcon />} label="Detailed History" />
              <Tab icon={<PsychologyIcon />} label="Category Breakdown" />
              <Tab icon={<StarIcon />} label="Achievements" />
            </Tabs>
          </Paper>
        </Fade>

        {activeTab === 0 ? (
          <Zoom in={true} timeout={500}>
            <Paper 
              sx={{ 
                p: 3,
                borderRadius: 2,
                background: darkMode 
                  ? 'rgba(255, 255, 255, 0.05)' 
                  : 'rgba(255, 255, 255, 0.8)',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Quiz Attempts
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Score</TableCell>
                      <TableCell>Total Questions</TableCell>
                      <TableCell>Percentage</TableCell>
                      <TableCell>Performance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {quizHistory.map((quiz, index) => {
                      const percentage = Math.round((quiz.score / quiz.totalQuestions) * 100);
                      return (
                        <Grow in={true} timeout={index * 100} key={index}>
                          <TableRow>
                            <TableCell>{formatDate(quiz.date)}</TableCell>
                            <TableCell>
                              <Chip 
                                icon={<span>{getCategoryIcon(quiz.category)}</span>}
                                label={quiz.category || 'General'}
                                color={getCategoryColor(quiz.category)}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>{quiz.score}</TableCell>
                            <TableCell>{quiz.totalQuestions}</TableCell>
                            <TableCell>{percentage}%</TableCell>
                            <TableCell>
                              <Tooltip title={`${percentage}% correct answers`}>
                                <Chip 
                                  label={percentage >= 80 ? 'Excellent' : 
                                         percentage >= 60 ? 'Good' : 'Needs Improvement'}
                                  color={getPerformanceColor(percentage)}
                                  size="small"
                                />
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        </Grow>
                      );
                    })}
                    {quizHistory.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          No quiz attempts yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Zoom>
        ) : activeTab === 1 ? (
          <Grid container spacing={3}>
            {Object.entries(categoryBreakdown).map(([category, stats], index) => {
              const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
              return (
                <Grid item xs={12} md={6} key={index}>
                  <Grow in={true} timeout={index * 200}>
                    <Card sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h6">
                            {category}
                          </Typography>
                          <Chip 
                            icon={<span>{getCategoryIcon(category)}</span>}
                            label={`${percentage}%`}
                            color={getPerformanceColor(percentage)}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {stats.count} quizzes taken
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                          <Typography variant="body2">
                            Total Questions: {stats.total}
                          </Typography>
                          <Typography variant="body2">
                            Correct Answers: {stats.correct}
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={percentage} 
                          sx={{ mt: 2, height: 10, borderRadius: 5 }}
                        />
                      </CardContent>
                    </Card>
                  </Grow>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {achievements.map((achievement, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Grow in={true} timeout={index * 200}>
                  <Card sx={{ transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h3">
                          {achievement.icon}
                        </Typography>
                        <Box>
                          <Typography variant="h6">
                            {achievement.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Earned for outstanding performance
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
            {achievements.length === 0 && (
              <Grid item xs={12}>
                <Typography variant="body1" align="center" color="text.secondary">
                  Complete more quizzes to earn achievements!
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default ScoreHistory; 