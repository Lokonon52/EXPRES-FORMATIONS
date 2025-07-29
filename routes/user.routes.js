
// routes/user.routes.js
import express from 'express';
const router = express.Router();

// Données mock (simulant une base de données)
import utilisateurs  from '../data/users.js' ;
//________________________________________________________________________________________
router.post('/', (req, res) => {
  res.send('Créer un utilisateur');
});
//_________________________________________________________________________________________
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if ( !id || isNaN(id)) {
    return res.status(400).json({ error: "ID invalide" });
  }

  const utilisateur = utilisateurs.find(user => user.id === id);
  if (!utilisateur) {
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  }

  res.json(utilisateur);
});

//____________________________________________________________________________________________________________________________________


// Route avec req.query pour filtrer les utilisateurs
router.get('/', (req, res) => {
  let resultats = [...utilisateurs];

  // Filtre par ville si le paramètre 'ville' est présent
  //GET /users?ville=paris
  if (req.query.ville) {
    resultats = resultats.filter(user =>
      user.ville.toLowerCase() === req.query.ville.toLowerCase()
    );
  }

  // Filtre par nom si le paramètre 'nom' est présent
  //GET /users?nom=li
  if (req.query.nom) {
    resultats = resultats.filter(user =>
      user.nom.toLowerCase().includes(req.query.nom.toLowerCase())
    );
    //  on peut combiner GET /users?ville=paris&nom=a
    //  4000/users?nom=a&limit=2
  }

  // Limite les résultats si le paramètre 'limit' est 
  //GET /users?limit=2
  if (req.query.limit) {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit)) {
      resultats = resultats.slice(0, limit);
    }
  }
  res.json(resultats);
});

export default router;
