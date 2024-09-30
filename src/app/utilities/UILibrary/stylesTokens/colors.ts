export const blue = {
  default: '#1C264B',
  secondary: '#47455F',
};

export const white = {
  default: '#FFFFFF',
  pearl: '#F2F2F2',
};

export const black = {
  default: '#010534',
  gray: '#979797',
};

export const red = {
  default: '#EF4C4D',
};

export const gray = {
  default: '#F7F6FC',
  secondary: '#464646',
  light: '#ADADAD',
};

export const colors = {
  blue: blue,
  white: white,
  black: black,
  gray: gray,
  red: red,
  text: {
    default: blue.default,
    description: blue.default,
    gray: gray.secondary,
    white: white.pearl,
    black: black.default,
    link: red.default,
    light: gray.light,
  },
  background: {
    footer: white.default,
    navbar: white.default,
    sidenav: white.default,
    app: white.default,
    card: white.default,
    white: white.default,
  },
  button: {
    blue: blue.default,
    red: red.default,
    bluegray: blue.secondary,
  },
  status: {
    error: red.default,
    success: blue.default,
  },
};
