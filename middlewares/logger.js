// middlewares/logger.js
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // passer à la prochaine étape
}

module.exports = logger;

