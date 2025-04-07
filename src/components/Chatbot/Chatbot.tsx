import { useState, useRef, useEffect } from 'react';
import {
  Box,
  VStack,
  Input,
  Button,
  Text,
  useToast,
  Flex,
  ButtonGroup,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiSend } from 'react-icons/fi';
import { GoogleGenerativeAI } from '@google/generative-ai';
import workoutPhoto from '../../assets/Workout Photo from Pexels.jpg';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  apiKey: string;
}

export const Chatbot = ({ apiKey }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([{
    text: "Welcome to your AI Fitness Coach\n\nI'm here to help with workout routines, exercise techniques, fitness nutrition, and injury prevention. Ask me anything related to your fitness journey!",
    sender: 'bot',
    timestamp: new Date(),
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null);
  const [hasAskedFollowUp, setHasAskedFollowUp] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  const genAI = new GoogleGenerativeAI(apiKey);

  const resetInactivityTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }

    if (messages.length > 0 && !hasAskedFollowUp) {
      const timer = setTimeout(() => {
        const botMessage: Message = {
          text: "Do you need any other workout or fitness advice today?",
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setHasAskedFollowUp(true);
      }, 30000);
      setInactivityTimer(timer);
    }
  };

  const handleSendMessage = async () => {
    setHasAskedFollowUp(false);
    if (!input.trim()) return;

    if (!apiKey) {
      toast({
        title: 'Configuration Error',
        description: 'API key is not configured. Please check your environment variables.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const userMessage: Message = {
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `You are a specialized fitness and workout assistant. ONLY provide information related to exercise, workouts, fitness routines, sports nutrition, and injury prevention/recovery. If the question is not related to fitness or exercise, politely redirect the conversation back to workout topics. Format your answer in short, focused paragraphs with line breaks between them. Keep each paragraph concise and easy to read.

User question: ${input}

Remember: Only respond with fitness and exercise-related information. For any other topics, gently guide the user back to fitness discussions.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      if (!text) {
        throw new Error('Empty response received from the API');
      }

      const botMessage: Message = {
        text: text,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get response from the chatbot';
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Chatbot error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    resetInactivityTimer();
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    handleSendMessage();
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Box 
      h="100vh" 
      w="100vw" 
      position="fixed" 
      top={0} 
      left={0} 
      bg={useColorModeValue('white', 'gray.800')} 
      display="flex" 
      flexDirection="column"
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
        opacity: 0.20,
        zIndex: 0
      }}
    >
      <Flex py={4} px={6} borderBottom="1px" borderColor={useColorModeValue('gray.200', 'gray.700')} alignItems="center" justifyContent="center">
        <Text fontSize="xl" fontWeight="bold">AI Coach</Text>
      </Flex>
      
      <Box flex={1} overflowY="auto" p={4} position="relative" zIndex={1}>
        {messages.length === 1 && (
          <VStack spacing={4} mt={8}>
            <Text fontSize="xl" fontWeight="bold" textAlign="center" color={useColorModeValue('gray.700', 'gray.300')}>
              Your Personal Fitness Assistant
            </Text>
            <ButtonGroup spacing={2} mt={4} flexWrap="wrap" justifyContent="center">
              <Button
                variant="outline"
                colorScheme="purple"
                onClick={() => handleSuggestedQuestion("How can I improve my squat form?")}
                m={1}
              >
                How can I improve my squat form?
              </Button>
              <Button
                variant="outline"
                colorScheme="purple"
                onClick={() => handleSuggestedQuestion("What should I eat before a workout?")}
                m={1}
              >
                What should I eat before a workout?
              </Button>
              <Button
                variant="outline"
                colorScheme="purple"
                onClick={() => handleSuggestedQuestion("What's the best workout for building muscle?")}
                m={1}
              >
                Best workout for building muscle?
              </Button>
            </ButtonGroup>
          </VStack>
        )}
        <Box mt={4}>
          {messages.map((message, index) => (
            <Flex
              key={index}
              justifyContent={message.sender === 'user' ? 'flex-end' : 'flex-start'}
              mb={4}
            >
              <Box
                maxW="70%"
                bg={message.sender === 'user' ? 'blue.500' : useColorModeValue('white', 'gray.700')}
                color={message.sender === 'user' ? 'white' : useColorModeValue('black', 'white')}
                p={3}
                borderRadius="lg"
                boxShadow="md"
              >
                <Text whiteSpace="pre-line">{message.text}</Text>
                <Text fontSize="xs" color={message.sender === 'user' ? 'white' : useColorModeValue('gray.500', 'gray.300')} mt={1}>
                  {message.timestamp.toLocaleTimeString()}
                </Text>
              </Box>
            </Flex>
          ))}
          <div ref={messagesEndRef} />
        </Box>
      </Box>
      
      <Flex p={4} borderTop="1px" borderColor={useColorModeValue('gray.200', 'gray.700')}>
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask your AI coach..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          mr={2}
          bg={useColorModeValue('white', 'gray.700')}
          borderRadius="full"
        />
        <IconButton
          aria-label="Send message"
          icon={<FiSend />}
          colorScheme="blue"
          isLoading={isLoading}
          onClick={handleSendMessage}
          borderRadius="full"
        />
      </Flex>
    </Box>
  );
};