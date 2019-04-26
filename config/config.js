module.exports = {
  development: {
    username: "bethwambu",
    password: "beth",
    database: "medium",
    host: "database",
    port: 5432,
    dialect: "postgres",
    jwtSecret: "mediumApi",
    jwtSession: { session: false },
  },
  test: {
    username: "bethwambu",
    password: "beth",
    database: "medium_test",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
  },
  production: {
    username: "bethwambu",
    password: "beth",
    database: "medium",
    host: "127.0.0.1",
    port: 5432,
    dialect: "postgres",
  },
}
