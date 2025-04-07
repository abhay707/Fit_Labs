import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Container,
  Image,
  HStack,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { useAuth } from '../../context/AuthContext';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import workoutImage from '../../assets/Workout Photo from Pexels.jpg';
import fitnessCoachLogo from '../../assets/Tracker Logo.png';

export const NewNavbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { user, logout } = useAuth();
  const location = useLocation();

  const getActiveStyle = (path: string) => {
    return location.pathname === path ? {
      color: useColorModeValue('blue.500', 'blue.300'),
      fontWeight: 'bold',
      borderBottom: '2px solid',
      borderColor: useColorModeValue('blue.500', 'blue.300'),
      pb: '2px'
    } : {};
  };

  return (
    <Box 
      position="sticky" 
      top={0} 
      zIndex={10}
      backgroundImage={`url(${workoutImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={useColorModeValue('blackAlpha.600', 'blackAlpha.700')}
        zIndex={-1}
      />
      <Container maxW="container.xl">
        <Flex
          color={useColorModeValue('white', 'white')}
          minH={'70px'}
          py={{ base: 3 }}
          px={{ base: 4 }}
          align={'center'}
        >
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={'ghost'}
              color={'white'}
              aria-label={'Toggle Navigation'}
              _hover={{ bg: 'whiteAlpha.200' }}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} align="center">
            <HStack spacing={2}>
              <Image 
                src={fitnessCoachLogo} 
                alt="FitNess Logo" 
                boxSize="40px"
              />
              <Text
                textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                fontFamily={'heading'}
                color={'white'}
                fontWeight="bold"
                fontSize="xl"
                letterSpacing="tight"
              >
                Fit Labs
              </Text>
            </HStack>

            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav getActiveStyle={getActiveStyle} />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}
            align="center"
          >
            <ThemeToggle />
            
            {user ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    name={user.profile?.username || user.email}
                    bg="blue.500"
                    color="white"
                  />
                </MenuButton>
                <MenuList bg={useColorModeValue('white', 'gray.800')} color={useColorModeValue('gray.800', 'white')}>
                  <MenuItem as={RouterLink} to="/profile">
                    Profile
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={logout}>Sign Out</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <>
                <Button 
                  as={RouterLink} 
                  to="/login" 
                  fontSize={'sm'} 
                  fontWeight={400} 
                  variant={'link'}
                  color="white"
                  _hover={{ color: 'blue.200' }}
                >
                  Sign In
                </Button>
                <Button
                  as={RouterLink}
                  to="/signup"
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'blue.400'}
                  _hover={{
                    bg: 'blue.300',
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Container>
    </Box>
  );
};

interface DesktopNavProps {
  getActiveStyle: (path: string) => Record<string, any>;
}

const DesktopNav = ({ getActiveStyle }: DesktopNavProps) => {
  const linkHoverColor = 'blue.200';

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                as={RouterLink}
                to={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={'white'}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
                {...getActiveStyle(navItem.href || '')}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={useColorModeValue('white', 'gray.800')}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      as={RouterLink}
      to={href ?? '#'}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('blue.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'blue.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'blue.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('blackAlpha.700', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={RouterLink}
        to={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={'white'}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
            color="white"
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('whiteAlpha.500', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Link
                key={child.label}
                py={2}
                as={RouterLink}
                to={child.href ?? '#'}
                color="white"
                _hover={{ color: 'blue.200' }}
              >
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Exercise Recommendations',
    href: '/',
  },
  {
    label: 'Chat Assistant',
    href: '/chat',
  },
  {
    label: 'Profile',
    href: '/profile',
  },
];