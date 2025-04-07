import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props: { colorMode: 'light' | 'dark' }) => ({
      body: {
        bg: props.colorMode === 'light' ? 'gray.50' : 'gray.800',
        color: props.colorMode === 'light' ? 'gray.800' : 'whiteAlpha.900',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: (props: { colorMode: 'light' | 'dark' }) => ({
        _hover: {
          bg: props.colorMode === 'light' ? 'gray.200' : 'whiteAlpha.200',
        },
      }),
    },
  },
});

export default theme;