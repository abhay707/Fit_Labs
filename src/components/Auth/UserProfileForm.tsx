import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
  useToast,
  Heading,
  FormErrorMessage,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';

interface UserProfileFormProps {
  onProfileComplete?: () => void;
  onSkip?: () => void;
}

interface UserProfile {
  username: string;
  age: string;
  weight: string;
  height: string;
  gender: string;
  fitnessLevel: string;
  workoutFrequency: string;
  workoutDuration: string;
  fitnessGoal: string;
  targetWeight: string;
  heightUnit: 'cm' | 'inches';
  weightUnit: 'kg' | 'lbs';
  targetWeightUnit: 'kg' | 'lbs';
}

export const UserProfileForm = ({ onProfileComplete, onSkip }: UserProfileFormProps) => {
  const [profile, setProfile] = useState<UserProfile>({
    username: '',
    age: '',
    weight: '',
    height: '',
    gender: '',
    fitnessLevel: '',
    workoutFrequency: '',
    workoutDuration: '',
    fitnessGoal: '',
    targetWeight: '',
    heightUnit: 'cm',
    weightUnit: 'kg',
    targetWeightUnit: 'kg'
  });

  const [errors, setErrors] = useState<Partial<UserProfile>>({}); 
  const [isLoading, setIsLoading] = useState(false);
  const { updateUserProfile } = useAuth();
  const toast = useToast();

  const validateForm = () => {
    const newErrors: Partial<UserProfile> = {};
    let isValid = true;

    if (!profile.username) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!profile.age || isNaN(Number(profile.age))) {
      newErrors.age = 'Please enter a valid age';
      isValid = false;
    }

    if (!profile.weight || isNaN(Number(profile.weight))) {
      newErrors.weight = 'Please enter a valid weight';
      isValid = false;
    }

    if (!profile.height || isNaN(Number(profile.height))) {
      newErrors.height = 'Please enter a valid height';
      isValid = false;
    }

    if (!profile.gender) {
      newErrors.gender = 'Please select your gender';
      isValid = false;
    }

    if (!profile.fitnessLevel) {
      newErrors.fitnessLevel = 'Please select your fitness level';
      isValid = false;
    }

    if (!profile.workoutFrequency) {
      newErrors.workoutFrequency = 'Please select workout frequency';
      isValid = false;
    }

    if (!profile.workoutDuration) {
      newErrors.workoutDuration = 'Please select workout duration';
      isValid = false;
    }

    if (!profile.fitnessGoal) {
      newErrors.fitnessGoal = 'Please select your fitness goal';
      isValid = false;
    }

    if (!profile.targetWeight || isNaN(Number(profile.targetWeight))) {
      newErrors.targetWeight = 'Please enter a valid target weight';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Convert units to standard format (cm and kg) for storage and calculations
  const convertToStandardUnits = () => {
    let standardWeight = profile.weight;
    let standardHeight = profile.height;
    let standardTargetWeight = profile.targetWeight;
    
    // Convert pounds to kg if needed
    if (profile.weightUnit === 'lbs') {
      standardWeight = (parseFloat(profile.weight) * 0.453592).toFixed(2);
    }
    
    // Convert inches to cm if needed
    if (profile.heightUnit === 'inches') {
      standardHeight = (parseFloat(profile.height) * 2.54).toFixed(2);
    }
    
    // Convert target weight from pounds to kg if needed
    if (profile.targetWeightUnit === 'lbs') {
      standardTargetWeight = (parseFloat(profile.targetWeight) * 0.453592).toFixed(2);
    }
    
    return {
      standardWeight,
      standardHeight,
      standardTargetWeight
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const { standardWeight, standardHeight, standardTargetWeight } = convertToStandardUnits();
      
      const standardProfile = {
        ...profile,
        weight: standardWeight,
        height: standardHeight,
        targetWeight: standardTargetWeight
      };
      
      await updateUserProfile(standardProfile);
      toast({
        title: 'Profile updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      if (onProfileComplete) {
        onProfileComplete();
      }
    } catch (error) {
      toast({
        title: 'Failed to update profile',
        description: 'Please try again',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box 
      width="100%" 
      maxW="500px" 
      p={6} 
      mx="auto" 
      height="90vh" 
      display="flex" 
      flexDirection="column"
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="xl"
      boxShadow="xl"
      position="relative"
      zIndex={1}
      backdropFilter="blur(10px)"
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}

    >
      <VStack spacing={8} align="stretch" flex="1" overflow="auto" css={{
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: useColorModeValue('gray.300', 'gray.600'),
          borderRadius: '24px',
        },
      }}>
        <Box textAlign="center" position="sticky" top={0} bg={useColorModeValue('white', 'gray.800')} zIndex={1} py={3}>
          <Heading size="lg" color={useColorModeValue('blue.600', 'blue.300')} fontWeight="bold">Complete Your Profile</Heading>
          <Text mt={2} color={useColorModeValue('gray.600', 'gray.400')}>Personalize your fitness journey</Text>
        </Box>

        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={5}>
            <Button
              variant="outline"
              colorScheme="gray"
              onClick={onSkip}
              alignSelf="flex-end"
              size="sm"
              _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
              fontWeight="medium"
            >
              Skip for now
            </Button>
            <FormControl isInvalid={!!errors.username}>
              <FormLabel fontWeight="medium">Username</FormLabel>
              <Input
                name="username"
                value={profile.username || undefined}
                onChange={handleChange}
                placeholder="Enter your username"
                size="md"
                borderRadius="md"
                _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px blue.400' }}
                _placeholder={{ color: 'gray.500' }}
              />
              <FormErrorMessage>{errors.username}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.age}>
              <FormLabel fontWeight="medium">Age</FormLabel>
              <Input
                name="age"
                type="number"
                value={profile.age}
                onChange={handleChange}
                placeholder="Enter your age"
                size="md"
                borderRadius="md"
                _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px blue.400' }}
              />
              <FormErrorMessage>{errors.age}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.weight}>
              <FormLabel fontWeight="medium">Current Weight</FormLabel>
              <Flex>
                <Input
                  name="weight"
                  type="number"
                  value={profile.weight}
                  onChange={handleChange}
                  placeholder={`Enter your weight in ${profile.weightUnit}`}
                  mr={2}
                  size="md"
                  borderRadius="md"
                  _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px blue.400' }}
                />
                <Select
                  name="weightUnit"
                  value={profile.weightUnit}
                  onChange={handleChange}
                  width="100px"
                  size="md"
                  borderRadius="md"
                  _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px blue.400' }}
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </Select>
              </Flex>
              <FormErrorMessage>{errors.weight}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.height}>
              <FormLabel fontWeight="medium">Height</FormLabel>
              <Flex>
                <Input
                  name="height"
                  type="number"
                  value={profile.height}
                  onChange={handleChange}
                  placeholder={`Enter your height in ${profile.heightUnit}`}
                  mr={2}
                  size="md"
                  borderRadius="md"
                  _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px blue.400' }}
                />
                <Select
                  name="heightUnit"
                  value={profile.heightUnit}
                  onChange={handleChange}
                  width="100px"
                  size="md"
                  borderRadius="md"
                  _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px blue.400' }}
                >
                  <option value="cm">cm</option>
                  <option value="inches">inches</option>
                </Select>
              </Flex>
              <FormErrorMessage>{errors.height}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.gender}>
              <FormLabel fontWeight="medium">Gender</FormLabel>
              <Select
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                size="md"
                borderRadius="md"
                _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px blue.400' }}
              >
                <option value="" disabled>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="transgender">Transgender</option>
                <option value="non-binary">Non-binary</option>
                <option value="other">Other</option>
              </Select>
              <FormErrorMessage>{errors.gender}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.fitnessLevel}>
              <FormLabel fontWeight="medium">Fitness Level</FormLabel>
              <Select
                name="fitnessLevel"
                value={profile.fitnessLevel}
                onChange={handleChange}
                size="md"
                borderRadius="md"
                _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px blue.400' }}
              >
                <option value="" disabled>Select fitness level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </Select>
              <FormErrorMessage>{errors.fitnessLevel}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.workoutFrequency}>
              <FormLabel fontWeight="medium">Workout Frequency</FormLabel>
              <Select
                name="workoutFrequency"
                value={profile.workoutFrequency}
                onChange={handleChange}
                size="md"
                borderRadius="md"
                _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px blue.400' }}
              >
                <option value="" disabled>Select workout frequency</option>
                <option value="1-2">1-2 times per week</option>
                <option value="3-4">3-4 times per week</option>
                <option value="5+">5+ times per week</option>
              </Select>
              <FormErrorMessage>{errors.workoutFrequency}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.workoutDuration}>
              <FormLabel fontWeight="medium">Preferred Workout Duration</FormLabel>
              <Select
                name="workoutDuration"
                value={profile.workoutDuration}
                onChange={handleChange}
                size="md"
                borderRadius="md"
                _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px blue.400' }}
              >
                <option value="" disabled>Select workout duration</option>
                <option value="15-30">15-30 minutes</option>
                <option value="30-45">30-45 minutes</option>
                <option value="45-60">45-60 minutes</option>
                <option value="60+">60+ minutes</option>
              </Select>
              <FormErrorMessage>{errors.workoutDuration}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.fitnessGoal}>
              <FormLabel fontWeight="medium">Fitness Goal</FormLabel>
              <Select
                name="fitnessGoal"
                value={profile.fitnessGoal}
                onChange={handleChange}
                size="md"
                borderRadius="md"
                _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px blue.400' }}
              >
                <option value="" disabled>Select fitness goal</option>
                <option value="weight_loss">Weight Loss</option>
                <option value="muscle_gain">Muscle Gain</option>
                <option value="endurance">Improve Endurance</option>
                <option value="flexibility">Improve Flexibility</option>
                <option value="overall_health">Overall Health</option>
              </Select>
              <FormErrorMessage>{errors.fitnessGoal}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.targetWeight}>
              <FormLabel fontWeight="medium">Target Weight</FormLabel>
              <Flex>
                <Input
                  name="targetWeight"
                  type="number"
                  value={profile.targetWeight}
                  onChange={handleChange}
                  placeholder={`Enter your target weight in ${profile.targetWeightUnit}`}
                  mr={2}
                  size="md"
                  borderRadius="md"
                  _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px blue.400' }}
                />
                <Select
                  name="targetWeightUnit"
                  value={profile.targetWeightUnit}
                  onChange={handleChange}
                  width="100px"
                  size="md"
                  borderRadius="md"
                  _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px blue.400' }}
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </Select>
              </Flex>
              <FormErrorMessage>{errors.targetWeight}</FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              width="100%"
              isLoading={isLoading}
              loadingText="Updating Profile"
              mt={6}
              size="lg"
              fontWeight="bold"
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
              transition="all 0.2s"
            >
              Save Profile
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};