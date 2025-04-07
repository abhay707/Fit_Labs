import { useState } from 'react';
import { ChakraProvider, Box, ColorModeScript, useColorModeValue } from '@chakra-ui/react';
import workoutBackground from './assets/Workout Photo from Pexels.jpg';
import theme from './theme/theme';
import { InjuryForm } from './components/InjuryForm/InjuryForm';
import { ExerciseList } from './components/ExerciseList/ExerciseList';
import { Chatbot } from './components/Chatbot/Chatbot';
import { ProfilePage } from './components/ProfilePage/ProfilePage';
import { getExercisesForInjury } from './services/exerciseService';
import { Exercise } from './types';
import { NewNavbar } from './components/Navigation/NewNavbar';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './context/AuthContext';
import { Auth } from './components/Auth/Auth';

function AppContent() {
  const [selectedInjury, setSelectedInjury] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showGoalExercises, setShowGoalExercises] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const handleInjurySubmit = (injury: string) => {
    setSelectedInjury(injury);
    setShowGoalExercises(false);
    const recommendedExercises = getExercisesForInjury(injury);
    setExercises(recommendedExercises);
  };

  const handleGoalSelect = () => {
    setSelectedInjury('');
    setShowGoalExercises(true);
    setExercises([]);
  };

  const handleBack = () => {
    setSelectedInjury('');
    setShowGoalExercises(false);
    setExercises([]);
  };

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  if (!isAuthenticated) {
    return <Auth />;
  }

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  
  return (
    <Box 
      h="100vh" 
      w="100vw" 
      position="fixed" 
      top={0} 
      left={0} 
      bg={bgColor}
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${workoutBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.20,
        zIndex: -1
      }}
    >
      <NewNavbar />
      <Box height="calc(100vh - 70px)" overflow="auto">
        <Routes>
          <Route path="/" element={
            !selectedInjury && !showGoalExercises ? (
              <InjuryForm 
                onSubmit={handleInjurySubmit} 
                onGoalSelect={handleGoalSelect}
              />
            ) : (
              <ExerciseList 
                injury={selectedInjury} 
                exercises={exercises} 
                onBack={handleBack}
              />
            )
          } />
          <Route path="/chat" element={<Chatbot apiKey={GEMINI_API_KEY} />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
