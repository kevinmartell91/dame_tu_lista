module.exports = {
  development: {
    port: process.env.PORT || 8080,
    saltingRounds: 10
  },
  production: {
    port: process.env.PORT || 8080,
    saltingRounds: 10
  }
}