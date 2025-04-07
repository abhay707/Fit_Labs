import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  VStack,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import workoutImage from '../../assets/workout.svg';

interface InjuryFormProps {
  onSubmit: (injury: string) => void;
  onGoalSelect: () => void;
}

export const InjuryForm = ({ onSubmit, onGoalSelect }: InjuryFormProps) => {
  const [injury, setInjury] = useState('');
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (injury) {
      onSubmit(injury);
    }
  };

  return (
    <Box width="100%" maxW="500px" p={4} mx="auto">
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size="lg">Exercise Recommendations</Heading>
          <Text mt={2} color="gray.600">
            Get personalized exercise recommendations based on your needs
          </Text>
          <Box mt={4} mb={4} display="flex" justifyContent="center">
            <img src={workoutImage} alt="Workout" width="150px" height="150px" />
          </Box>
        </Box>

        <Tabs isFitted variant="enclosed" colorScheme="blue">
          <TabList mb={4}>
            <Tab>Injury-Based</Tab>
            <Tab>Goal-Based</Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel>
              <Box as="form" onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <FormControl>
                    <FormLabel>Select Your Injury</FormLabel>
                    <Select
                      placeholder="Choose an injury"
                      value={injury}
                      onChange={(e) => setInjury(e.target.value)}
                    >
                      <option value="Shoulder Pain">Shoulder Pain</option>
                      <option value="Knee Pain">Knee Pain</option>
                      <option value="Back Pain">Back Pain</option>
                      <option value="Ankle Sprain">Ankle Sprain</option>
                      <option value="Wrist Pain">Wrist Pain</option>
                      <option value="Hip Pain">Hip Pain</option>
                      <option value="Neck Pain">Neck Pain</option>
                      <option value="Elbow Pain">Elbow Pain</option>
                      <option value="Hamstring Strain">Hamstring Strain</option>
                      <option value="Plantar Fasciitis">Plantar Fasciitis</option>
                      <option value="Tennis Elbow">Tennis Elbow</option>
                      <option value="Groin Strain">Groin Strain</option>
                      <option value="Shin Splints">Shin Splints</option>
                      <option value="Rotator Cuff Injury">Rotator Cuff Injury</option>
                      <option value="IT Band Syndrome">IT Band Syndrome</option>
                      <option value="Carpal Tunnel">Carpal Tunnel</option>
                    </Select>
                  </FormControl>

                  <Button
                    type="submit"
                    colorScheme="blue"
                    width="100%"
                    isDisabled={!injury}
                  >
                    Get Injury Exercises
                  </Button>
                </VStack>
              </Box>
            </TabPanel>
            
            <TabPanel>
              <VStack spacing={4}>
                <Box textAlign="center">
                  <Text mb={4}>
                    View exercises tailored to your fitness goal: 
                    {user?.profile?.fitnessGoal ? (
                      <Text as="span" fontWeight="bold"> 
                        {user.profile.fitnessGoal.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Text>
                    ) : (
                      " Please complete your profile to set a fitness goal."
                    )}
                  </Text>
                </Box>
                
                <Button
                  colorScheme="blue"
                  width="100%"
                  onClick={onGoalSelect}
                  isDisabled={!user?.profile?.fitnessGoal}
                >
                  View Goal-Based Exercises
                </Button>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};