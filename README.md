# 🎯 Pourquoi on utilise `findAll()`, `update()`, etc. avec une base SQL (et pas `filter()`, `slice()`...)

Très bonne question ! 👍

Tu as raison de remarquer que lorsqu’on utilise une base de données SQL (comme MySQL, PostgreSQL, MariaDB), on **n’utilise pas `slice()`, `splice()`, `find()` ou `filter()`**, mais plutôt des méthodes comme :

- `findAll()`
- `findByPk()` (find by primary key)
- `update()`
- `destroy()`
- `create()`

---

## ✅ Pourquoi ?

### 🔹 1. `slice()`, `find()`, etc. ⇒ **fonctionnent uniquement en mémoire**

Les méthodes comme :

- `filter()`
- `find()`
- `splice()`
- `slice()`

…sont des **méthodes JavaScript pour manipuler des tableaux**, donc elles **ne fonctionnent que sur des données déjà chargées en mémoire** (comme un tableau `utilisateurs` dans un mock JS).

> En SQL, les données sont **dans une base externe**, souvent sur un serveur distant. Tu ne peux **pas manipuler directement tout le tableau**, car il n’est **pas encore chargé**.

---

### 🔹 2. Les bases de données SQL utilisent des **requêtes**, pas des tableaux

Avec une base SQL, tu n’as **pas tout le tableau** en mémoire. Tu fais des **requêtes** pour :

- demander des lignes spécifiques (`SELECT`)
- insérer (`INSERT`)
- modifier (`UPDATE`)
- supprimer (`DELETE`)

Ces actions sont traduites par des méthodes comme `findAll()`, `findByPk()`, etc. dans les ORM (comme Sequelize, TypeORM, Prisma…).

---

### 🔹 3. Les ORM font le lien entre JS et SQL

Exemple avec Sequelize :

```js
// Récupérer tous les utilisateurs
const utilisateurs = await User.findAll();

// Récupérer un utilisateur par ID
const utilisateur = await User.findByPk(5);

// Mettre à jour
await User.update({ nom: "Alice" }, { where: { id: 5 } });

// Supprimer
await User.destroy({ where: { id: 5 } });
