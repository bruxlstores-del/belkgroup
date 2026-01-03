# BelkGroup - Site Web de Débarras et Vide Maison

## Problème Original
Créer un site web moderne et animé pour "BelkGroup", une entreprise spécialisée dans le débarras d'encombrants et vide maison en Belgique. Le site doit inclure un dashboard admin pour gérer le contenu dynamiquement.

## Fonctionnalités Implémentées

### Site Public
- [x] Hero section avec image de fond personnalisée
- [x] Section "Nos Valeurs" (Satisfaction Client, Responsabilité Environnementale, Flexibilité, Qualité)
- [x] Section "Qui nous sommes" avec image personnalisée
- [x] Section Services (dynamique depuis la base de données)
- [x] Section Galerie/Réalisations avec filtres (Avant/Après, Débarras, Vide maison)
- [x] Section Avis Clients
- [x] Formulaire de Contact fonctionnel
- [x] Footer avec informations de contact
- [x] Animations et effets parallax

### Dashboard Admin (/admin/login)
- [x] Authentification JWT
- [x] Gestion CRUD des Services
- [x] Gestion CRUD de la Galerie
- [x] Visualisation des messages de contact
- [x] Upload d'images local

### Backend
- [x] API FastAPI
- [x] MongoDB pour le stockage
- [x] Authentification JWT sécurisée
- [x] Routes protégées pour l'admin

## Architecture Technique

```
/app
├── backend/
│   ├── server.py          # API principale
│   ├── admin_routes.py    # Routes admin CRUD
│   ├── auth.py            # Authentification JWT
│   ├── models.py          # Modèles Pydantic
│   ├── init_services.py   # Script d'initialisation DB
│   └── .env               # Variables d'environnement
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Page principale
│   │   │   ├── AdminLogin.jsx     # Login admin
│   │   │   └── AdminDashboard.jsx # Dashboard admin
│   │   └── components/ui/         # Composants Shadcn
│   └── .env               # Variables d'environnement
└── uploads/               # Images uploadées
```

## Credentials Admin
- Email: bruxlstores@gmail.com
- Password: SerrarMohamed73@

## Variables d'Environnement

### Backend (.env)
- MONGO_URL
- DB_NAME
- JWT_SECRET_KEY
- ADMIN_EMAIL
- ADMIN_PASSWORD

### Frontend (.env)
- REACT_APP_BACKEND_URL

## État Actuel
- **Statut**: ✅ Prêt pour le déploiement
- **Dernière mise à jour**: 03/01/2025
- **Email**: Configuré avec Resend (envoi vers belkgroupe@gmail.com)

## Tâches Restantes

### P0 - Critique
- [x] Configurer l'envoi d'emails (Resend) pour le formulaire de contact ✅
- [x] Corriger le système d'upload d'images ✅
- [x] Corriger .gitignore pour le déploiement ✅
- [ ] Vérifier le domaine belkgroup.be sur Resend pour envoyer à info@belkgroup.be

### P1 - Important
- [ ] Refactoring de Home.jsx en composants séparés
- [ ] Ajouter pagination pour les routes admin

### P2 - Amélioration
- [ ] Ajouter un menu mobile hamburger
- [ ] Optimiser les images pour le web
- [ ] Ajouter des meta tags SEO

## Notes Techniques
- Les données mock ont été supprimées, tout est dynamique depuis MongoDB
- Les images de la galerie Avant/Après sont stockées en tant qu'URLs externes
- Le formulaire de contact enregistre les messages en DB (consultables via admin)
