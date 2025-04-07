import { useState, useEffect } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { Signup } from './Signup';
import { UserProfileForm } from './UserProfileForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import runningShoes from '../../assets/running_shoes.jpg';

export const Auth = () => {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showAuth, setShowAuth] = useState(true);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (!user.profile) {
        setShowProfileForm(true);
        setShowAuth(false);
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleProfileSkip = () => {
    setShowProfileForm(false);
    setShowAuth(true);
  };

  const handleAuthSuccess = () => {
    setShowProfileForm(true);
    setShowAuth(false);
  };

  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={useColorModeValue('gray.100', 'gray.800')}
      position="fixed"
      top={0}
      left={0}
      p={4}
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${runningShoes})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.4,
        zIndex: 0
      }}
      _after={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: useColorModeValue('blackAlpha.400', 'blackAlpha.600'),
        zIndex: 0
      }}
    >
      {showProfileForm ? (
        <UserProfileForm 
          onProfileComplete={() => navigate('/dashboard')} 
          onSkip={handleProfileSkip}
        />
      ) : showAuth ? (
        <Signup 
          onSignupSuccess={handleAuthSuccess}
        />
      ) : null}
    </Box>
  );
};