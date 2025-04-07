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
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';

interface LoginProps {
  onSwitchToSignup: () => void;
  onLoginSuccess?: () => void;
}

export const Login = ({ onSwitchToSignup, onLoginSuccess }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  
  // const { login } = useAuth();
  const toast = useToast();

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // await login(email, password);
      // toast({
      //   title: 'Login successful',
      //   status: 'success',
      //   duration: 3000,
      //   isClosable: true,
      // });
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Please check your credentials and try again',
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
      maxW="400px" 
      p={8} 
      borderRadius="xl" 
      boxShadow="xl" 
      bg={useColorModeValue('white', 'gray.800')}
      position="relative"
      zIndex={1}
      backdropFilter="blur(10px)"
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Box position="relative" zIndex={1}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading size="lg" color={useColorModeValue('blue.600', 'blue.300')} fontWeight="bold">Welcome Back</Heading>
            <Text mt={3} color={useColorModeValue('gray.600', 'gray.400')} fontSize="md">Sign in to continue to FitNess Tracker</Text>
          </Box>
          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={5}>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel fontWeight="medium">Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  size="lg"
                  borderRadius="md"
                  _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px blue.400' }}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <FormLabel fontWeight="medium">Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  size="lg"
                  borderRadius="md"
                  _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px blue.400' }}
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                width="100%"
                isLoading={isLoading}
                loadingText="Logging in"
                size="lg"
                mt={4}
                fontWeight="bold"
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                transition="all 0.2s"
              >
                Log In
              </Button>
            </VStack>
          </Box>

          <Text textAlign="center" mt={4} color={useColorModeValue('gray.600', 'gray.400')}>
            Don't have an account?{' '}
            <Button
              variant="link"
              color={useColorModeValue('blue.500', 'blue.300')}
              fontWeight="semibold"
              onClick={onSwitchToSignup}
              _hover={{ textDecoration: 'underline' }}
            >
              Sign up
            </Button>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};