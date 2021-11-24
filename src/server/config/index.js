const PRODUCTION = "production";

const config = Object.freeze({
  SERVER: {
    PORT: process.env.PORT,
  },
  USERS: {
    venom: process.env.PASSWORD || "password",
  },
  ENVIRONMENT: process.env.ENVIRONMENT ?? PRODUCTION,
  AUTH: {
    REALM: "Imb4T3st4pp",
  },
});

export const isProduction = () => config.ENVIRONMENT === PRODUCTION;

export default config;
