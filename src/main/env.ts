export default {
  mongodb: {
    mongoUrl: process.env.ME_CONFIG_MONGODB_URL || 'mongodb://root:12345678@mongo:27017/api-enquete?authSource=admin'
  },
  hasher: {
    salt: 12
  },
  encrypter: {
    secretKey: '90dec2258e9adf40b9b73903018306da',
    expiresIn: '1d'
  },
  server: {
    port: 3000
  }
}
