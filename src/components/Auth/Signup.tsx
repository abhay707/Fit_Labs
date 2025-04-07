import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  Heading,
  FormErrorMessage,
  Select,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
// Background image moved to Auth component

interface SignupProps {
  onSignupSuccess: () => void;
}

interface SignupForm {
  email: string;
  password: string;
  confirmPassword: string;
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

export const Signup = ({ onSignupSuccess }: SignupProps) => {
  const [form, setForm] = useState<SignupForm>({
    email: '',
    password: '',
    confirmPassword: '',
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

  const [errors, setErrors] = useState<Partial<SignupForm>>({});
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();
  const toast = useToast();

  const validateForm = () => {
    const newErrors: Partial<SignupForm> = {};
    let isValid = true;

    if (!form.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    if (!form.username) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!form.age || isNaN(Number(form.age))) {
      newErrors.age = 'Please enter a valid age';
      isValid = false;
    }

    if (!form.weight || isNaN(Number(form.weight))) {
      newErrors.weight = 'Please enter a valid weight';
      isValid = false;
    }

    if (!form.height || isNaN(Number(form.height))) {
      newErrors.height = 'Please enter a valid height';
      isValid = false;
    }

    if (!form.gender) {
      newErrors.gender = 'Please select your gender';
      isValid = false;
    }

    if (!form.fitnessLevel) {
      newErrors.fitnessLevel = 'Please select your fitness level';
      isValid = false;
    }

    if (!form.workoutFrequency) {
      newErrors.workoutFrequency = 'Please select workout frequency';
      isValid = false;
    }

    if (!form.workoutDuration) {
      newErrors.workoutDuration = 'Please select workout duration';
      isValid = false;
    }

    if (!form.fitnessGoal) {
      newErrors.fitnessGoal = 'Please select your fitness goal';
      isValid = false;
    }

    if (!form.targetWeight || isNaN(Number(form.targetWeight))) {
      newErrors.targetWeight = 'Please enter a valid target weight';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Convert units to standard format (cm and kg) for storage and calculations
  const convertToStandardUnits = () => {
    let standardWeight = form.weight;
    let standardHeight = form.height;
    let standardTargetWeight = form.targetWeight;
    
    // Convert pounds to kg if needed
    if (form.weightUnit === 'lbs') {
      standardWeight = (parseFloat(form.weight) * 0.453592).toFixed(2);
    }
    
    // Convert inches to cm if needed
    if (form.heightUnit === 'inches') {
      standardHeight = (parseFloat(form.height) * 2.54).toFixed(2);
    }
    
    // Convert target weight from pounds to kg if needed
    if (form.targetWeightUnit === 'lbs') {
      standardTargetWeight = (parseFloat(form.targetWeight) * 0.453592).toFixed(2);
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
      
      const profile = {
        username: form.username,
        age: form.age,
        weight: standardWeight,
        height: standardHeight,
        gender: form.gender,
        fitnessLevel: form.fitnessLevel,
        workoutFrequency: form.workoutFrequency,
        workoutDuration: form.workoutDuration,
        fitnessGoal: form.fitnessGoal,
        targetWeight: standardTargetWeight,
        // Store the user's preferred units for future reference
        heightUnit: form.heightUnit,
        weightUnit: form.weightUnit,
        targetWeightUnit: form.targetWeightUnit
      };
      
      await signup(form.email, form.password, profile);
      toast({
        title: 'Account created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onSignupSuccess();
    } catch (error) {
      toast({
        title: 'Signup failed',
        description: 'An error occurred while creating your account',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      width="100%" 
      maxW="600px" 
      p={6} 
      mx="auto" 
      maxHeight="90vh" 
      display="flex" 
      flexDirection="column" 
      bg={useColorModeValue('white', 'gray.800')} 
      borderRadius="xl" 
      boxShadow="xl"
      position="relative"
      zIndex={1}
      overflow="auto"
      backdropFilter="blur(10px)"
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      css={{
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: useColorModeValue('gray.300', 'gray.600'),
          borderRadius: '24px',
        },
      }}
    >
      <Box position="relative" zIndex={1}>
        <VStack spacing={6} align="stretch" flex="1">
          <Box textAlign="center" position="sticky" top={0} bg={useColorModeValue('white', 'gray.700')} zIndex={1} py={2}>
            <Heading size="lg" color={useColorModeValue('blue.600', 'blue.300')}>Create Account</Heading>
            <Text color={useColorModeValue('gray.600', 'gray.300')}>Sign up to start your Fitness journey</Text>
          </Box>

          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={6} divider={<Box borderColor="gray.200" />}>
            {/* Account Information Section */}
            <Box width="100%">
              <Heading size="sm" color={useColorModeValue('gray.700', 'gray.300')} mb={4}>Account Information</Heading>
              <VStack spacing={4}>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.confirmPassword}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
              <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
            </FormControl>

              </VStack>
            </Box>

            {/* Personal Information Section */}
            <Box width="100%">
              <Heading size="sm" color={useColorModeValue('gray.700', 'gray.300')} mb={4}>Personal Information</Heading>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.username}>
                  <FormLabel>Username</FormLabel>
                  <Input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                  />
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                </FormControl>

                <Box width="100%" display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={4}>
                  <FormControl isInvalid={!!errors.age}>
                    <FormLabel>Age</FormLabel>
                    <Input
                      name="age"
                      type="number"
                      value={form.age}
                      onChange={handleChange}
                      placeholder="Enter your age"
                    />
                    <FormErrorMessage>{errors.age}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.gender}>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      placeholder="Select gender"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Select>
                    <FormErrorMessage>{errors.gender}</FormErrorMessage>
                  </FormControl>
                </Box>

                <Box width="100%" display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={4}>
                  <FormControl isInvalid={!!errors.height}>
                    <FormLabel>Height</FormLabel>
                    <Flex>
                      <Input
                        name="height"
                        type="number"
                        value={form.height}
                        onChange={handleChange}
                        placeholder={`Enter your height in ${form.heightUnit}`}
                        mr={2}
                      />
                      <Select
                        name="heightUnit"
                        value={form.heightUnit}
                        onChange={handleChange}
                        width="100px"
                      >
                        <option value="cm">cm</option>
                        <option value="inches">inches</option>
                      </Select>
                    </Flex>
                    <FormErrorMessage>{errors.height}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.weight}>
                    <FormLabel>Current Weight</FormLabel>
                    <Flex>
                      <Input
                        name="weight"
                        type="number"
                        value={form.weight}
                        onChange={handleChange}
                        placeholder={`Enter your weight in ${form.weightUnit}`}
                        mr={2}
                      />
                      <Select
                        name="weightUnit"
                        value={form.weightUnit}
                        onChange={handleChange}
                        width="100px"
                      >
                        <option value="kg">kg</option>
                        <option value="lbs">lbs</option>
                      </Select>
                    </Flex>
                    <FormErrorMessage>{errors.weight}</FormErrorMessage>
                  </FormControl>
                </Box>
              </VStack>
            </Box>

            {/* Fitness Goals Section */}
            <Box width="100%">
              <Heading size="sm" color={useColorModeValue('gray.700', 'gray.300')} mb={4}>Fitness Goals & Preferences</Heading>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.fitnessLevel}>
                  <FormLabel>Fitness Level</FormLabel>
                  <Select
                    name="fitnessLevel"
                    value={form.fitnessLevel}
                    onChange={handleChange}
                    placeholder="Select fitness level"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </Select>
                  <FormErrorMessage>{errors.fitnessLevel}</FormErrorMessage>
                </FormControl>

                <Box width="100%" display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={4}>
                  <FormControl isInvalid={!!errors.workoutFrequency}>
                    <FormLabel>Workout Frequency</FormLabel>
                    <Select
                      name="workoutFrequency"
                      value={form.workoutFrequency}
                      onChange={handleChange}
                      placeholder="Select frequency"
                    >
                      <option value="1-2">1-2 times per week</option>
                      <option value="3-4">3-4 times per week</option>
                      <option value="5+">5+ times per week</option>
                    </Select>
                    <FormErrorMessage>{errors.workoutFrequency}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.workoutDuration}>
                    <FormLabel>Workout Duration</FormLabel>
                    <Select
                      name="workoutDuration"
                      value={form.workoutDuration}
                      onChange={handleChange}
                      placeholder="Select duration"
                    >
                      <option value="15-30">15-30 minutes</option>
                      <option value="30-45">30-45 minutes</option>
                      <option value="45-60">45-60 minutes</option>
                      <option value="60+">60+ minutes</option>
                    </Select>
                    <FormErrorMessage>{errors.workoutDuration}</FormErrorMessage>
                  </FormControl>
                </Box>

                <Box width="100%" display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={4}>
                  <FormControl isInvalid={!!errors.fitnessGoal}>
                    <FormLabel>Fitness Goal</FormLabel>
                    <Select
                      name="fitnessGoal"
                      value={form.fitnessGoal}
                      onChange={handleChange}
                      placeholder="Select goal"
                    >
                      <option value="weight-loss">Weight Loss</option>
                      <option value="weight-gain">Weight Gain</option>
                      <option value="muscle-gain">Muscle Gain</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="general-fitness">General Fitness</option>
                    </Select>
                    <FormErrorMessage>{errors.fitnessGoal}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.targetWeight}>
                    <FormLabel>Target Weight</FormLabel>
                    <Flex>
                      <Input
                        name="targetWeight"
                        type="number"
                        value={form.targetWeight}
                        onChange={handleChange}
                        placeholder={`Enter target weight in ${form.targetWeightUnit}`}
                        mr={2}
                      />
                      <Select
                        name="targetWeightUnit"
                        value={form.targetWeightUnit}
                        onChange={handleChange}
                        width="100px"
                      >
                        <option value="kg">kg</option>
                        <option value="lbs">lbs</option>
                      </Select>
                    </Flex>
                    <FormErrorMessage>{errors.targetWeight}</FormErrorMessage>
                  </FormControl>
                </Box>
              </VStack>
            </Box>

            <Button
              type="submit"
              colorScheme="blue"
              width="100%"
              isLoading={isLoading}
              loadingText="Creating Account"
            >
              Sign Up
            </Button>
          </VStack>
        </Box>


      </VStack>
      </Box>
    </Box>
  );
};