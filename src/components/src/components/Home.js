import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Stack,
  Chip,
  LinearProgress,
  Fab,
  useTheme,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { keyframes } from '@mui/system';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from '@mui/icons-material/School';
import SubjectIcon from '@mui/icons-material/Subject';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import AddIcon from '@mui/icons-material/Add';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import HistoryIcon from '@mui/icons-material/History';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimelineIcon from '@mui/icons-material/Timeline';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DescriptionIcon from '@mui/icons-material/Description';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { logoutUser, getCurrentUser, getActiveUsers } from '../utils/auth';

const Home = ({ darkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [dailyChallenge, setDailyChallenge] = useState({
    topic: "Time and Work",
    question: null,
    lastUpdated: null
  });
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  
  // Add mock leaderboard data
  const leaderboardData = [
    { rank: 1, name: "Alex Johnson", score: 95, level: "Expert" },
    { rank: 2, name: "Sarah Williams", score: 92, level: "Expert" },
    { rank: 3, name: "Michael Brown", score: 88, level: "Advanced" },
    { rank: 4, name: "Emma Davis", score: 85, level: "Advanced" },
    { rank: 5, name: "James Wilson", score: 82, level: "Advanced" }
  ];

  // Add study resources
  const studyResources = [
    { title: "Basic Mathematics", link: "#", icon: <BookIcon /> },
    { title: "Problem Solving Techniques", link: "#", icon: <TipsAndUpdatesIcon /> },
    { title: "Time Management Guide", link: "#", icon: <TimelineIcon /> },
    { title: "Practice Questions", link: "#", icon: <SchoolIcon /> }
  ];

  // Add motivational quotes
  const quotes = [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The only way to do great work is to love what you do.",
    "Believe you can and you're halfway there.",
    "Don't watch the clock; do what it does. Keep going."
  ];
  
  // Function to get a random question from a topic
  const getRandomQuestion = (topic) => {
    const questions = {
      "Time and Work": {
        easy: [
          {
            question: "A can do a piece of work in 10 days and B can do it in 15 days. How long will they take to complete the work together?",
            options: ["5 days", "6 days", "7 days", "8 days"],
            correctAnswer: "6 days",
            explanation: "A's 1 day work = 1/10, B's 1 day work = 1/15. Together = 1/10 + 1/15 = 1/6. So they take 6 days."
          }
        ],
        medium: [
          {
            question: "If 12 men can complete a work in 8 days, how many men are needed to complete the same work in 6 days?",
            options: ["14 men", "16 men", "18 men", "20 men"],
            correctAnswer: "16 men",
            explanation: "12 men × 8 days = x men × 6 days. x = (12 × 8)/6 = 16 men"
          }
        ],
        hard: [
          {
            question: "A and B can do a work in 12 days, B and C in 15 days, C and A in 20 days. How long will A alone take to complete the work?",
            options: ["20 days", "25 days", "30 days", "35 days"],
            correctAnswer: "30 days",
            explanation: "A+B = 1/12, B+C = 1/15, C+A = 1/20. Adding all: 2(A+B+C) = 1/5. A = 1/30. So A takes 30 days."
          }
        ]
      },
      "Time and Distance": {
        easy: [
          {
            question: "A train covers a distance of 360 km in 5 hours. What is its speed in m/s?",
            options: ["18 m/s", "20 m/s", "22 m/s", "24 m/s"],
            correctAnswer: "20 m/s",
            explanation: "Speed = 360 km/5 hr = 72 km/hr = 72 × (5/18) = 20 m/s"
          }
        ],
        medium: [
          {
            question: "A car travels at 60 km/h for the first half of the journey and 40 km/h for the second half. What is the average speed?",
            options: ["45 km/h", "48 km/h", "50 km/h", "52 km/h"],
            correctAnswer: "48 km/h",
            explanation: "Let total distance = 2x. Time = x/60 + x/40 = 5x/120. Avg speed = 2x/(5x/120) = 48 km/h"
          }
        ],
        hard: [
          {
            question: "Two trains start from stations A and B respectively and travel towards each other at 50 km/h and 60 km/h. When they meet, the first train has traveled 100 km more than the second. What is the distance between A and B?",
            options: ["1100 km", "1200 km", "1300 km", "1400 km"],
            correctAnswer: "1100 km",
            explanation: "Let time = t. 50t - 60t = 100. t = 10 hr. Distance = (50+60) × 10 = 1100 km"
          }
        ]
      },
      "Percentage": {
        easy: [
          {
            question: "If the price of a product is increased by 20% and then decreased by 20%, what is the net change in price?",
            options: ["No change", "4% increase", "4% decrease", "8% decrease"],
            correctAnswer: "4% decrease",
            explanation: "Let original price = 100. After 20% increase = 120. After 20% decrease = 96. Net change = 4% decrease"
          }
        ],
        medium: [
          {
            question: "A number is increased by 20% and then decreased by 20%. The final number is 48. What was the original number?",
            options: ["50", "55", "60", "65"],
            correctAnswer: "50",
            explanation: "Let original number = x. x × 1.2 × 0.8 = 48. x = 48/(1.2 × 0.8) = 50"
          }
        ],
        hard: [
          {
            question: "In an election between two candidates, one got 55% of the total valid votes and won by a majority of 20 votes. What was the total number of votes?",
            options: ["200", "250", "300", "350"],
            correctAnswer: "200",
            explanation: "Let total votes = x. 55% of x - 45% of x = 20. 10% of x = 20. x = 200"
          }
        ]
      },
      "Average": {
        easy: [
          {
            question: "The average of 5 numbers is 20. If one number is excluded, the average becomes 18. What is the excluded number?",
            options: ["28", "30", "32", "34"],
            correctAnswer: "28",
            explanation: "Total of 5 numbers = 5 × 20 = 100. Total of 4 numbers = 4 × 18 = 72. Excluded number = 100 - 72 = 28"
          }
        ],
        medium: [
          {
            question: "The average weight of 25 boys in a class is 48 kg. The average weight of 35 girls is 42 kg. Find the average weight of the whole class.",
            options: ["44.5 kg", "45 kg", "45.5 kg", "46 kg"],
            correctAnswer: "44.5 kg",
            explanation: "Total weight = (25×48) + (35×42) = 1200+1470=2670. Average = 2670/60 = 44.5 kg"
          }
        ],
        hard: [
          {
            question: "The average of 10 numbers is 16. If three numbers 17, 14, and 15 are removed, what will be the new average?",
            options: ["16.5", "15.5", "15", "14.5"],
            correctAnswer: "16.5",
            explanation: "Sum = 10×16=160. Removed sum = 17+14+15=46. New sum = 114. New average = 114/7 ≈ 16.29"
          }
        ]
      },
      "Ratio and Proportions": {
        easy: [
          {
            question: "If a:b = 2:3 and b:c = 4:5, what is a:b:c?",
            options: ["8:12:15", "6:9:10", "4:6:5", "2:3:5"],
            correctAnswer: "8:12:15",
            explanation: "a:b = 2:3 = 8:12, b:c = 4:5 = 12:15. So a:b:c = 8:12:15"
          }
        ],
        medium: [
          {
            question: "The ratio of boys to girls in a class is 3:2. If there are 15 boys, how many girls are there?",
            options: ["8", "10", "12", "15"],
            correctAnswer: "10",
            explanation: "3:2 = 15:x. x = (2×15)/3 = 10 girls"
          }
        ],
        hard: [
          {
            question: "A sum of money is divided among A, B, C in the ratio 2:3:4. If C gets Rs. 200 more than A, what is the total sum?",
            options: ["Rs. 900", "Rs. 1000", "Rs. 1100", "Rs. 1200"],
            correctAnswer: "Rs. 900",
            explanation: "Let parts be 2x, 3x, 4x. 4x - 2x = 200. x = 100. Total = 9x = Rs. 900"
          }
        ]
      },
      "Profit and Loss": {
        easy: [
          {
            question: "A shopkeeper sells an article for Rs. 400, making a profit of 25%. What was the cost price?",
            options: ["Rs. 300", "Rs. 320", "Rs. 340", "Rs. 360"],
            correctAnswer: "Rs. 320",
            explanation: "CP = SP/(1 + profit%) = 400/1.25 = Rs. 320"
          }
        ],
        medium: [
          {
            question: "A man sells two articles for Rs. 1000 each. On one he gains 10% and on the other he loses 10%. What is his overall profit or loss?",
            options: ["1% loss", "1% profit", "No profit no loss", "2% loss"],
            correctAnswer: "1% loss",
            explanation: "When SP is same and profit% = loss%, there is always a loss of (x²/100)% = 1% loss"
          }
        ],
        hard: [
          {
            question: "A trader marks his goods 20% above cost price but allows a discount of 10%. What is his profit percentage?",
            options: ["8%", "10%", "12%", "15%"],
            correctAnswer: "8%",
            explanation: "Let CP = 100. MP = 120. SP = 120 × 0.9 = 108. Profit% = 8%"
          }
        ]
      }
    };

    const topicQuestions = questions[topic] || {};
    const difficulties = ['easy', 'medium', 'hard'];
    const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    const questionsOfDifficulty = topicQuestions[randomDifficulty] || [];
    return {
      ...questionsOfDifficulty[Math.floor(Math.random() * questionsOfDifficulty.length)],
      difficulty: randomDifficulty
    };
  };

  // Function to update daily challenge
  const updateDailyChallenge = () => {
    const today = new Date().toDateString();
    const topics = ["Time and Work", "Time and Distance", "Percentage"];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    
    if (dailyChallenge.lastUpdated !== today) {
      const newQuestion = getRandomQuestion(randomTopic);
      setDailyChallenge({
        topic: randomTopic,
        question: newQuestion,
        lastUpdated: today
      });
    }
  };

  useEffect(() => {
    // Get current user
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      
      // Get user-specific quiz history using the user's email
      const userHistoryKey = `quizHistory_${currentUser.email}`;
      const history = JSON.parse(localStorage.getItem(userHistoryKey) || '[]');
      setQuizHistory(history);

      // Get active users from localStorage
      const activeUsersData = getActiveUsers();
      setActiveUsers(activeUsersData);

      // Check if user has already attempted today's challenge
      const today = new Date().toDateString();
      const dailyChallengeKey = `dailyChallenge_${currentUser.email}_${today}`;
      const hasAttemptedToday = localStorage.getItem(dailyChallengeKey) === 'true';
      setHasAttempted(hasAttemptedToday);

      // Update daily challenge
      updateDailyChallenge();
    } else {
      navigate('/signin');
    }
  }, [navigate]);
  
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleProfileClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    logoutUser();
    navigate('/signin');
  };

  const startQuiz = () => {
    navigate('/quiz');
  };
  
  const navigateToHistory = () => {
    navigate('/score-history');
  };

  // Topics covered in the aptitude test
  const aptitudeTopics = [
    "Trains", "Average", "Height and Weight", "HCF and LCM",
    "Time and Distance", "Time and Work", "Ages", "Permutations",
    "Ratio and Proportions", "Profit and Loss", "Volume and Surface Area",
    "Probability", "Discount", "Pipes and Cistern", "Percentage"
  ];
  
  // Get user initials for avatar
  const getInitials = () => {
    if (!user) return '';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  };
  
  // Calculate average score
  const calculateAverage = () => {
    if (!quizHistory || quizHistory.length === 0) return 0;
    const sum = quizHistory.reduce((total, quiz) => total + (quiz.score / quiz.totalQuestions) * 100, 0);
    return Math.round(sum / quizHistory.length) || 0;
  };
  
  // Get user skill level based on average score
  const getUserLevel = () => {
    const avg = calculateAverage();
    if (avg >= 80) return { level: "Expert", color: "success.main" };
    if (avg >= 70) return { level: "Advanced", color: "info.main" };
    if (avg >= 50) return { level: "Intermediate", color: "warning.main" };
    if (quizHistory.length > 0) return { level: "Beginner", color: "error.main" };
    return { level: "Novice", color: "text.secondary" };
  };
  
  // Generate a study recommendation
  const getStudyRecommendation = () => {
    if (!quizHistory || quizHistory.length === 0) {
      return "Complete your first quiz to get personalized recommendations";
    }
    
    // Find weakest categories
    const categoryScores = {};
    
    quizHistory.forEach(quiz => {
      if (quiz.questions) {
        quiz.questions.forEach(q => {
          if (!categoryScores[q.category]) {
            categoryScores[q.category] = { correct: 0, total: 0 };
          }
          
          categoryScores[q.category].total += 1;
          if (q.correct) {
            categoryScores[q.category].correct += 1;
          }
        });
      }
    });
    
    // Find the category with lowest score
    let worstCategory = null;
    let lowestScore = 100;
    
    Object.entries(categoryScores).forEach(([category, scores]) => {
      const percentCorrect = (scores.correct / scores.total) * 100;
      if (percentCorrect < lowestScore) {
        lowestScore = percentCorrect;
        worstCategory = category;
      }
    });
    
    if (worstCategory) {
      return `Focus on improving your skills in ${worstCategory} (${Math.round(lowestScore)}% correct)`;
    }
    
    return "Keep up the good work across all topics!";
  };
  
  // Calculate progress percentage for user level
  const getLevelProgress = () => {
    const avg = calculateAverage();
    if (avg >= 80) return 100; // Expert
    if (avg >= 70) return 80;  // Advanced
    if (avg >= 50) return 60;  // Intermediate
    if (quizHistory.length > 0) return 30; // Beginner
    return 10; // Novice
  };
  
  // User level details
  const userLevel = getUserLevel();

  // Animation keyframes - keeping only the fade-in from bottom animation
  const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  `;
  
  // Calculate leaderboard data from active users' quiz history
  const calculateLeaderboard = () => {
    const userScores = {};
    
    // Process only active users' quiz history
    activeUsers.forEach(activeUser => {
      const userHistoryKey = `quizHistory_${activeUser.email}`;
      const userHistory = JSON.parse(localStorage.getItem(userHistoryKey) || '[]');
      
      if (userHistory.length > 0) {
        const totalScore = userHistory.reduce((sum, quiz) => sum + (quiz.score || 0), 0);
        const averageScore = Math.round(totalScore / userHistory.length);
        
        userScores[activeUser.email] = {
          name: activeUser.name || activeUser.email.split('@')[0],
          score: averageScore,
          attempts: userHistory.length,
          level: averageScore >= 80 ? "Expert" : 
                 averageScore >= 60 ? "Advanced" : 
                 averageScore >= 40 ? "Intermediate" : "Beginner"
        };
      }
    });

    // Convert to array and sort by score
    return Object.values(userScores)
      .sort((a, b) => b.score - a.score)
      .map((user, index) => ({
        rank: index + 1,
        name: user.name,
        score: user.score,
        level: user.level
      }));
  };

  const handleAnswerSubmit = () => {
    if (!hasAttempted) {
      setShowAnswer(true);
      setHasAttempted(true);
      
      // Store that user has attempted today's challenge
      const today = new Date().toDateString();
      const dailyChallengeKey = `dailyChallenge_${user.email}_${today}`;
      localStorage.setItem(dailyChallengeKey, 'true');

      // Update user's score in the leaderboard
      if (selectedAnswer === dailyChallenge.question.correctAnswer) {
        const userHistoryKey = `quizHistory_${user.email}`;
        const history = JSON.parse(localStorage.getItem(userHistoryKey) || '[]');
        history.push({
          score: 100,
          date: new Date().toISOString(),
          topic: dailyChallenge.topic
        });
        localStorage.setItem(userHistoryKey, JSON.stringify(history));
        setQuizHistory(history);
      }
    }
  };

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
    setShowAnswer(false);
  };

  return (
    <Box sx={{ 
      flexGrow: 1,
      minHeight: '100vh',
      background: darkMode 
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' 
        : 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ef 100%)',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: darkMode 
          ? 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)' 
          : 'radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        pointerEvents: 'none',
      }
    }}>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          backdropFilter: 'blur(20px)', 
          background: darkMode 
            ? 'rgba(26, 26, 46, 0.8)' 
            : 'rgba(255, 255, 255, 0.8)'
        }}
      >
        <Toolbar>
          <Typography 
            variant="h4" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 'bold',
              background: darkMode 
                ? 'linear-gradient(45deg, #2196F3, #21CBF3)' 
                : 'linear-gradient(45deg, #1565C0, #1976D2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Career Launch Pad
          </Typography>
          <IconButton 
            color="inherit" 
            onClick={toggleTheme} 
            sx={{ mr: 1 }}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <Tooltip title="Profile">
            <IconButton 
              color="inherit" 
              onClick={handleProfileClick} 
              sx={{ mr: 1 }}
              aria-controls={open ? 'profile-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ 
                width: 40, 
                height: 40,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: 'white',
                fontWeight: 'bold'
              }}>
                {getInitials()}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleProfileClose}
            MenuListProps={{
              'aria-labelledby': 'profile-button',
            }}
            PaperProps={{
              elevation: 3,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                minWidth: 250,
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {user && (
              <>
                <Box sx={{ 
                  p: 2, 
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  color: 'white'
                }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ 
                      width: 50, 
                      height: 50,
                      bgcolor: 'rgba(255,255,255,0.3)',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '1.2rem'
                    }}>
                      {getInitials()}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {user.email}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <MilitaryTechIcon sx={{ color: userLevel.color }} />
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      Level: {userLevel.level}
                    </Typography>
                  </Stack>
                  <LinearProgress 
                    variant="determinate" 
                    value={getLevelProgress()} 
                    sx={{ mb: 2, height: 5, borderRadius: 5 }}
                  />
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <EqualizerIcon color="primary" />
                    <Typography variant="body2">
                      Average Score: {calculateAverage()}%
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <HistoryIcon color="primary" />
                    <Typography variant="body2">
                      Tests Completed: {quizHistory.length}
                    </Typography>
                  </Stack>
                </Box>
                <Divider />
                <MenuItem onClick={navigateToHistory} sx={{ py: 1.5 }}>
                  <ListItemIcon>
                    <AssessmentIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>View Score History</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => navigate('/edit-profile')} sx={{ py: 1.5 }}>
                  <ListItemIcon>
                    <PeopleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Edit Profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </>
            )}
          </Menu>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ pt: 6, pb: 8 }}>
        {/* Welcome Banner */}
        {user && (
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              mb: 4, 
              borderRadius: 4,
              border: '1px solid',
              borderColor: darkMode 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(0, 0, 0, 0.05)',
              animation: `${fadeIn} 0.6s ease-out`,
              transform: 'translateZ(0)',
              transition: 'all 0.3s',
              '&:hover': {
                boxShadow: darkMode 
                  ? '0 8px 30px rgba(0, 0, 0, 0.3)' 
                  : '0 8px 30px rgba(0, 0, 0, 0.1)',
                transform: 'translateY(-5px)',
              }
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography 
                    variant="h4" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 'bold',
                      animation: `${fadeIn} 0.8s ease-out`,
                    }}
                  >
                    Welcome back, {user.firstName}!
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2, 
                      opacity: 0.8,
                      animation: `${fadeIn} 1s ease-out`,
                    }}
                  >
                    Ready to boost your aptitude skills today?
                  </Typography>
                  
                  {quizHistory.length > 0 ? (
                    <Box sx={{ mb: 2, animation: `${fadeIn} 1.2s ease-out` }}>
                      <Chip 
                        icon={<TipsAndUpdatesIcon />} 
                        label={getStudyRecommendation()}
                        color="primary" 
                        variant="outlined"
                        sx={{ borderRadius: 2, py: 1.5 }}
                      />
                    </Box>
                  ) : (
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 2,
                        animation: `${fadeIn} 1.2s ease-out`,
                      }}
                    >
                      Take your first quiz to start tracking your progress!
                    </Typography>
                  )}
                  
                  <Button 
                    variant="contained" 
                    size="large"
                    startIcon={<SchoolIcon />}
                    onClick={startQuiz}
                    sx={{ 
                      px: 4, 
                      py: 1.5,
                      borderRadius: 28,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                      animation: `${fadeIn} 1.4s ease-out`,
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        boxShadow: '0 12px 20px rgba(0, 0, 0, 0.2)',
                        transform: 'translateY(-3px)',
                      }
                    }}
                  >
                    Start New Test
                  </Button>
                  
                  <Box sx={{ 
                    mt: 4, 
                    p: 2, 
                    borderLeft: '4px solid', 
                    borderColor: theme.palette.primary.main, 
                    bgcolor: 'rgba(0,0,0,0.02)', 
                    borderRadius: '0 8px 8px 0',
                    animation: `${fadeIn} 1.6s ease-out`
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.primary.main, mb: 1 }}>
                      Why Practice Matters
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Regular practice of aptitude questions can improve your:
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          mb: 1,
                          animation: `${fadeIn} 1.8s ease-out`
                        }}>
                          <CheckCircleIcon fontSize="small" color="success" sx={{ mr: 1 }} />
                          <Typography variant="body2">Problem-solving speed</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          mb: 1,
                          animation: `${fadeIn} 1.9s ease-out`
                        }}>
                          <CheckCircleIcon fontSize="small" color="success" sx={{ mr: 1 }} />
                          <Typography variant="body2">Pattern recognition</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          mb: 1,
                          animation: `${fadeIn} 2s ease-out`
                        }}>
                          <CheckCircleIcon fontSize="small" color="success" sx={{ mr: 1 }} />
                          <Typography variant="body2">Mental calculation</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          mb: 1,
                          animation: `${fadeIn} 2.1s ease-out`
                        }}>
                          <CheckCircleIcon fontSize="small" color="success" sx={{ mr: 1 }} />
                          <Typography variant="body2">Time management</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mt: 2, 
                        fontStyle: 'italic', 
                        opacity: 0.7,
                        animation: `${fadeIn} 2.2s ease-out`
                      }}
                    >
                      Students who practice regularly are 3x more likely to succeed in placement aptitude tests.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'center', 
                  alignItems: 'center'
                }}>
                  <Card elevation={0} sx={{ 
                    width: '100%',
                    borderRadius: 4,
                    overflow: 'visible',
                    background: darkMode 
                      ? 'linear-gradient(135deg, rgba(66, 66, 120, 0.5), rgba(26, 26, 46, 0.5))' 
                      : 'linear-gradient(135deg, rgba(245, 247, 250, 0.9), rgba(228, 232, 239, 0.9))',
                    border: '1px solid',
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    animation: `${fadeIn} 1s ease-out`,
                    transform: 'translateZ(0)',
                    transition: 'all 0.5s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                    }
                  }}>
                    <CardContent>
                      {quizHistory.length > 0 ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <MilitaryTechIcon sx={{ mr: 1, color: userLevel.color }} />
                            Your Achievements
                          </Typography>
                          
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            mb: 2,
                            position: 'relative' 
                          }}>
                            <Box sx={{ 
                              position: 'relative', 
                              width: 120, 
                              height: 120,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: '50%',
                              background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                              border: '1px solid',
                              borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                              mb: 2
                            }}>
                              <Typography variant="h3" sx={{ 
                                fontWeight: 'bold',
                                color: userLevel.color
                              }}>
                                {calculateAverage()}%
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              fontWeight: 'bold', 
                              mb: 1,
                              animation: `${fadeIn} 1.4s ease-out` 
                            }}
                          >
                            {userLevel.level} Level
                          </Typography>
                          
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              mb: 2, 
                              opacity: 0.8,
                              animation: `${fadeIn} 1.5s ease-out`
                            }}
                          >
                            Completed {quizHistory.length} test{quizHistory.length !== 1 ? 's' : ''}
                          </Typography>
                          
                          <Chip 
                            icon={<CheckCircleIcon />} 
                            label={quizHistory.length >= 5 ? "Regular Tester" : "Taking Progress Steps"} 
                            color={quizHistory.length >= 5 ? "success" : "primary"}
                            variant="outlined"
                            size="small"
                            sx={{ mb: 1, borderRadius: 2 }}
                          />
                        </Box>
                      ) : (
                        <Box sx={{ textAlign: 'center', p: 2 }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 'bold', 
                              mb: 2,
                              animation: `${fadeIn} 1.2s ease-out`
                            }}
                          >
                            Begin Your Journey
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                            <AutoModeIcon sx={{ fontSize: 60, color: theme.palette.primary.main, opacity: 0.7 }} />
                          </Box>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              opacity: 0.8,
                              animation: `${fadeIn} 1.4s ease-out`
                            }}
                          >
                            Complete your first aptitude test to unlock statistics and personalized recommendations
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card elevation={0} sx={{ 
                    width: '100%',
                    mt: 2,
                    borderRadius: 4,
                    background: darkMode 
                      ? 'linear-gradient(135deg, rgba(66, 66, 120, 0.5), rgba(26, 26, 46, 0.5))' 
                      : 'linear-gradient(135deg, rgba(245, 247, 250, 0.9), rgba(228, 232, 239, 0.9))',
                    border: '1px solid',
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    animation: `${fadeIn} 1.2s ease-out`,
                    transform: 'translateZ(0)',
                    transition: 'all 0.5s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                    }
                  }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 'bold', 
                        mb: 1, 
                        display: 'flex', 
                        alignItems: 'center' 
                      }}>
                        <AssessmentIcon sx={{ mr: 1, color: theme.palette.secondary.main }} />
                        Next Goal
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {quizHistory.length > 0 
                          ? `Improve your average score to ${Math.min(calculateAverage() + 10, 100)}%` 
                          : "Complete your first test to set goals"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}

        {/* Main Content Grid */}
        <Grid container spacing={3}>
          {/* Resume Scanner Section */}
          <Grid item xs={12}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: 4,
                height: '100%',
                border: '1px solid',
                borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                animation: `${fadeIn} 1.4s ease-out`,
                background: darkMode 
                  ? 'linear-gradient(135deg, rgba(66, 66, 120, 0.5), rgba(26, 26, 46, 0.5))' 
                  : 'linear-gradient(135deg, rgba(245, 247, 250, 0.9), rgba(228, 232, 239, 0.9))',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <DescriptionIcon sx={{ mr: 1, color: theme.palette.info.main }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Resume Scanner
                </Typography>
              </Box>
              
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                Get instant feedback on your resume and improve your chances of landing your dream job.
              </Typography>
              
              <Button
                variant="contained"
                color="info"
                href="https://resume-scannerr-qoqctcrl5r5pz8vzqterfj.streamlit.app/"
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<OpenInNewIcon />}
                sx={{ 
                  borderRadius: 28,
                  px: 4,
                  py: 1.5,
                  background: `linear-gradient(45deg, ${theme.palette.info.main}, ${theme.palette.info.light})`,
                  '&:hover': {
                    background: `linear-gradient(45deg, ${theme.palette.info.dark}, ${theme.palette.info.main})`,
                  }
                }}
              >
                Scan Your Resume
              </Button>
            </Paper>
          </Grid>

          {/* Skills & Topics Section */}
          <Grid item xs={12} md={8}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: 4,
                height: '100%',
                border: '1px solid',
                borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                animation: `${fadeIn} 1.6s ease-out`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <SubjectIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Aptitude Topics
                </Typography>
              </Box>
              
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                Our comprehensive aptitude test covers the following topics to help you prepare for placement exams:
              </Typography>
              
              <Grid container spacing={1.5}>
                {aptitudeTopics.map((topic, index) => (
                  <Grid item xs={6} sm={4} key={index}>
                    <Card sx={{ 
                      p: 2, 
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      border: '1px solid',
                      borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                      bgcolor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                        bgcolor: darkMode ? 'rgba(255, 255, 255, 0.1)' : theme.palette.primary.light,
                        color: darkMode ? 'white' : theme.palette.primary.contrastText,
                      }
                    }}>
                      <Typography 
                        variant="body1" 
                        align="center"
                        sx={{ fontWeight: 500 }}
                      >
                        {topic}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Stats & Action Cards */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3} sx={{ animation: `${fadeIn} 1.8s ease-out` }}>
              {/* Stats Card */}
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                  <EqualizerIcon sx={{ mr: 1, color: theme.palette.secondary.main }} />
                  Your Progress
                </Typography>
                
                {quizHistory.length > 0 ? (
                  <Stack spacing={2}>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">Average Score</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{calculateAverage()}%</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={calculateAverage()} 
                        color="primary"
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                    
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">Tests Completed</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{quizHistory.length}</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={Math.min(quizHistory.length * 10, 100)} 
                        color="secondary"
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                    
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">Skill Level</Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 'bold',
                            color: userLevel.color
                          }}
                        >
                          {userLevel.level}
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={getLevelProgress()} 
                        sx={{ height: 8, borderRadius: 4 }}
                        color="success"
                      />
                    </Box>
                    
                    <Button 
                      variant="outlined"
                      onClick={navigateToHistory}
                      startIcon={<HistoryIcon />}
                      sx={{ borderRadius: 28, mt: 1 }}
                    >
                      View History
                    </Button>
                  </Stack>
                ) : (
                  <Box sx={{ py: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      You haven't taken any tests yet.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Start a test to track your progress!
                    </Typography>
                  </Box>
                )}
              </Paper>
              
              {/* Quick Tips Card */}
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                  <TipsAndUpdatesIcon sx={{ mr: 1, color: theme.palette.warning.main }} />
                  Quick Tips
                </Typography>
                
                <List dense>
                  <ListItem sx={{ px: 1, py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Read each question carefully" />
                  </ListItem>
                  <ListItem sx={{ px: 1, py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Practice regularly to improve" />
                  </ListItem>
                  <ListItem sx={{ px: 1, py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Review your incorrect answers" />
                  </ListItem>
                  <ListItem sx={{ px: 1, py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Focus on your weaker topics" />
                  </ListItem>
                </List>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
        
        {/* Placement Tips */}
        <Paper 
          elevation={0} 
          sx={{ 
            mt: 4, 
            p: 3, 
            borderRadius: 4,
            border: '1px solid',
            borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
            animation: `${fadeIn} 2s ease-out`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <AutoModeIcon sx={{ mr: 1, color: theme.palette.success.main }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Placement Success Strategies
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Card sx={{ 
                height: '100%', 
                borderRadius: 3,
                boxShadow: 'none',
                border: '1px solid',
                borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                bgcolor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.5)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                }
              }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ 
                    fontWeight: 'bold', 
                    color: theme.palette.primary.main,
                    pb: 1,
                    borderBottom: '2px solid',
                    borderColor: theme.palette.primary.main,
                    display: 'inline-block'
                  }}>
                    Before the Test
                  </Typography>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Review basic mathematical concepts" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Practice mental calculations" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Work on your problem-solving speed" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Get adequate rest before the test" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Take practice tests under timed conditions" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ 
                height: '100%', 
                borderRadius: 3,
                boxShadow: 'none',
                border: '1px solid',
                borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                bgcolor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.5)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                }
              }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ 
                    fontWeight: 'bold', 
                    color: theme.palette.secondary.main,
                    pb: 1,
                    borderBottom: '2px solid',
                    borderColor: theme.palette.secondary.main,
                    display: 'inline-block'
                  }}>
                    During the Test
                  </Typography>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon fontSize="small" color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary="Read each question carefully" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon fontSize="small" color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary="Manage your time effectively" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon fontSize="small" color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary="Skip difficult questions and return later" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon fontSize="small" color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary="Watch out for trick questions" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon fontSize="small" color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary="Double-check your answers if time permits" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ 
                height: '100%', 
                borderRadius: 3,
                boxShadow: 'none',
                border: '1px solid',
                borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                bgcolor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.5)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                }
              }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ 
                    fontWeight: 'bold', 
                    color: theme.palette.success.main,
                    pb: 1,
                    borderBottom: '2px solid',
                    borderColor: theme.palette.success.main,
                    display: 'inline-block'
                  }}>
                    After Practice Tests
                  </Typography>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Review all incorrect answers" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Understand solution methods" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Identify your weak areas" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Create a focused study plan" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircleIcon fontSize="small" color="success" />
                      </ListItemIcon>
                      <ListItemText primary="Track your improvement over time" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Daily Challenge Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            mt: 4, 
            p: 3, 
            borderRadius: 4,
            border: '1px solid',
            borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
            animation: `${fadeIn} 2.2s ease-out`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <EmojiEventsIcon sx={{ mr: 1, color: theme.palette.warning.main }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Daily Challenge
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ 
                height: '100%',
                borderRadius: 3,
                bgcolor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.5)',
                border: '1px solid',
                borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
              }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Today's Challenge
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Topic: {dailyChallenge.topic}
                  </Typography>
                  {dailyChallenge.question ? (
                    <>
                      <Typography variant="body1" sx={{ mb: 2, fontWeight: 'medium' }}>
                        {dailyChallenge.question.question}
                      </Typography>
                      {!hasAttempted ? (
                        <>
                          <RadioGroup
                            value={selectedAnswer}
                            onChange={handleAnswerChange}
                          >
                            {dailyChallenge.question.options.map((option, index) => (
                              <FormControlLabel
                                key={index}
                                value={option}
                                control={<Radio />}
                                label={option}
                                sx={{ mb: 1 }}
                              />
                            ))}
                          </RadioGroup>
                          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Button 
                              variant="contained" 
                              color="primary"
                              onClick={handleAnswerSubmit}
                              disabled={!selectedAnswer}
                              sx={{ borderRadius: 2 }}
                            >
                              Submit Answer
                            </Button>
                          </Box>
                        </>
                      ) : (
                        <Box sx={{ mt: 2 }}>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              color: selectedAnswer === dailyChallenge.question.correctAnswer 
                                ? 'success.main' 
                                : 'error.main',
                              fontWeight: 'bold',
                              mb: 2
                            }}
                          >
                            {selectedAnswer === dailyChallenge.question.correctAnswer 
                              ? 'Correct! Well done!' 
                              : `Incorrect. The correct answer is: ${dailyChallenge.question.correctAnswer}`}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            You've already attempted today's challenge. Come back tomorrow for a new challenge!
                          </Typography>
                        </Box>
                      )}
                    </>
                  ) : (
                    <Typography variant="body1" color="text.secondary">
                      Loading today's challenge...
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      
      {/* Floating Action Button for quick test start */}
      <Fab 
        color="primary" 
        aria-label="start test"
        onClick={startQuiz}
        sx={{ 
          position: 'fixed',
          bottom: 20,
          right: 20,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
          animation: `${fadeIn} 2.2s ease-out`,
          '&:hover': {
            transform: 'scale(1.1)',
          }
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default Home; 