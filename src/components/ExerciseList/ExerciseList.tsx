import {
  Box,
  Heading,
  Text,
  Badge,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Button,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { TodayExercise } from './TodayExercise';
import { useAuth } from '../../context/AuthContext';
import { getExercisesForGoal } from '../../services/goalExerciseService';
import workoutPhoto from '../../assets/Workout Photo Packermann.jpg';

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
}

interface ExerciseListProps {
  injury: string;
  exercises: Exercise[];
  onBack: () => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner':
      return 'green';
    case 'Intermediate':
      return 'orange';
    case 'Advanced':
      return 'red';
    default:
      return 'gray';
  }
};

export const ExerciseList = ({ injury, exercises, onBack }: ExerciseListProps) => {
  const { user } = useAuth();
  const goalExercises = user?.profile?.fitnessGoal ? getExercisesForGoal(user.profile.fitnessGoal) : [];
  
  if (!exercises.length && !goalExercises.length) {
    return (
      <Box textAlign="center" py={10}>
        <Text>No exercises found for {injury}</Text>
      </Box>
    );
  }

  return (
    <Box 
      width="100%" 
      height="100%" 
      display="flex" 
      flexDirection="column" 
      alignItems="center"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${workoutPhoto})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.35,
        zIndex: 0
      }}
    >
      <Box width="100%" p={4} bg={useColorModeValue('white', 'gray.800')} position="sticky" top={0} zIndex={1}>
        <Flex alignItems="center" justifyContent="space-between" mb={4}>
          <Button
            leftIcon={<ArrowBackIcon />}
            onClick={onBack}
            colorScheme="blue"
            variant="ghost"
          >
            Back
          </Button>
        </Flex>
      </Box>
      
      <Box width="100%" maxW="1200px" p={4} flex={1} overflowY="auto">
        <Tabs isFitted variant="enclosed" colorScheme="blue">
          <TabList mb={4}>
            <Tab>Injury Exercises</Tab>
            <Tab>Goal-Based Exercises</Tab>
            <Tab>Today's Workout</Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel>
              <Heading size="lg" textAlign="center" mb={4}>
                Recommended Exercises for {injury}
              </Heading>
              
              {exercises.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                  {exercises.map((exercise) => (
                    <Card key={exercise.id}>
                      <CardHeader>
                        <Heading size="md">{exercise.title}</Heading>
                        <Badge
                          colorScheme={getDifficultyColor(exercise.difficulty)}
                          mt={2}
                        >
                          {exercise.difficulty}
                        </Badge>
                      </CardHeader>
                      <CardBody>
                        <Text>{exercise.description}</Text>
                        <Text mt={2} fontWeight="bold">
                          Duration: {exercise.duration}
                        </Text>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              ) : (
                <Box textAlign="center" py={10}>
                  <Text>No exercises found for {injury}</Text>
                </Box>
              )}
            </TabPanel>
            
            <TabPanel>
              <Heading size="lg" textAlign="center" mb={4}>
                Exercises Based on Your Fitness Goal
                {user?.profile?.fitnessGoal && (
                  <Text fontSize="md" fontWeight="normal" mt={1}>
                    {user.profile.fitnessGoal.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </Text>
                )}
              </Heading>
              
              {goalExercises.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                  {goalExercises.map((exercise) => (
                    <Card key={exercise.id}>
                      <CardHeader>
                        <Heading size="md">{exercise.title}</Heading>
                        <Badge
                          colorScheme={getDifficultyColor(exercise.difficulty)}
                          mt={2}
                        >
                          {exercise.difficulty}
                        </Badge>
                      </CardHeader>
                      <CardBody>
                        <Text>{exercise.description}</Text>
                        <Text mt={2} fontWeight="bold">
                          Duration: {exercise.duration}
                        </Text>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              ) : (
                <Box textAlign="center" py={10}>
                  {user?.profile?.fitnessGoal ? (
                    <Text>No exercises found for your fitness goal. Please check back later.</Text>
                  ) : (
                    <Text>Please complete your profile with a fitness goal to see personalized exercise recommendations.</Text>
                  )}
                </Box>
              )}
            </TabPanel>
            
            <TabPanel>
              <TodayExercise />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};