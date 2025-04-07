import { IconButton, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      size="md"
      variant="ghost"
      borderRadius="full"
      bg={colorMode === 'light' ? 'white' : 'gray.700'}
      color={colorMode === 'light' ? 'gray.800' : 'yellow.200'}
      boxShadow="md"
      _hover={{ 
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
        bg: colorMode === 'light' ? 'gray.100' : 'gray.600' 
      }}
      transition="all 0.2s"
    />
  );
};