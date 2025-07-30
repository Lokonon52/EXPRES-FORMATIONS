//require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config(); // ✅

import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
import userRoutes from  './routes-sansDB/user.routes.js';
// logger doit aussi être importé, s'il est défini dans un autre fichier
import logger from './middlewares/logger.js'; // ou adapte le chemin


// Middleware
import morgan from 'morgan';
import cors from 'cors';
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
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



