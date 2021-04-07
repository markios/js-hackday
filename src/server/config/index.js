const config = Object.freeze({
  SERVER: {
    PORT: process.env.PORT,
  },
  USERS: {
    'venom': process.env.PASSWORD || 'password'
  }
});

export default config;