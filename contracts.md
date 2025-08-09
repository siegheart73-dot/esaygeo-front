# Contrats API et Intégration Frontend-Backend

## Vue d'ensemble
Application de news mobile avec authentification, gestion admin, et fonctionnalités avancées.

## 1. API Contracts

### Authentication
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/logout`
- `GET /api/auth/me`

### News Management
- `GET /api/news` - Liste des articles avec filtres
- `GET /api/news/:id` - Détail d'un article
- `POST /api/news` - Créer un article (admin)
- `PUT /api/news/:id` - Modifier un article (admin)
- `DELETE /api/news/:id` - Supprimer un article (admin)

### Categories
- `GET /api/categories` - Liste des catégories

### User Management (Admin)
- `GET /api/users` - Liste des utilisateurs
- `PUT /api/users/:id` - Modifier un utilisateur
- `DELETE /api/users/:id` - Supprimer un utilisateur

### Sources Management (Admin)
- `GET /api/sources` - Liste des sources
- `POST /api/sources` - Ajouter une source
- `PUT /api/sources/:id` - Modifier une source
- `DELETE /api/sources/:id` - Supprimer une source

### Glossary
- `GET /api/glossary` - Liste des termes
- `POST /api/glossary` - Ajouter un terme (admin)
- `PUT /api/glossary/:id` - Modifier un terme (admin)
- `DELETE /api/glossary/:id` - Supprimer un terme (admin)

### AI Analysis (Admin)
- `POST /api/ai/analyze` - Analyser un contenu
- `GET /api/ai/config` - Configuration IA
- `PUT /api/ai/config` - Modifier la configuration

### Support (Admin)
- `GET /api/support/tickets` - Liste des tickets
- `POST /api/support/tickets` - Créer un ticket
- `PUT /api/support/tickets/:id` - Modifier un ticket

## 2. Données mockées à remplacer

### mockNews (mock.js)
- Articles avec titre, contenu, auteur, date, image
- Categories (Politics, Sports, Movies, Tech)
- Featured articles flag

### mockUsers (mock.js)
- Utilisateurs avec rôles (user, admin)
- Informations profil (nom, email, avatar)

### mockGlossary (mock.js)
- Termes techniques avec définitions
- Catégorisation par domaine

### mockSources (mock.js)
- Sources de news avec crédibilité
- URL et catégories

## 3. Implémentation Backend

### Base de données MongoDB
- Collection `users`
- Collection `articles`
- Collection `categories`
- Collection `sources`
- Collection `glossary`
- Collection `support_tickets`

### Authentification JWT
- Middleware d'authentification
- Gestion des rôles (user, admin)
- Sessions persistantes

### Upload d'images
- Gestion des images d'articles
- Stockage optimisé

## 4. Intégration Frontend-Backend

### Remplacement des données mock
1. Remplacer `mockNews` par appels API réels
2. Remplacer `mockUsers` par système d'auth JWT
3. Remplacer `mockGlossary` par API glossaire
4. Remplacer `mockSources` par API sources

### Gestion d'état
- Context d'authentification avec API
- Gestion des erreurs et loading states
- Synchronisation temps réel

### Fonctionnalités avancées
- Bookmarks persistants en DB
- Historique de lecture
- Notifications push
- Analytics d'usage

## 5. Fonctionnalités implémentées (Frontend)

✅ **Pages principales**
- HomePage avec articles et catégories
- ArticleDetailPage avec contenu complet
- SearchPage avec filtres
- BookmarksPage pour articles sauvegardés
- ProfilePage avec paramètres utilisateur

✅ **Authentification**
- AuthPage avec login/register
- Gestion des sessions
- Rôles utilisateur/admin

✅ **Panel Admin**
- Gestion des utilisateurs
- Gestion des sources de news
- Configuration de l'analyse IA
- Support client
- Gestion du glossaire

✅ **Fonctionnalités**
- Theme sombre/clair
- Navigation mobile responsive
- Recherche avec filtres
- Glossaire interactif
- Toasts notifications
- Design fidèle aux maquettes

## 6. Prochaines étapes

1. Implémenter les endpoints backend
2. Intégrer l'authentification JWT
3. Remplacer les données mock
4. Ajouter la gestion d'images
5. Tests complets frontend/backend
6. Optimisations performance