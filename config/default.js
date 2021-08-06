module.exports = {
  app: {
    port: process.env.PORT,
    greetingsRes: {
      message: 'Hello',
    },
    bcryptSaltRounds: 1,
    jwtSecret: process.env.JWT_SECRET,
    sessionDurationInMins: 120,
  },

  database: {
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    connection: {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  },

};
