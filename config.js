const dev = {
  API_URL: "http://localhost:300",
  SITE_KEY: "6LdInwcnAAAAAKfHPnGj5ntZjq11fkErZAW8hVhF",
};

const prod = {
  API_URL: "llll",
};
const config = process.env.NODE_ENV == "development" ? dev : prod;
export default config;
