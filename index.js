require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require('./routes/user.routes');
const logger = require('./middlewares/logger');


// Middleware
app.use(express.json());
app.use(require('morgan')('dev'))
app.use(require('cors')());
app.use(logger); // middleware global
// Routes
app.get('/', (req, res) => {
  res.send('Bienvenue sur mon API Express !');
});
app.use('/users', userRoutes); //
// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});



