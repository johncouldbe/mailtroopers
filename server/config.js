exports.PORT = process.env.PORT || 8080;
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/mailtroopers'
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000'
exports.JWT_SECRET = process.env.JWT_SECRET || 'localSecret'
exports.JWT_EXPIRE = process.env.JWT_EXPIRE || '1d'
