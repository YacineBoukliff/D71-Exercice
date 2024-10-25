# API de Gestion de Prestataires et Services

Une API RESTful pour gérer des prestataires et leurs services, construite avec Express.js, MongoDB, et suivant les principes des 12 Factor App.

## Technologies Utilisées

- Node.js
- Express.js
- MongoDB avec Mongoose
- Redis pour le cache
- Nodemailer (avec Mailtrap pour les tests)
- Winston pour les logs
- Express Validator pour la validation des données

## Prérequis

- Node.js v14+
- MongoDB
- Redis (optionnel, pour le cache)
- NPM ou Yarn

## Installation

1. Clonez le repository

```bash
git clone [URL_DU_REPO]
cd provider-api
```

2. Installez les dépendances

```bash
npm install
```

3. Créez un fichier `.env` à la racine du projet

```env
PORT=3000
MONGODB_URI=mongodb://localhost/provider
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=votre_user_mailtrap
MAIL_PASS=votre_password_mailtrap
NODE_ENV=development
REDIS_ENABLED=true
REDIS_URL=redis://localhost:6379
```

4. Démarrez le serveur

```bash
# Mode développement
npm run dev

# Mode production
npm start
```

## Documentation de l'API

### Endpoints Prestataires

#### GET /api/providers

- Description: Récupère la liste des prestataires
- Réponse: Liste des prestataires

#### POST /api/providers

- Description: Crée un nouveau prestataire
- Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "address": "123 Main St"
}
```

#### PUT /api/providers/:id

- Description: Met à jour un prestataire
- Paramètres: id (ID du prestataire)
- Body: Mêmes champs que POST (tous optionnels)

#### DELETE /api/providers/:id

- Description: Supprime un prestataire
- Paramètres: id (ID du prestataire)

### Endpoints Services

#### GET /api/services

- Description: Récupère la liste des services
- Réponse: Liste des services avec informations des prestataires

#### POST /api/services

- Description: Crée un nouveau service
- Body:

```json
{
  "name": "Service Test",
  "description": "Description du service",
  "price": 100,
  "provider": "ID_DU_PRESTATAIRE"
}
```

#### PUT /api/services/:id

- Description: Met à jour un service
- Paramètres: id (ID du service)
- Body: Mêmes champs que POST (tous optionnels)

#### DELETE /api/services/:id

- Description: Supprime un service
- Paramètres: id (ID du service)

## Fonctionnalités

- CRUD complet pour les prestataires et services
- Validation des données entrantes
- Cache Redis pour optimiser les performances
- Logs centralisés avec Winston
- Notifications par email via Mailtrap
- Gestion des erreurs centralisée
- Documentation complète de l'API

## Scripts Disponibles

npm run dev # Démarre le serveur en mode développement
npm start # Démarre le serveur en mode production
npm run test # Lance les tests

```

## Structure du Projet

src/
├── config/          # Configuration (DB, email, etc.)
├── controllers/     # Contrôleurs de l'API
├── middleware/      # Middlewares personnalisés
├── models/         # Modèles Mongoose
├── routes/         # Routes de l'API
├── services/       # Services (cache, email)
└── utils/          # Utilitaires
```

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## License

MIT
