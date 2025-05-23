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
import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DescriptionIcon from '@mui/icons-material/Description';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import QuizIcon from '@mui/icons-material/Quiz';
import CategoryIcon from '@mui/icons-material/Category';
import TimerIcon from '@mui/icons-material/Timer';
import { logoutUser, getUsers, getCurrentUser } from '../utils/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { doc, getDoc, setDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const Home = ({ darkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const [quizHistory, setQuizHistory] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [dailyChallenge, setDailyChallenge] = useState({
    topic: "Time and Work",
    questions: {
      easy: null,
      medium: null,
      hard: null
    },
    lastUpdated: null,
    userAnswers: {
      easy: null,
      medium: null,
      hard: null
    }
  });
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileStats, setProfileStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    bestScore: 0,
    totalTimeSpent: 0,
    topicsMastered: 0
  });
  const [achievements, setAchievements] = useState([]);
  const [categoryBreakdown, setCategoryBreakdown] = useState({});
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const [firebaseUser] = useAuthState(auth);
  const [profile, setProfile] = useState(null);
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [topicDialogOpen, setTopicDialogOpen] = useState(false);
  
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
  const getRandomQuestion = (topic, difficulty) => {
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
    const questionsOfDifficulty = topicQuestions[difficulty] || [];
    return questionsOfDifficulty[Math.floor(Math.random() * questionsOfDifficulty.length)];
  };

  // UpdateDailyChallenge: persist daily challenge for the day
  const updateDailyChallenge = () => {
    const today = new Date().toDateString();
    
    // Get user ID from Firebase first, then fallback to local storage
    const userEmail = firebaseUser?.email;
    
    // If no userEmail, we can't save user-specific data
    if (!userEmail) return;
    
    const challengeKey = `dailyChallenge_${userEmail}_${today}`;
    const answersKey = `dailyChallengeAnswers_${userEmail}_${today}`;

    // Try to load challenge from localStorage
    const savedChallenge = JSON.parse(localStorage.getItem(challengeKey) || 'null');
    const savedAnswers = JSON.parse(localStorage.getItem(answersKey) || '{"easy": null, "medium": null, "hard": null}');

    if (savedChallenge && savedChallenge.questions) {
      setDailyChallenge({
        ...savedChallenge,
        userAnswers: savedAnswers
      });
    } else {
      // Generate new challenge for today
      const topics = ["Time and Work", "Time and Distance", "Percentage", "Average", "Ratio and Proportions", "Profit and Loss"];
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      const newQuestions = {
        easy: getRandomQuestion(randomTopic, 'easy'),
        medium: getRandomQuestion(randomTopic, 'medium'),
        hard: getRandomQuestion(randomTopic, 'hard')
      };
      const newChallenge = {
        topic: randomTopic,
        questions: newQuestions,
        lastUpdated: today
      };
      localStorage.setItem(challengeKey, JSON.stringify(newChallenge));
      localStorage.setItem(answersKey, JSON.stringify({ easy: null, medium: null, hard: null }));
      setDailyChallenge({
        ...newChallenge,
        userAnswers: { easy: null, medium: null, hard: null }
      });
    }
  };

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
    navigate('/quiz', { state: { questionCount: 10 } });
  };
  
  const startGeneralQuiz = () => {
    navigate('/quiz', { state: { questionCount: 30, category: 'General Quiz' } });
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
    if (profile && profile.firstName && profile.lastName) {
      return `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`;
    }
    
    if (firebaseUser) {
      if (firebaseUser.displayName) {
        const nameParts = firebaseUser.displayName.split(' ');
        if (nameParts.length >= 2) {
          return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`;
        }
        return nameParts[0].charAt(0);
      }
      return firebaseUser.email.charAt(0).toUpperCase();
    }
    
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.firstName && currentUser.lastName) {
      return `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}`;
    }
    
    return 'U';
  };
  
  // Calculate average score
  const calculateAverage = () => {
    if (!quizHistory || quizHistory.length === 0) return 0;
    const validQuizzes = quizHistory.filter(q => q.totalQuestions && q.totalQuestions > 0);
    const sum = validQuizzes.reduce((total, quiz) => total + (quiz.score / quiz.totalQuestions) * 100, 0);
    return Math.round(sum / validQuizzes.length) || 0;
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
  
  // Leaderboard calculation based on all users
  const getLeaderboard = async () => {
    try {
      // Initialize user profiles map
      const userProfiles = new Map();
      
      // 1. First add users from localStorage (backward compatibility)
      const localUsers = getUsers();
      localUsers.forEach(user => {
        userProfiles.set(user.email, {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          source: 'local'
        });
      });
      
      // 2. Add users from Firestore
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach(doc => {
          const userData = doc.data();
          if (userData.email) {
            userProfiles.set(userData.email, {
              name: `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || userData.email.split('@')[0],
              email: userData.email,
              source: 'firestore',
              uid: doc.id
            });
          }
        });
      } catch (error) {
        console.error("Error fetching Firestore users:", error);
      }
      
      // Map all user emails to quiz history data
      const allUserData = [];
      
      // Process each unique user
      for (const [email, profile] of userProfiles.entries()) {
        // Get user's quiz history from localStorage
        const userHistoryKey = `quizHistory_${email}`;
        const history = JSON.parse(localStorage.getItem(userHistoryKey) || '[]');
        
        // Filter for valid quizzes
        const validQuizzes = history.filter(q => q.totalQuestions && q.totalQuestions > 0);
        
        if (validQuizzes.length > 0) {
          // Calculate average score
          const avgScore = Math.round(validQuizzes.reduce((total, quiz) => total + (quiz.score / quiz.totalQuestions) * 100, 0) / validQuizzes.length);
          
          // Find best score
          const bestScore = Math.max(...validQuizzes.map(quiz => Math.round((quiz.score / quiz.totalQuestions) * 100)));
          
          // Determine level based on score
          let level = "Beginner";
          if (avgScore >= 80) level = "Expert";
          else if (avgScore >= 60) level = "Advanced";
          else if (avgScore >= 40) level = "Intermediate";
          
          // Check if this is the current user
          const currentUser = getCurrentUser();
          const isCurrentUser = currentUser && email === currentUser.email;
          
          // Add user to leaderboard data
          allUserData.push({
            name: profile.name,
            email: email,
            avgScore,
            bestScore,
            totalTests: validQuizzes.length,
            level,
            isCurrentUser
          });
        }
      }
      
      // Sort by average score (descending) and take top 5
      return allUserData.sort((a, b) => b.avgScore - a.avgScore).slice(0, 5);
    } catch (error) {
      console.error("Error generating leaderboard:", error);
      return [];
    }
  };
  
  // Load leaderboard data
  const [leaderboardData, setLeaderboardData] = useState([]);
  
  useEffect(() => {
    const loadLeaderboard = async () => {
      const data = await getLeaderboard();
      setLeaderboardData(data);
    };
    
    loadLeaderboard();
  }, []);

  // When user answers, only update answers in localStorage
  const handleAnswerSubmit = (difficulty) => {
    if (!dailyChallenge.userAnswers[difficulty]) {
      const today = new Date().toDateString();
      
      // Only save for logged in users
      if (!firebaseUser) return;
      
      const userEmail = firebaseUser.email;
      const answersKey = `dailyChallengeAnswers_${userEmail}_${today}`;
      const newUserAnswers = {
        ...dailyChallenge.userAnswers,
        [difficulty]: selectedAnswer
      };
      localStorage.setItem(answersKey, JSON.stringify(newUserAnswers));
      setDailyChallenge(prev => ({
        ...prev,
        userAnswers: newUserAnswers
      }));
      
      // Save score to user history if correct
      if (selectedAnswer === dailyChallenge.questions[difficulty].correctAnswer) {
        const userHistoryKey = `quizHistory_${userEmail}`;
        const history = JSON.parse(localStorage.getItem(userHistoryKey) || '[]');
        history.push({
          score: 100,
          date: new Date().toISOString(),
          topic: dailyChallenge.topic,
          difficulty: difficulty
        });
        localStorage.setItem(userHistoryKey, JSON.stringify(history));
        setQuizHistory(history);
      }
    }
  };

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  useEffect(() => {
    if (firebaseUser) {
      const fetchProfile = async () => {
        try {
          const docRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setProfile(userData);
            
            // Store current user in localStorage to ensure consistency
            const currentUserData = {
              firstName: userData.firstName || firebaseUser.displayName?.split(' ')[0] || 'User',
              lastName: userData.lastName || firebaseUser.displayName?.split(' ').slice(1).join(' ') || '',
              email: firebaseUser.email,
              uid: firebaseUser.uid
            };
            
            localStorage.setItem('currentUser', JSON.stringify(currentUserData));
          } else {
            // If user document doesn't exist, create it based on auth data
            const newUserData = {
              firstName: firebaseUser.displayName?.split(' ')[0] || 'User',
              lastName: firebaseUser.displayName?.split(' ').slice(1).join(' ') || '',
              email: firebaseUser.email,
              createdAt: new Date().toISOString()
            };
            
            await setDoc(doc(db, 'users', firebaseUser.uid), newUserData);
            setProfile(newUserData);
            
            // Also save to localStorage
            localStorage.setItem('currentUser', JSON.stringify({
              ...newUserData,
              uid: firebaseUser.uid
            }));
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };
      
      fetchProfile();
      
      // Get quiz history for this specific user
      const historyKey = `quizHistory_${firebaseUser.email}`;
      const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
      setQuizHistory(history);
      calculateProfileStats(history);
      calculateAchievements(history);
      calculateCategoryBreakdown(history);
    }
  }, [firebaseUser]);

  useEffect(() => {
    if (quizHistory && quizHistory.length > 0) {
      // Use the same logic as ScoreHistory
      const validQuizzes = quizHistory.filter(q => q.totalQuestions && q.totalQuestions > 0);
      const totalQuizzes = validQuizzes.length;
      const averageScore = totalQuizzes > 0
        ? Math.round(validQuizzes.reduce((total, quiz) => total + (quiz.score / quiz.totalQuestions) * 100, 0) / totalQuizzes)
        : 0;
      const bestScore = totalQuizzes > 0
        ? Math.max(...validQuizzes.map(quiz => Math.round((quiz.score / quiz.totalQuestions) * 100)))
        : 0;
      const totalTimeSpent = validQuizzes.reduce((total, quiz) => total + (quiz.timeSpent || 0), 0);
      const topicsMastered = aptitudeTopics.filter(topic => {
        const topicQuizzes = quizHistory.filter(q => q.topic === topic);
        return topicQuizzes.length > 0 && 
               topicQuizzes.every(q => ((q.score / (q.totalQuestions || 1)) * 100) >= 70);
      }).length;
      setProfileStats({
        totalQuizzes,
        averageScore,
        bestScore,
        totalTimeSpent,
        topicsMastered
      });
    } else {
      setProfileStats({
        totalQuizzes: 0,
        averageScore: 0,
        bestScore: 0,
        totalTimeSpent: 0,
        topicsMastered: 0
      });
    }
  }, [quizHistory, aptitudeTopics]);

  useEffect(() => {
    if (firebaseUser) {
      const historyKey = `quizHistory_${firebaseUser.email}`;
      const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
      setQuizHistory(history);
      calculateProfileStats(history);
      calculateAchievements(history);
      calculateCategoryBreakdown(history);
    }
  }, [firebaseUser]);

  useEffect(() => {
    if (firebaseUser) {
      updateDailyChallenge();
    }
  }, [firebaseUser]);

  const calculateProfileStats = (history) => {
    const validQuizzes = history.filter(q => q.totalQuestions && q.totalQuestions > 0);
    const totalQuizzes = validQuizzes.length;
    const totalTimeSpent = validQuizzes.reduce((total, quiz) => total + (quiz.timeSpent || 0), 0);
    const averageScore = totalQuizzes > 0 
      ? Math.round(validQuizzes.reduce((total, quiz) => total + (quiz.score / quiz.totalQuestions) * 100, 0) / totalQuizzes)
      : 0;
    const bestScore = totalQuizzes > 0
      ? Math.max(...validQuizzes.map(quiz => Math.round((quiz.score / quiz.totalQuestions) * 100)))
      : 0;
    const topicsMastered = Object.keys(categoryBreakdown).filter(
      category => categoryBreakdown[category].correct / categoryBreakdown[category].total >= 0.8
    ).length;

    setProfileStats({
      totalQuizzes,
      averageScore,
      bestScore,
      totalTimeSpent,
      topicsMastered
    });
  };

  const calculateAchievements = (history) => {
    const newAchievements = [];
    const totalQuizzes = history.length;
    const validQuizzes = history.filter(q => q.totalQuestions && q.totalQuestions > 0);
    const highestScore = validQuizzes.length > 0
      ? Math.max(...validQuizzes.map(quiz => Math.round((quiz.score / quiz.totalQuestions) * 100)))
      : 0;
    const averageScore = validQuizzes.length > 0
      ? Math.round(validQuizzes.reduce((total, quiz) => total + (quiz.score / quiz.totalQuestions) * 100, 0) / validQuizzes.length)
      : 0;

    if (totalQuizzes >= 5) newAchievements.push({ name: 'Quiz Enthusiast', icon: '🏆' });
    if (totalQuizzes >= 10) newAchievements.push({ name: 'Quiz Master', icon: '👑' });
    if (highestScore >= 90) newAchievements.push({ name: 'Perfectionist', icon: '💯' });
    if (averageScore >= 80) newAchievements.push({ name: 'Consistent Performer', icon: '📈' });
    if (history.some(q => q.score === q.totalQuestions)) newAchievements.push({ name: 'Perfect Score', icon: '⭐' });
    if (profileStats.topicsMastered >= 3) newAchievements.push({ name: 'Topic Master', icon: '🎯' });

    setAchievements(newAchievements);
  };

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

  // Get user name for display
  const getUserDisplayName = () => {
    if (profile && profile.firstName) {
      return `${profile.firstName} ${profile.lastName || ''}`;
    }
    
    if (firebaseUser) {
      if (firebaseUser.displayName) {
        return firebaseUser.displayName;
      }
      return firebaseUser.email.split('@')[0];
    }
    
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.firstName) {
      return `${currentUser.firstName} ${currentUser.lastName || ''}`;
    }
    
    return 'User';
  };

  const handleSpeedDialOpen = () => {
    setSpeedDialOpen(true);
  };

  const handleSpeedDialClose = () => {
    setSpeedDialOpen(false);
  };
  
  const startTopicQuiz = (topic) => {
    navigate('/quiz', { state: { selectedTopic: topic, questionCount: 10 } });
  };
  
  const startTimedQuiz = () => {
    navigate('/quiz', { state: { timed: true, questionCount: 10 } });
  };
  
  const openTopicDialog = () => {
    setTopicDialogOpen(true);
    handleSpeedDialClose();
  };
  
  const handleTopicDialogClose = () => {
    setTopicDialogOpen(false);
  };
  
  const selectTopic = (topic) => {
    startTopicQuiz(topic);
    setTopicDialogOpen(false);
  };
  
  const speedDialActions = [
    { icon: <AssessmentIcon />, name: 'View History', action: navigateToHistory },
    { icon: <TimerIcon />, name: 'Timed Quiz', action: startTimedQuiz },
    { icon: <CategoryIcon />, name: 'Topic Quiz', action: openTopicDialog },
    { icon: <QuizIcon />, name: 'Standard Quiz', action: startQuiz }
  ];

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
              display: 'flex',
              alignItems: 'center',
              background: darkMode 
                ? 'linear-gradient(45deg, #2196F3, #21CBF3)' 
                : 'linear-gradient(45deg, #1565C0, #1976D2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            <RocketLaunchIcon sx={{ mr: 1.5, color: '#1976d2', fontSize: '1.8rem' }} />
            Career Launch Pad
          </Typography>
          <IconButton 
            color={darkMode ? "inherit" : "primary"} 
            onClick={toggleTheme} 
            sx={{ 
              mr: 1,
              bgcolor: darkMode ? 'transparent' : 'rgba(25, 118, 210, 0.08)',
              '&:hover': {
                bgcolor: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(25, 118, 210, 0.12)',
              }
            }}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon sx={{ color: '#1976d2' }} />}
          </IconButton>
          <Tooltip title="Profile">
            <IconButton 
              color={darkMode ? "inherit" : "primary"}
              onClick={handleProfileClick} 
              sx={{ mr: 1 }}
              aria-controls={open ? 'profile-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar 
                  onClick={handleProfileClick}
                  sx={{ 
                    cursor: 'pointer',
                    bgcolor: darkMode ? 'primary.main' : '#1976d2',
                    color: '#fff',
                    '&:hover': {
                      bgcolor: darkMode ? 'primary.dark' : '#1565c0',
                    }
                  }}
                >
                  {getInitials()}
                </Avatar>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    ml: 1, 
                    display: { xs: 'none', md: 'block' },
                    fontWeight: 'medium',
                    color: darkMode ? 'inherit' : '#1976d2'
                  }}
                >
                  {getUserDisplayName()}
                </Typography>
              </Box>
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
            {profile && (
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
                        {getUserDisplayName()}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {profile?.email || getCurrentUser()?.email}
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
        {/* Top Banner: Welcome + Achievements */}
        {profile && (
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Left: Welcome and Practice Info */}
            <Grid item xs={12} md={8}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid', borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', height: '100%' }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Welcome back, {profile.firstName?.toUpperCase()}!
                </Typography>
                <Typography variant="h6" sx={{ mb: 2, opacity: 0.8 }}>
                  Ready to boost your aptitude skills today?
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip 
                    icon={<TipsAndUpdatesIcon />} 
                    label={getStudyRecommendation()}
                    color="primary" 
                    variant="outlined"
                    sx={{ borderRadius: 2, py: 1.5 }}
                  />
                </Box>
                <Button 
                  variant="contained" 
                  size="large"
                  startIcon={<SchoolIcon />}
                  onClick={startGeneralQuiz}
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    borderRadius: 28,
                    background: 'linear-gradient(90deg, #a445b2 0%, #fa4299 100%)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    letterSpacing: 1,
                    '&:hover': {
                      boxShadow: '0 12px 20px rgba(0, 0, 0, 0.2)',
                      transform: 'translateY(-3px)',
                      background: 'linear-gradient(90deg, #fa4299 0%, #a445b2 100%)',
                    }
                  }}
                >
                  START NEW TEST
                </Button>
                <Box sx={{ mt: 4, p: 2, borderLeft: '4px solid', borderColor: theme.palette.primary.main, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: '0 8px 8px 0' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.primary.main, mb: 1 }}>
                    Why Practice Matters
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Regular practice of aptitude questions can improve your:
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}><Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircleIcon fontSize="small" color="success" sx={{ mr: 1 }} /><Typography variant="body2">Problem-solving speed</Typography></Box></Grid>
                    <Grid item xs={6}><Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircleIcon fontSize="small" color="success" sx={{ mr: 1 }} /><Typography variant="body2">Pattern recognition</Typography></Box></Grid>
                    <Grid item xs={6}><Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircleIcon fontSize="small" color="success" sx={{ mr: 1 }} /><Typography variant="body2">Mental calculation</Typography></Box></Grid>
                    <Grid item xs={6}><Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircleIcon fontSize="small" color="success" sx={{ mr: 1 }} /><Typography variant="body2">Time management</Typography></Box></Grid>
                  </Grid>
                  <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic', opacity: 0.7 }}>
                    Students who practice regularly are 3x more likely to succeed in placement aptitude tests.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            {/* Right: Upcoming Placement Drives, Daily Aptitude Tip, Leaderboard */}
            <Grid item xs={12} md={4}>
              <Stack spacing={3} sx={{ animation: `${fadeIn} 1.8s ease-out` }}>
                {/* Daily Aptitude Tip */}
                <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid', borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                    <TipsAndUpdatesIcon sx={{ mr: 1, color: theme.palette.warning.main }} />
                    Daily Aptitude Tip
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic' }}>
                    {quotes[new Date().getDate() % quotes.length]}
                  </Typography>
                </Paper>
                {/* Leaderboard */}
                <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid', borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }}>
                  <Typography variant="h6" gutterBottom sx={{ 
                    fontWeight: 'bold', 
                    display: 'flex', 
                    alignItems: 'center',
                    pb: 2
                  }}>
                    <EmojiEventsIcon sx={{ mr: 1, color: '#ff2c7d' }} />
                    Leaderboard
                  </Typography>
                  
                  <Box sx={{ maxWidth: '450px', mx: 'auto' }}>
                    {leaderboardData.length > 0 ? (
                      leaderboardData.map((user, idx) => (
                        <Paper
                          key={user.email}
                          elevation={0}
                          sx={{
                            p: 2,
                            mb: 1.5,
                            borderRadius: 3,
                            backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(240, 242, 245, 0.8)',
                            border: user.isCurrentUser ? '1px solid' : 'none',
                            borderColor: user.isCurrentUser ? 'primary.main' : 'transparent',
                            position: 'relative',
                            overflow: 'hidden'
                          }}
                        >
                          {/* Rank indicator */}
                          <Box
                            sx={{
                              position: 'absolute',
                              left: 0,
                              top: '50%',
                              transform: 'translateY(-50%)',
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              backgroundColor: idx === 0 ? '#FFD700' : idx === 1 ? '#C0C0C0' : idx === 2 ? '#CD7F32' : 'primary.main',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              ml: 1.5,
                              color: idx < 3 ? 'black' : 'white',
                              fontWeight: 'bold',
                              fontSize: '18px'
                            }}
                          >
                            {idx + 1}
                          </Box>

                          <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column',
                            ml: 6,
                            mr: 1
                          }}>
                            {/* User info */}
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              justifyContent: 'space-between' 
                            }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography 
                                  variant="subtitle1" 
                                  color="primary.main"
                                  fontWeight="bold"
                                >
                                  {user.name.toUpperCase()}
                                </Typography>
                                {user.isCurrentUser && (
                                  <Chip 
                                    label="You" 
                                    size="small" 
                                    sx={{ 
                                      ml: 1, 
                                      backgroundColor: darkMode ? 'rgba(25, 118, 210, 0.3)' : 'rgba(25, 118, 210, 0.15)',
                                      color: darkMode ? 'primary.light' : 'primary.dark'
                                    }} 
                                  />
                                )}
                                {idx === 0 && (
                                  <EmojiEventsIcon 
                                    sx={{ ml: 1, color: '#FFD700' }}
                                  />
                                )}
                              </Box>
                              <Typography 
                                variant="h6" 
                                color="error"
                                fontWeight="bold"
                              >
                                {user.avgScore}%
                              </Typography>
                            </Box>
                            
                            {/* User stats */}
                            <Box sx={{ 
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              mt: 1
                            }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography 
                                  variant="body2" 
                                  color="text.secondary"
                                >
                                  {user.totalTests} {user.totalTests === 1 ? 'test' : 'tests'}
                                </Typography>
                                <Chip 
                                  label={user.level} 
                                  size="small"
                                  sx={{ 
                                    ml: 1.5,
                                    backgroundColor: darkMode ? 'rgba(158, 158, 158, 0.2)' : 'rgba(158, 158, 158, 0.15)', 
                                    color: 'text.secondary',
                                    height: '20px',
                                    fontSize: '0.7rem'
                                  }}
                                />
                              </Box>
                              <Typography 
                                variant="body2" 
                                color="success.main"
                              >
                                Best: {user.bestScore}%
                              </Typography>
                            </Box>
                          </Box>
                        </Paper>
                      ))
                    ) : (
                      <Paper 
                        elevation={0}
                        sx={{
                          p: 3,
                          textAlign: 'center',
                          borderRadius: 3,
                          backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(240, 242, 245, 0.8)',
                        }}
                      >
                        <Typography color="text.secondary">
                          No data available
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Take quizzes to appear on the leaderboard
                        </Typography>
                      </Paper>
                    )}
                  </Box>
                  
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Button
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => navigate('/score-history')}
                      sx={{ 
                        textTransform: 'none',
                        fontWeight: 'medium',
                        color: darkMode ? 'primary.light' : 'primary.main'
                      }}
                    >
                      View Full History
                    </Button>
                  </Box>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
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
            {['easy', 'medium', 'hard'].map((difficulty) => (
              <Grid item xs={12} sm={4} key={difficulty}>
                <Card sx={{ 
                  height: '100%',
                  borderRadius: 3,
                  bgcolor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.5)',
                  border: '1px solid',
                  borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ 
                      textTransform: 'capitalize',
                      color: difficulty === 'easy' ? 'success.main' : 
                             difficulty === 'medium' ? 'warning.main' : 'error.main'
                    }}>
                      {difficulty} Challenge
                    </Typography>
                    {dailyChallenge.questions[difficulty] ? (
                      <>
                        <Typography variant="body1" sx={{ mb: 2, fontWeight: 'medium' }}>
                          {dailyChallenge.questions[difficulty].question}
                        </Typography>
                        {!dailyChallenge.userAnswers[difficulty] ? (
                          <>
                            <RadioGroup
                              value={selectedAnswer}
                              onChange={handleAnswerChange}
                            >
                              {dailyChallenge.questions[difficulty].options.map((option, index) => (
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
                                color={difficulty === 'easy' ? 'success' : 
                                       difficulty === 'medium' ? 'warning' : 'error'}
                                onClick={() => handleAnswerSubmit(difficulty)}
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
                                color: dailyChallenge.userAnswers[difficulty] === dailyChallenge.questions[difficulty].correctAnswer 
                                  ? 'success.main' 
                                  : 'error.main',
                                fontWeight: 'bold',
                                mb: 2
                              }}
                            >
                              {dailyChallenge.userAnswers[difficulty] === dailyChallenge.questions[difficulty].correctAnswer 
                                ? 'Correct! Well done!' 
                                : `Incorrect. The correct answer is: ${dailyChallenge.questions[difficulty].correctAnswer}`}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              You've already attempted this challenge. Come back tomorrow for new challenges!
                            </Typography>
                          </Box>
                        )}
                      </>
                    ) : (
                      <Typography variant="body1" color="text.secondary">
                        Loading challenge...
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
      
      {/* Topic selection dialog */}
      <Dialog 
        open={topicDialogOpen} 
        onClose={handleTopicDialogClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            background: darkMode ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' : 'white'
          }
        }}
      >
        <DialogTitle sx={{ 
          fontWeight: 'bold', 
          color: darkMode ? 'white' : 'inherit',
          borderBottom: '1px solid',
          borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          pb: 2
        }}>
          Select Quiz Topic
        </DialogTitle>
        <DialogContent>
          <List>
            <ListItem button onClick={() => selectTopic('Random')} sx={{ borderRadius: 2, mb: 1 }}>
              <ListItemIcon>
                <CategoryIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Random Mix" 
                secondary="Questions from various topics"
                primaryTypographyProps={{ fontWeight: 'bold', color: darkMode ? 'white' : 'inherit' }}
                secondaryTypographyProps={{ color: darkMode ? 'rgba(255,255,255,0.7)' : 'inherit' }}
              />
            </ListItem>
            {aptitudeTopics.map((topic) => (
              <ListItem key={topic} button onClick={() => selectTopic(topic)} sx={{ borderRadius: 2, mb: 1 }}>
                <ListItemIcon>
                  <CategoryIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={topic}
                  primaryTypographyProps={{ fontWeight: 'bold', color: darkMode ? 'white' : 'inherit' }}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: '1px solid', borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
          <Button onClick={handleTopicDialogClose} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* SpeedDial */}
      <SpeedDial
        ariaLabel="Test options"
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          '& .MuiSpeedDial-actions': {
            gap: '10px',
            paddingBottom: '16px'
          }
        }}
        icon={<SpeedDialIcon icon={<AddIcon />} />}
        onClose={handleSpeedDialClose}
        onOpen={handleSpeedDialOpen}
        open={speedDialOpen}
        direction="up"
        FabProps={{
          sx: {
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
            animation: `${fadeIn} 2.2s ease-out`,
            '&:hover': {
              transform: 'scale(1.05)',
              background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
            }
          }
        }}
      >
        {speedDialActions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                width: '180px', 
                justifyContent: 'space-between',
              }}>
                <Typography variant="body2" sx={{ 
                  fontWeight: 'medium',
                  color: 'text.primary', 
                  pl: 2,
                  flexGrow: 1
                }}>
                  {action.name}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  bgcolor: 'background.paper',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  color: theme.palette.primary.main
                }}>
                  {action.icon}
                </Box>
              </Box>
            }
            tooltipTitle=""
            onClick={() => {
              action.action();
              handleSpeedDialClose();
            }}
            FabProps={{
              sx: {
                bgcolor: 'background.paper',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
                borderRadius: '24px',
                width: 'auto',
                height: '48px',
                '&:hover': {
                  transform: 'scale(1.03)',
                  bgcolor: 'background.paper',
                }
              }
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default Home; 