import {
  Box,
  VStack,
  Heading,
  Text,
  Badge,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Divider,
  List,
  ListItem,
  ListIcon,
  Icon,
} from '@chakra-ui/react';
import { CheckCircleIcon, CalendarIcon } from '@chakra-ui/icons';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';

interface Exercise {
  id: string;
  title: string;
  description: string;
  sets?: string;
  reps?: string;
  duration?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface WorkoutDay {
  day: string;
  exercises: Exercise[];
}

interface WorkoutSchedule {
  goal: string;
  schedule: WorkoutDay[];
}

// Sample workout schedules based on fitness goals
const workoutSchedules: WorkoutSchedule[] = [
  {
    goal: 'weight-loss',
    schedule: [
      {
        day: 'Monday',
        exercises: [
          {
            id: 'wl-1',
            title: 'Cardio Interval Training',
            description: 'Alternate between 30 seconds of high-intensity and 90 seconds of low-intensity cardio.',
            duration: '30 minutes',
            difficulty: 'Intermediate'
          },
          {
            id: 'wl-2',
            title: 'Bodyweight Circuit',
            description: 'Complete 3 rounds of: 15 squats, 10 push-ups, 10 lunges per leg, 30-second plank.',
            sets: '3',
            difficulty: 'Beginner'
          },
        ]
      },
      {
        day: 'Tuesday',
        exercises: [
          {
            id: 'wl-3',
            title: 'Brisk Walking or Light Jogging',
            description: 'Maintain a steady pace that elevates your heart rate.',
            duration: '45 minutes',
            difficulty: 'Beginner'
          },
          {
            id: 'wl-4',
            title: 'Core Workout',
            description: 'Complete 3 sets of: 15 crunches, 30-second plank, 15 bicycle crunches, 15 leg raises.',
            sets: '3',
            difficulty: 'Beginner'
          },
        ]
      },
      {
        day: 'Wednesday',
        exercises: [
          {
            id: 'wl-5',
            title: 'HIIT Workout',
            description: 'Complete 8 rounds of: 20 seconds all-out effort, 10 seconds rest.',
            duration: '25 minutes',
            difficulty: 'Advanced'
          },
          {
            id: 'wl-6',
            title: 'Lower Body Strength',
            description: 'Complete 3 sets of: 15 squats, 12 lunges per leg, 15 glute bridges, 12 calf raises.',
            sets: '3',
            difficulty: 'Intermediate'
          },
        ]
      },
      {
        day: 'Thursday',
        exercises: [
          {
            id: 'wl-7',
            title: 'Active Recovery',
            description: 'Light stretching, yoga, or a leisurely walk to promote recovery.',
            duration: '30 minutes',
            difficulty: 'Beginner'
          },
        ]
      },
      {
        day: 'Friday',
        exercises: [
          {
            id: 'wl-8',
            title: 'Steady-State Cardio',
            description: 'Maintain a moderate intensity throughout the session.',
            duration: '40 minutes',
            difficulty: 'Intermediate'
          },
          {
            id: 'wl-9',
            title: 'Upper Body Circuit',
            description: 'Complete 3 sets of: 10 push-ups, 10 dumbbell rows per arm, 10 shoulder presses, 10 tricep dips.',
            sets: '3',
            difficulty: 'Intermediate'
          },
        ]
      },
      {
        day: 'Saturday',
        exercises: [
          {
            id: 'wl-10',
            title: 'Full Body HIIT',
            description: 'Complete 4 rounds of: 45 seconds work, 15 seconds rest for 6 different exercises.',
            duration: '35 minutes',
            difficulty: 'Advanced'
          },
        ]
      },
      {
        day: 'Sunday',
        exercises: [
          {
            id: 'wl-11',
            title: 'Rest Day',
            description: 'Take a complete rest or do light stretching to recover.',
            duration: 'As needed',
            difficulty: 'Beginner'
          },
        ]
      },
    ]
  },
  {
    goal: 'muscle-gain',
    schedule: [
      {
        day: 'Monday',
        exercises: [
          {
            id: 'mg-1',
            title: 'Chest & Triceps',
            description: 'Bench press: 4 sets of 8-10 reps, Incline dumbbell press: 3 sets of 10-12 reps, Tricep dips: 3 sets of 10-12 reps.',
            sets: '3-4',
            difficulty: 'Intermediate'
          },
          {
            id: 'mg-2',
            title: 'Core Finisher',
            description: 'Plank: 3 sets of 30-60 seconds, Russian twists: 3 sets of 15 reps per side.',
            sets: '3',
            difficulty: 'Intermediate'
          },
        ]
      },
      {
        day: 'Tuesday',
        exercises: [
          {
            id: 'mg-3',
            title: 'Back & Biceps',
            description: 'Pull-ups or assisted pull-ups: 4 sets of 6-8 reps, Bent-over rows: 3 sets of 10-12 reps, Bicep curls: 3 sets of 10-12 reps.',
            sets: '3-4',
            difficulty: 'Intermediate'
          },
          {
            id: 'mg-4',
            title: 'Core Work',
            description: 'Hanging leg raises: 3 sets of 10-12 reps, Side planks: 3 sets of 30 seconds per side.',
            sets: '3',
            difficulty: 'Intermediate'
          },
        ]
      },
      {
        day: 'Wednesday',
        exercises: [
          {
            id: 'mg-5',
            title: 'Active Recovery',
            description: 'Light cardio, stretching, or yoga to promote recovery and maintain mobility.',
            duration: '30-45 minutes',
            difficulty: 'Beginner'
          },
        ]
      },
      {
        day: 'Thursday',
        exercises: [
          {
            id: 'mg-6',
            title: 'Legs & Shoulders',
            description: 'Squats: 4 sets of 8-10 reps, Lunges: 3 sets of 10-12 reps per leg, Shoulder press: 3 sets of 10-12 reps.',
            sets: '3-4',
            difficulty: 'Intermediate'
          },
          {
            id: 'mg-7',
            title: 'Calves & Abs',
            description: 'Calf raises: 4 sets of 15-20 reps, Crunches: 3 sets of 15-20 reps.',
            sets: '3-4',
            difficulty: 'Intermediate'
          },
        ]
      },
      {
        day: 'Friday',
        exercises: [
          {
            id: 'mg-8',
            title: 'Full Body Workout',
            description: 'Deadlifts: 4 sets of 6-8 reps, Push-ups: 3 sets of 10-15 reps, Dumbbell rows: 3 sets of 10-12 reps per arm.',
            sets: '3-4',
            difficulty: 'Advanced'
          },
          {
            id: 'mg-9',
            title: 'Core Circuit',
            description: 'Complete 3 rounds of: 15 sit-ups, 30-second plank, 15 bicycle crunches.',
            sets: '3',
            difficulty: 'Intermediate'
          },
        ]
      },
      {
        day: 'Saturday',
        exercises: [
          {
            id: 'mg-10',
            title: 'Arms & Shoulders',
            description: 'Overhead press: 4 sets of 8-10 reps, Tricep extensions: 3 sets of 10-12 reps, Bicep curls: 3 sets of 10-12 reps.',
            sets: '3-4',
            difficulty: 'Intermediate'
          },
          {
            id: 'mg-11',
            title: 'Light Cardio',
            description: 'Moderate intensity cardio to improve recovery and cardiovascular health.',
            duration: '20-30 minutes',
            difficulty: 'Beginner'
          },
        ]
      },
      {
        day: 'Sunday',
        exercises: [
          {
            id: 'mg-12',
            title: 'Rest Day',
            description: 'Complete rest to allow your muscles to recover and grow.',
            duration: 'Full day',
            difficulty: 'Beginner'
          },
        ]
      },
    ]
  },
  {
    goal: 'weight-gain',
    schedule: [
      {
        day: 'Monday',
        exercises: [
          {
            id: 'wg-1',
            title: 'Compound Lifts - Lower Body',
            description: 'Squats: 4 sets of 6-8 reps, Deadlifts: 4 sets of 6-8 reps, Leg press: 3 sets of 8-10 reps.',
            sets: '3-4',
            difficulty: 'Intermediate'
          },
          {
            id: 'wg-2',
            title: 'Calorie-Dense Meal Planning',
            description: 'Focus on consuming a protein-rich meal within 30 minutes after your workout.',
            difficulty: 'Beginner'
          },
        ]
      },
      {
        day: 'Tuesday',
        exercises: [
          {
            id: 'wg-3',
            title: 'Upper Body Push',
            description: 'Bench press: 4 sets of 6-8 reps, Overhead press: 3 sets of 8-10 reps, Dips: 3 sets of 8-10 reps.',
            sets: '3-4',
            difficulty: 'Intermediate'
          },
          {
            id: 'wg-4',
            title: 'Core Stability',
            description: 'Plank: 3 sets of 45-60 seconds, Ab wheel rollouts: 3 sets of 8-10 reps.',
            sets: '3',
            difficulty: 'Intermediate'
          },
        ]
      },
      {
        day: 'Wednesday',
        exercises: [
          {
            id: 'wg-5',
            title: 'Active Recovery',
            description: 'Light mobility work and stretching to maintain flexibility.',
            duration: '30 minutes',
            difficulty: 'Beginner'
          },
          {
            id: 'wg-6',
            title: 'Nutrition Focus',
            description: 'Ensure youre consuming 300-500 calories above your maintenance level with adequate protein.',
            difficulty: 'Beginner'
          },
        ]
      },
      {
        day: 'Thursday',
        exercises: [
          {
            id: 'wg-7',
            title: 'Upper Body Pull',
            description: 'Pull-ups or lat pulldowns: 4 sets of 6-8 reps, Barbell rows: 3 sets of 8-10 reps, Face pulls: 3 sets of 10-12 reps.',
            sets: '3-4',
            difficulty: 'Intermediate'
          },
          {
            id: 'wg-8',
            title: 'Bicep Focus',
            description: 'Barbell curls: 3 sets of 8-10 reps, Hammer curls: 3 sets of 10-12 reps.',
            sets: '3',
            difficulty: 'Intermediate'
          },
        ]
      },
      {
        day: 'Friday',
        exercises: [
          {
            id: 'wg-9',
            title: 'Lower Body Hypertrophy',
            description: 'Leg extensions: 3 sets of 10-12 reps, Leg curls: 3 sets of 10-12 reps, Calf raises: 4 sets of 15-20 reps.',
            sets: '3-4',
            difficulty: 'Intermediate'
          },
          {
            id: 'wg-10',
            title: 'Core Strength',
            description: 'Weighted sit-ups: 3 sets of 10-12 reps, Russian twists: 3 sets of 12-15 reps per side.',
            sets: '3',
            difficulty: 'Intermediate'
          },
        ]
      },
      {
        day: 'Saturday',
        exercises: [
          {
            id: 'wg-11',
            title: 'Full Body Strength',
            description: 'Focus on compound movements with slightly higher reps: Squats, bench press, rows, overhead press.',
            sets: '3',
            reps: '10-12',
            difficulty: 'Intermediate'
          },
          {
            id: 'wg-12',
            title: 'Recovery Nutrition',
            description: 'Ensure adequate protein and carbohydrate intake post-workout.',
            difficulty: 'Beginner'
          },
        ]
      },
      {
        day: 'Sunday',
        exercises: [
          {
            id: 'wg-13',
            title: 'Rest Day',
            description: 'Complete rest with focus on consuming your calorie and protein targets.',
            difficulty: 'Beginner'
          },
        ]
      },
    ]
  },
  {
    goal: 'maintenance',
    schedule: [
      {
        day: 'Monday',
        exercises: [
          {
            id: 'mt-1',
            title: 'Full Body Strength',
            description: 'Perform 3 sets of 10-12 reps for: squats, push-ups, rows, lunges, and shoulder press.',
            sets: '3',
            difficulty: 'Intermediate'
          },
          {
            id: 'mt-2',
            title: 'Light Cardio',
            description: 'Brisk walking or light jogging to improve cardiovascular health.',
            duration: '20 minutes',
            difficulty: 'Beginner'
          },
        ]
      },
      {
        day: 'Tuesday',
        exercises: [
          {
            id: 'mt-3',
            title: 'Flexibility & Mobility',
            description: 'Complete a full-body stretching routine focusing on major muscle groups.',
            duration: '30 minutes',
            difficulty: 'Beginner'
          },
          {
            id: 'mt-4',
            title: 'Core Stability',
            description: 'Perform 3 sets of: 30-second plank, 15 bird dogs per side, 10 dead bugs per side.',
            sets: '3',
            difficulty: 'Beginner'
          },
        ]
      },
      {
        day: 'Wednesday',
        exercises: [
          {
            id: 'mt-5',
            title: 'Moderate Cardio',
            description: 'Choose from jogging, cycling, swimming, or using the elliptical at a moderate intensity.',
            duration: '30 minutes',
            difficulty: 'Intermediate'
          },
          {
            id: 'mt-6',
            title: 'Upper Body Strength',
            description: 'Perform 3 sets of 10-12 reps for: push-ups, dumbbell rows, shoulder press, and tricep dips.',
            sets: '3',
            difficulty: 'Intermediate'
          },
        ]
      },
      {
        day: 'Thursday',
        exercises: [
          {
            id: 'mt-7',
            title: 'Active Recovery',
            description: 'Light activity such as walking or gentle yoga to promote recovery.',
            duration: '30 minutes',
            difficulty: 'Beginner'
          },
        ]
      },
      {
        day: 'Friday',
        exercises: [
          {
            id: 'mt-8',
            title: 'Lower Body Strength',
            description: 'Perform 3 sets of 10-12 reps for: squats, lunges, glute bridges, and calf raises.',
            sets: '3',
            difficulty: 'Intermediate'
          },
          {
            id: 'mt-9',
            title: 'Core Workout',
            description: 'Complete 3 sets of: 15 crunches, 15 bicycle crunches, 30-second side plank per side.',
            sets: '3',
            difficulty: 'Intermediate'
          },
        ]
      },
      {
        day: 'Saturday',
        exercises: [
          {
            id: 'mt-10',
            title: 'Recreational Activity',
            description: 'Engage in a sport or activity you enjoy: hiking, tennis, basketball, dancing, etc.',
            duration: '45-60 minutes',
            difficulty: 'Intermediate'
          },
        ]
      },
      {
        day: 'Sunday',
        exercises: [
          {
            id: 'mt-11',
            title: 'Rest or Light Activity',
            description: 'Take a complete rest or do light stretching based on how you feel.',
            duration: 'As needed',
            difficulty: 'Beginner'
          },
        ]
      },
    ]
  },
  {
    goal: 'general-fitness',
    schedule: [
      {
        day: 'Monday',
        exercises: [
          {
            id: 'gf-1',
            title: 'Cardio Endurance',
            description: 'Steady-state cardio at 60-70% of your max heart rate: jogging, cycling, or elliptical.',
            duration: '30 minutes',
            difficulty: 'Intermediate'
          },
          {
            id: 'gf-2',
            title: 'Core Circuit',
            description: 'Complete 3 rounds of: 15 crunches, 30-second plank, 10 superman holds, 15 Russian twists per side.',
            sets: '3',
            difficulty: 'Beginner'
          },
        ]
      },
      {
        day: 'Tuesday',
        exercises: [
          {
            id: 'gf-3',
            title: 'Full Body Strength',
            description: 'Perform 3 sets of 12-15 reps for: squats, push-ups, rows, lunges, and shoulder press.',
            sets: '3',
            difficulty: 'Intermediate'
          },
        ]
      },
      {
        day: 'Wednesday',
        exercises: [
          {
            id: 'gf-4',
            title: 'Flexibility & Mobility',
            description: 'Complete a full yoga session or comprehensive stretching routine.',
            duration: '30-45 minutes',
            difficulty: 'Beginner'
          },
        ]
      },
      {
        day: 'Thursday',
        exercises: [
          {
            id: 'gf-5',
            title: 'Interval Training',
            description: 'Complete 10 rounds of: 30 seconds high intensity, 90 seconds low intensity.',
            duration: '25 minutes',
            difficulty: 'Intermediate'
          },
          {
            id: 'gf-6',
            title: 'Core Stability',
            description: 'Perform 3 sets of: 45-second plank, 15 bird dogs per side, 15 dead bugs per side.',
            sets: '3',
            difficulty: 'Intermediate'
          },
        ]
      },
      {
        day: 'Friday',
        exercises: [
          {
            id: 'gf-7',
            title: 'Circuit Training',
            description: 'Complete 3 rounds of: 15 squats, 10 push-ups, 10 dumbbell rows per arm, 10 lunges per leg, 15 jumping jacks.',
            sets: '3',
            difficulty: 'Intermediate'
          },
        ]
      },
      {
        day: 'Saturday',
        exercises: [
          {
            id: 'gf-8',
            title: 'Recreational Activity',
            description: 'Engage in a sport or activity you enjoy: hiking, swimming, cycling, team sports, etc.',
            duration: '45-60 minutes',
            difficulty: 'Intermediate'
          },
        ]
      },
      {
        day: 'Sunday',
        exercises: [
          {
            id: 'gf-9',
            title: 'Active Recovery',
            description: 'Light walking, gentle stretching, or restorative yoga.',
            duration: '20-30 minutes',
            difficulty: 'Beginner'
          },
        ]
      },
    ]
  },
];

export const TodayExercise = () => {
  const { user } = useAuth();
  const [todayWorkout, setTodayWorkout] = useState<WorkoutDay | null>(null);
  const [workoutSchedule, setWorkoutSchedule] = useState<WorkoutDay[] | null>(null);
  
  useEffect(() => {
    console.log('TodayExercise useEffect triggered, fitnessGoal:', user?.profile?.fitnessGoal);
    if (user?.profile?.fitnessGoal) {
      // Find the workout schedule for the user's fitness goal
      const userGoal = user.profile.fitnessGoal;
      const schedule = workoutSchedules.find(s => s.goal === userGoal);
      
      if (schedule) {
        setWorkoutSchedule(schedule.schedule);
        
        // Get today's day of the week
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = days[new Date().getDay()];
        
        // Find today's workout
        const todayWorkout = schedule.schedule.find(day => day.day === today);
        if (todayWorkout) {
          setTodayWorkout(todayWorkout);
        }
      } else {
        console.log('No schedule found for goal:', userGoal);
      }
    } else {
      console.log('No fitness goal found in user profile');
      setWorkoutSchedule(null);
      setTodayWorkout(null);
    }
  }, [user?.profile?.fitnessGoal]); // Depend on the specific property instead of the entire user object

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

  if (!user?.profile?.fitnessGoal) {
    return (
      <Box textAlign="center" py={10}>
        <Text>Please complete your profile with a fitness goal to see personalized exercise recommendations.</Text>
      </Box>
    );
  }

  return (
    <Box width="100%" height="100%" p={4}>
      <VStack spacing={6} align="stretch">
        <Heading size="lg" textAlign="center">Today's Workout</Heading>
        
        {todayWorkout ? (
          <Card>
            <CardHeader>
              <Flex justifyContent="space-between" alignItems="center">
                <Heading size="md">{todayWorkout.day}'s Workout</Heading>
                <Flex alignItems="center">
                  <Icon as={CalendarIcon} mr={2} />
                  <Text>{new Date().toLocaleDateString()}</Text>
                </Flex>
              </Flex>
              <Text mt={2} color="gray.600">
                Based on your {user.profile.fitnessGoal.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} goal
              </Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                {todayWorkout.exercises.map((exercise) => (
                  <Box key={exercise.id} p={4} borderWidth="1px" borderRadius="lg">
                    <Flex justifyContent="space-between" alignItems="center" mb={2}>
                      <Heading size="sm">{exercise.title}</Heading>
                      <Badge colorScheme={getDifficultyColor(exercise.difficulty)}>
                        {exercise.difficulty}
                      </Badge>
                    </Flex>
                    <Text mb={3}>{exercise.description}</Text>
                    <Flex wrap="wrap" gap={2}>
                      {exercise.sets && (
                        <Badge colorScheme="purple" variant="outline">
                          Sets: {exercise.sets}
                        </Badge>
                      )}
                      {exercise.reps && (
                        <Badge colorScheme="blue" variant="outline">
                          Reps: {exercise.reps}
                        </Badge>
                      )}
                      {exercise.duration && (
                        <Badge colorScheme="teal" variant="outline">
                          Duration: {exercise.duration}
                        </Badge>
                      )}
                    </Flex>
                  </Box>
                ))}
              </VStack>
            </CardBody>
          </Card>
        ) : (
          <Box textAlign="center" py={6}>
            <Text>No workout scheduled for today. Take a rest or choose from the weekly schedule below.</Text>
          </Box>
        )}

        <Divider my={4} />
        
        <Heading size="md" mb={4}>Weekly Schedule</Heading>
        
        {workoutSchedule ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {workoutSchedule.map((day) => (
              <Card key={day.day} variant="outline">
                <CardHeader pb={2}>
                  <Heading size="sm">{day.day}</Heading>
                </CardHeader>
                <CardBody pt={0}>
                  <List spacing={1}>
                    {day.exercises.map((exercise) => (
                      <ListItem key={exercise.id}>
                        <Flex alignItems="center">
                          <ListIcon as={CheckCircleIcon} color="green.500" />
                          <Text fontSize="sm">{exercise.title}</Text>
                        </Flex>
                      </ListItem>
                    ))}
                  </List>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <Box textAlign="center">
            <Text>No workout schedule available.</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};