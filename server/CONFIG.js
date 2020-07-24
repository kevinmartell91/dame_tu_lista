// Sets up dotenv as soon as our application starts
const NODE_ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `.env.${NODE_ENV}`
}); 

module.exports = {
  environment: process.env.NODE_ENV,
  saltingRounds: 10,
  jwt_secret: process.env.JWT_SECRET,
  mongo_path: process.env.MONGO_PATH,
  mongo_db: process.env.MONGO_DB,
  mongo_user: process.env.MONOGO_USER,
  mongo_pass: process.env.MONGO_PASSWORD,
  port: process.env.PORT || 8080,
}