module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  connectionString: `mongodb://${
    process.env.DB_HOST || 'localhost'
  }:password${
    process.env.DB_PASSWORD || '<you_forgot_to_set_your_password>'
  }:${
    process.env.DB_PORT || 27017
  }/mexpress`
};
