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
    schema: 'gdec',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    tables: {
      users: 'users',
    },
    postgresErrors: {
      foreignKey: {
        code: '23503',
        tables: {
          sessions: {
            sessions_user_id_fkey: 'userId',
          },
          posts: {
            posts_user_id_fkey: 'userId',
          },
        },
      },
      notNull: {
        code: '23502',
      },
      unique: {
        code: '23505',
      },
    },
  },

};
