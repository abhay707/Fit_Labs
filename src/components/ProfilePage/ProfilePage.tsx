import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Card,
  CardHeader,
  CardBody,
  Badge,
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react';
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useAuth } from '../../context/AuthContext';
import workoutBackground from '../../assets/Workout Photo Packermann.jpg';

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
  heightUnit?: 'cm' | 'inches';
  weightUnit?: 'kg' | 'lbs';
  targetWeightUnit?: 'kg' | 'lbs';
}

export const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const [errors, setErrors] = useState<Partial<UserProfile>>({});
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const containerBgColor = useColorModeValue('gray.50', 'gray.900');

  useEffect(() => {
    if (user) {
      if (user.profile) {
        setProfile(user.profile);
        setEditedProfile(user.profile);
      } else {
        // Create an empty profile if user doesn't have one
        const emptyProfile: UserProfile = {
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
        };
        setProfile(emptyProfile);
        setEditedProfile(emptyProfile);
        setIsEditing(true); // Automatically open edit mode
      }
    }
  }, [user]);

  const calculateBMI = () => {
    if (!profile?.height || !profile?.weight) return null;
    
    let heightInMeters: number;
    let weightInKg: number;
    
    // Convert height to meters based on the unit
    if (profile.heightUnit === 'inches') {
      heightInMeters = parseFloat(profile.height) * 0.0254; // inches to meters
    } else {
      heightInMeters = parseFloat(profile.height) / 100; // cm to meters
    }
    
    // Convert weight to kg based on the unit
    if (profile.weightUnit === 'lbs') {
      weightInKg = parseFloat(profile.weight) * 0.453592; // lbs to kg
    } else {
      weightInKg = parseFloat(profile.weight); // already in kg
    }
    
    if (isNaN(heightInMeters) || isNaN(weightInKg) || heightInMeters <= 0 || weightInKg <= 0) {
      return null;
    }
    
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'blue' };
    if (bmi < 25) return { category: 'Normal weight', color: 'green' };
    if (bmi < 30) return { category: 'Overweight', color: 'orange' };
    return { category: 'Obese', color: 'red' };
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedProfile(profile);
      setErrors({});
    }
    setIsEditing(!isEditing);
  };

  const validateForm = () => {
    const newErrors: Partial<UserProfile> = {};
    let isValid = true;

    if (!editedProfile) return false;

    if (!editedProfile.username) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!editedProfile.age || isNaN(Number(editedProfile.age))) {
      newErrors.age = 'Please enter a valid age';
      isValid = false;
    }

    if (!editedProfile.weight || isNaN(Number(editedProfile.weight))) {
      newErrors.weight = 'Please enter a valid weight';
      isValid = false;
    }

    if (!editedProfile.height || isNaN(Number(editedProfile.height))) {
      newErrors.height = 'Please enter a valid height';
      isValid = false;
    }

    if (!editedProfile.gender) {
      newErrors.gender = 'Please select your gender';
      isValid = false;
    }

    if (!editedProfile.fitnessLevel) {
      newErrors.fitnessLevel = 'Please select your fitness level';
      isValid = false;
    }

    if (!editedProfile.workoutFrequency) {
      newErrors.workoutFrequency = 'Please select workout frequency';
      isValid = false;
    }

    if (!editedProfile.workoutDuration) {
      newErrors.workoutDuration = 'Please select workout duration';
      isValid = false;
    }

    if (!editedProfile.fitnessGoal) {
      newErrors.fitnessGoal = 'Please select your fitness goal';
      isValid = false;
    }

    if (!editedProfile.targetWeight || isNaN(Number(editedProfile.targetWeight))) {
      newErrors.targetWeight = 'Please enter a valid target weight';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Convert units to standard format (cm and kg) for storage and calculations
  const convertToStandardUnits = () => {
    if (!editedProfile) return null;
    
    let standardWeight = editedProfile.weight;
    let standardHeight = editedProfile.height;
    let standardTargetWeight = editedProfile.targetWeight;
    
    // Convert pounds to kg if needed
    if (editedProfile.weightUnit === 'lbs') {
      standardWeight = (parseFloat(editedProfile.weight) * 0.453592).toFixed(2);
    }
    
    // Convert inches to cm if needed
    if (editedProfile.heightUnit === 'inches') {
      standardHeight = (parseFloat(editedProfile.height) * 2.54).toFixed(2);
    }
    
    // Convert target weight from pounds to kg if needed
    if (editedProfile.targetWeightUnit === 'lbs') {
      standardTargetWeight = (parseFloat(editedProfile.targetWeight) * 0.453592).toFixed(2);
    }
    
    return {
      ...editedProfile,
      weight: standardWeight,
      height: standardHeight,
      targetWeight: standardTargetWeight
    };
  };

  const handleSaveProfile = async () => {
    if (!validateForm() || !editedProfile) return;

    setIsLoading(true);
    try {
      const standardProfile = convertToStandardUnits();
      if (!standardProfile) return;
      
      await updateUserProfile(standardProfile);
      setProfile(standardProfile);
      setIsEditing(false);
      toast({
        title: 'Profile updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
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
    if (editedProfile) {
      setEditedProfile({
        ...editedProfile,
        [name]: value
      });
    }
  };

  if (!profile) {
    return (
      <Box height="100%" width="100%" display="flex" alignItems="center" justifyContent="center">
        <Text>Loading profile...</Text>
      </Box>
    );
  }

  const bmi = calculateBMI();
  const bmiInfo = bmi ? getBMICategory(parseFloat(bmi)) : null;

  return (
    <Box 
      height="100%" 
      width="100%" 
      p={4} 
      overflowY="auto"
      position="relative"
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
        opacity: 0.1,
        zIndex: -1
      }}
      bg={containerBgColor}
    >
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg">My Profile</Heading>
        <Button
          leftIcon={isEditing ? <CloseIcon /> : <EditIcon />}
          colorScheme={isEditing ? 'red' : 'blue'}
          variant="outline"
          onClick={handleEditToggle}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </Flex>

      {isEditing ? (
        <VStack spacing={6} align="stretch">
          <Card bg={bgColor} borderColor={borderColor} borderWidth="1px" borderRadius="lg">
            <CardHeader>
              <Heading size="md">Personal Information</Heading>
            </CardHeader>
            <CardBody>
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                <FormControl isInvalid={!!errors.username}>
                  <FormLabel>Username</FormLabel>
                  <Input
                    name="username"
                    value={editedProfile?.username || ''}
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.age}>
                  <FormLabel>Age</FormLabel>
                  <Input
                    name="age"
                    type="number"
                    value={editedProfile?.age || ''}
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{errors.age}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.gender}>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    name="gender"
                    value={editedProfile?.gender || ''}
                    onChange={handleChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Select>
                  <FormErrorMessage>{errors.gender}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.height}>
                  <FormLabel>Height</FormLabel>
                  <Flex>
                    <Input
                      name="height"
                      type="number"
                      value={editedProfile?.height || ''}
                      onChange={handleChange}
                      mr={2}
                    />
                    <Select
                      name="heightUnit"
                      value={editedProfile?.heightUnit || 'cm'}
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
                      value={editedProfile?.weight || ''}
                      onChange={handleChange}
                      mr={2}
                    />
                    <Select
                      name="weightUnit"
                      value={editedProfile?.weightUnit || 'kg'}
                      onChange={handleChange}
                      width="100px"
                    >
                      <option value="kg">kg</option>
                      <option value="lbs">lbs</option>
                    </Select>
                  </Flex>
                  <FormErrorMessage>{errors.weight}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.targetWeight}>
                  <FormLabel>Target Weight</FormLabel>
                  <Flex>
                    <Input
                      name="targetWeight"
                      type="number"
                      value={editedProfile?.targetWeight || ''}
                      onChange={handleChange}
                      mr={2}
                    />
                    <Select
                      name="targetWeightUnit"
                      value={editedProfile?.targetWeightUnit || 'kg'}
                      onChange={handleChange}
                      width="100px"
                    >
                      <option value="kg">kg</option>
                      <option value="lbs">lbs</option>
                    </Select>
                  </Flex>
                  <FormErrorMessage>{errors.targetWeight}</FormErrorMessage>
                </FormControl>
              </Grid>
            </CardBody>
          </Card>

          <Card bg={bgColor} borderColor={borderColor} borderWidth="1px" borderRadius="lg">
            <CardHeader>
              <Heading size="md">Fitness Information</Heading>
            </CardHeader>
            <CardBody>
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                <FormControl isInvalid={!!errors.fitnessLevel}>
                  <FormLabel>Fitness Level</FormLabel>
                  <Select
                    name="fitnessLevel"
                    value={editedProfile?.fitnessLevel || ''}
                    onChange={handleChange}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </Select>
                  <FormErrorMessage>{errors.fitnessLevel}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.fitnessGoal}>
                  <FormLabel>Fitness Goal</FormLabel>
                  <Select
                    name="fitnessGoal"
                    value={editedProfile?.fitnessGoal || ''}
                    onChange={handleChange}
                  >
                    <option value="weight-loss">Weight Loss</option>
                    <option value="weight-gain">Weight Gain</option>
                    <option value="muscle-gain">Muscle Gain</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="general-fitness">General Fitness</option>
                  </Select>
                  <FormErrorMessage>{errors.fitnessGoal}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.workoutFrequency}>
                  <FormLabel>Workout Frequency</FormLabel>
                  <Select
                    name="workoutFrequency"
                    value={editedProfile?.workoutFrequency || ''}
                    onChange={handleChange}
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
                    value={editedProfile?.workoutDuration || ''}
                    onChange={handleChange}
                  >
                    <option value="15-30">15-30 minutes</option>
                    <option value="30-45">30-45 minutes</option>
                    <option value="45-60">45-60 minutes</option>
                    <option value="60+">60+ minutes</option>
                  </Select>
                  <FormErrorMessage>{errors.workoutDuration}</FormErrorMessage>
                </FormControl>
              </Grid>
            </CardBody>
          </Card>

          <Flex justifyContent="flex-end" mt={4}>
            <Button
              leftIcon={<CheckIcon />}
              colorScheme="green"
              isLoading={isLoading}
              onClick={handleSaveProfile}
            >
              Save Changes
            </Button>
          </Flex>
        </VStack>
      ) : (
        <VStack spacing={6} align="stretch">
          <Card bg={bgColor} borderColor={borderColor} borderWidth="1px" borderRadius="lg">
            <CardHeader>
              <Heading size="md">Personal Information</Heading>
            </CardHeader>
            <CardBody>
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                <GridItem>
                  <Text fontWeight="bold">Username</Text>
                  <Text>{profile.username}</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="bold">Age</Text>
                  <Text>{profile.age} years</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="bold">Gender</Text>
                  <Text>{profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)}</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="bold">Height</Text>
                  <Text>
                    {profile.heightUnit === 'inches' 
                      ? `${(parseFloat(profile.height) / 2.54).toFixed(1)} inches` 
                      : `${profile.height} cm`}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="bold">Current Weight</Text>
                  <Text>
                    {profile.weightUnit === 'lbs' 
                      ? `${(parseFloat(profile.weight) / 0.453592).toFixed(1)} lbs` 
                      : `${profile.weight} kg`}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="bold">Target Weight</Text>
                  <Text>
                    {profile.targetWeightUnit === 'lbs' 
                      ? `${(parseFloat(profile.targetWeight) / 0.453592).toFixed(1)} lbs` 
                      : `${profile.targetWeight} kg`}
                  </Text>
                </GridItem>
              </Grid>
            </CardBody>
          </Card>

          <Card bg={bgColor} borderColor={borderColor} borderWidth="1px" borderRadius="lg">
            <CardHeader>
              <Heading size="md">Fitness Information</Heading>
            </CardHeader>
            <CardBody>
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                <GridItem>
                  <Text fontWeight="bold">Fitness Level</Text>
                  <Badge colorScheme={profile.fitnessLevel === 'beginner' ? 'green' : profile.fitnessLevel === 'intermediate' ? 'orange' : 'red'}>
                    {profile.fitnessLevel.charAt(0).toUpperCase() + profile.fitnessLevel.slice(1)}
                  </Badge>
                </GridItem>
                <GridItem>
                  <Text fontWeight="bold">Workout Frequency</Text>
                  <Text>{profile.workoutFrequency === '5+' ? '5+ times per week' : `${profile.workoutFrequency} times per week`}</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="bold">Workout Duration</Text>
                  <Text>{profile.workoutDuration === '60+' ? '60+ minutes' : `${profile.workoutDuration} minutes`}</Text>
                </GridItem>
              </Grid>
            </CardBody>
          </Card>

          <Card bg={bgColor} borderColor={borderColor} borderWidth="1px" borderRadius="lg">
            <CardHeader>
              <Heading size="md">Fitness Goals</Heading>
            </CardHeader>
            <CardBody>
              <Flex direction={{ base: "column", md: "row" }} align="center" justify="space-between">
                <Box flex="1">
                  <Text fontWeight="bold" mb={2}>
                    Goal: <Text as="span" fontWeight="normal">{profile.fitnessGoal ? profile.fitnessGoal.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Not set'}</Text>
                  </Text>
                  <Text fontWeight="bold" mb={2}>
                    Target Weight: <Text as="span" fontWeight="normal">{profile.targetWeight} {profile.targetWeightUnit || 'kg'}</Text>
                  </Text>
                </Box>
                {/* <Box display="flex" justifyContent="center" alignItems="center" ml={{ base: 0, md: 4 }} mt={{ base: 4, md: 0 }}>
                  <img src={nutritionImage} alt="Nutrition" width="120px" height="120px" />
                </Box> */}
              </Flex>
            </CardBody>
          </Card>

          <Card bg={bgColor} borderColor={borderColor} borderWidth="1px" borderRadius="lg">
            <CardHeader>
              <Heading size="md">Body Mass Index (BMI)</Heading>
            </CardHeader>
            <CardBody>
              {bmi && bmiInfo ? (
                <Flex direction={{ base: "column", md: "row" }} gap={6}>
                  <Stat>
                    <StatLabel>Your BMI</StatLabel>
                    <StatNumber>{bmi}</StatNumber>
                    <StatHelpText>
                      <Badge colorScheme={bmiInfo.color}>{bmiInfo.category}</Badge>
                    </StatHelpText>
                  </Stat>
                  <Box flex={1}>
                    <Text fontWeight="bold" mb={2}>BMI Categories:</Text>
                    <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap={2}>
                      <GridItem>
                        <Badge colorScheme="blue" mr={2}>Underweight</Badge>
                        <Text as="span" fontSize="sm">Below 18.5</Text>
                      </GridItem>
                      <GridItem>
                        <Badge colorScheme="green" mr={2}>Normal weight</Badge>
                        <Text as="span" fontSize="sm">18.5–24.9</Text>
                      </GridItem>
                      <GridItem>
                        <Badge colorScheme="orange" mr={2}>Overweight</Badge>
                        <Text as="span" fontSize="sm">25–29.9</Text>
                      </GridItem>
                      <GridItem>
                        <Badge colorScheme="red" mr={2}>Obese</Badge>
                        <Text as="span" fontSize="sm">30 or greater</Text>
                      </GridItem>
                    </Grid>
                  </Box>
                </Flex>
              ) : (
                <Text>Unable to calculate BMI. Please ensure your height and weight are entered correctly.</Text>
              )}
            </CardBody>
          </Card>
        </VStack>
      )}
    </Box>
  );
};