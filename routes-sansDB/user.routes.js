
// routes/user.routes.js
import express from 'express';
const router = express.Router();

// Données mock (simulant une base de données)
import utilisateurs from '../data/users.js';
//________________________________________________________________________________________
router.post('/', (req, res) => {
  const { nom, email, ville } = req.body;

  if (!nom || !email || !ville) {
    return res.status(400).json({ error: "Champs requis : nom, email, ville" });
  }

  const nouvelUtilisateur = {
    id: utilisateurs.length + 1,
    nom,
    email,
    ville
  };

  utilisateurs.push(nouvelUtilisateur);
  res.status(201).json(nouvelUtilisateur);
});

//_________________________________________________________________________________________
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (!id || isNaN(id)) {
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
  let message='La liste des utilisatateurs';
  // Filtre par ville si le paramètre 'ville' est présent
  //GET /users?ville=paris
  if (req.query.ville) {
    resultats = resultats.filter(user =>
      user.ville.toLowerCase() === req.query.ville.toLowerCase()
    );
    message=`La liste de(s) utilisatateur(s) de la ville ${req.query.ville}`
  }
  // Filtre par nom si le paramètre 'nom' est présent
  //GET /users?nom=li
  if (req.query.nom) {
    resultats = resultats.filter(user =>
      user.nom.toLowerCase().includes(req.query.nom.toLowerCase())
    );

    message=`La liste de(s) utilisatateur(s) dont le nom contient ${req.query.nom}`
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
  resultats.length!=0?res.json({message:message,data:resultats}):res.send("Aucun utilisateur par rapport à vos réquete");
});



//_______________________________________________________________________________________
// Supprimer un utilisateur par son ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID invalide" });
  }

  const index = utilisateurs.findIndex(user => user.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  }

  // On supprime l'utilisateur du tableau
  const utilisateurSupprimé = utilisateurs.splice(index, 1)[0];

  res.json({ message: "Utilisateur supprimé avec succès", utilisateur: utilisateurSupprimé });
});
//-----------------------------------------------------------
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID invalide" });
  }

  const index = utilisateurs.findIndex(user => user.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  }

  const utilisateurActuel = utilisateurs[index];
  const nouvellesDonnees = req.body;

  // Mettre à jour les champs (on écrase l'ancien objet avec les nouvelles données)
  utilisateurs[index] = { ...utilisateurActuel, ...nouvellesDonnees };

  res.json({
    message: "Utilisateur mis à jour avec succès",
    utilisateur: utilisateurs[index]
  });
});
export default router;
