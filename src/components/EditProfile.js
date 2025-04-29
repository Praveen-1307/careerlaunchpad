import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  Avatar,
  Stack,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, updateUser } from '../utils/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const EditProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      // First try to get Firebase user
      const firebaseUser = auth.currentUser;
      
      if (firebaseUser) {
        try {
          // Try to get user data from Firestore
          const docRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            // Use Firestore data
            const userData = docSnap.data();
            setUser({
              ...userData,
              uid: firebaseUser.uid,
              email: firebaseUser.email
            });
            setFirstName(userData.firstName || '');
            setLastName(userData.lastName || '');
            setEmail(firebaseUser.email);
          } else {
            // No Firestore record, use Firebase auth data
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email
            });
            setFirstName(firebaseUser.displayName?.split(' ')[0] || '');
            setLastName(firebaseUser.displayName?.split(' ').slice(1).join(' ') || '');
            setEmail(firebaseUser.email);
          }
          return;
        } catch (err) {
          console.error("Error fetching Firestore data:", err);
        }
      }
      
      // Fallback to local auth if Firebase fails
      const currentUser = getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setFirstName(currentUser.firstName || '');
        setLastName(currentUser.lastName || '');
        setEmail(currentUser.email);
      } else {
        navigate('/signin');
      }
    };
    
    fetchUserData();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!firstName || !lastName) {
      setError('First and last name are required.');
      return;
    }
    
    try {
      const firebaseUser = auth.currentUser;
      
      if (firebaseUser) {
        // Update Firestore document
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        await updateDoc(userDocRef, {
          firstName,
          lastName,
          updatedAt: new Date().toISOString()
        });
        
        // Also update localStorage for components that use it
        const updatedUser = {
          ...user,
          firstName,
          lastName
        };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      } else {
        // Fallback to local auth update
        updateUser({
          ...user,
          firstName,
          lastName,
          password: password ? password : user.password,
        });
      }
      
      setSuccess(true);
      setTimeout(() => navigate('/home'), 1500);
    } catch (err) {
      console.error("Profile update error:", err);
      setError('Failed to update profile.');
    }
  };

  if (!user) return null;

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Stack spacing={2} alignItems="center">
          <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main', fontSize: 32 }}>
            {firstName[0]}{lastName[0]}
          </Avatar>
          <Typography variant="h5" fontWeight="bold">Edit Profile</Typography>
        </Stack>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            label="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            value={email}
            fullWidth
            margin="normal"
            disabled
          />
          {!auth.currentUser && (
            <TextField
              label="New Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              helperText="Leave blank to keep current password"
            />
          )}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2 }}>Profile updated successfully!</Alert>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Save Changes
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => navigate('/home')}
          >
            Cancel
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditProfile; 