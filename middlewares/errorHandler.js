// Middleware 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route introuvable' });
});

// Middleware global pour les autres erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur interne du serveur' });
});

// les exceptions non gérées 
import express from 'express';
//const router = express.Router();
router.get('/fail', (req, res) => {
  throw new Error('Erreur volontaire');
});


