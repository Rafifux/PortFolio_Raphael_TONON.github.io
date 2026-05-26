# 🍕 AppResto — Documentation client

> **AppResto** est une application web de gestion de commandes de restaurant clé en main.
> Elle permet aux **clients** de commander en ligne et aux **restaurateurs** de gérer les commandes en temps réel.

> **Version statique exportée** : cette copie a été transformée pour présentation statique dans le portfolio. Les formulaires de connexion, d'inscription et de paiement ne sont pas fonctionnels sans le backend PHP/MySQL original.

---

## 📑 Table des matières
1. [Présentation du projet](#presentation)
2. [Technologies utilisées](#technologies)
3. [Accès au projet](#acces)
4. [Installation locale](#installation)
5. [Configuration (.env)](#configuration)
6. [Structure du projet](#structure)
7. [Fonctionnalités livrées](#fonctionnalites)
8. [Déploiement en production](#deploiement)
9. [Sauvegarde et maintenance](#maintenance)
10. [Limitations connues](#limitations)
11. [Documentation API](#api)
12. [Procédure de support](#support)
13. [Licence et propriété](#licence)

---

## 1. Présentation du projet {#presentation}

### Qu'est-ce que AppResto ?

**AppResto** est une solution complète de gestion de commandes pour restaurants permettant :

✅ **Côté client** :
- Inscription et connexion sécurisée
- Consultation du catalogue de produits (pizzas, boissons, desserts, etc.)
- Gestion du panier (ajouter, modifier, supprimer des articles)
- Passage à la caisse avec choix "Sur place" ou "À emporter"
- Suivi en temps réel de la commande (initiale → acceptée → en préparation → prête)

✅ **Côté restaurateur** :
- Dashboard des commandes en attente
- Acceptation/Refus des commandes
- Marquer les commandes comme "Prête"
- Historique complet des commandes
- Gestion du catalogue de produits

### Problème résolu
AppResto permet aux restaurants **petits et moyens** d'accepter des commandes en ligne sans infrastructure complexe, tout en conservant un contrôle total sur les opérations.

### Avantages
🚀 Augmentation des ventes (commandes 24/7)  
⚡ Réduction des erreurs (commandes en ligne précises)  
📊 Historique complet des commandes  
🔐 Paiement fictif intégré (adaptable)  

---

## 2. Technologies utilisées {#technologies}

| Couche | Technologie | Version |
|--------|-------------|---------|
| **Frontend** | HTML5, CSS3, JavaScript (vanilla) | ES6+ |
| **Backend** | PHP | 7.4+ |
| **Base de données** | MySQL / MariaDB | 5.7+ / 10.3+ |
| **Serveur web** | Apache | 2.4+ |
| **Hébergement** | XAMPP (dev) / Serveur dédié (prod) | - |

---

## 3. Accès au projet {#acces}

### URLs de production
```
Production  : https://appresto.votrerestaurant.com
Admin       : https://appresto.votrerestaurant.com/admin/
Staging/Test: https://staging.appresto.votrerestaurant.com (si applicable)
```

### Comptes de démonstration
⚠️ **À changer immédiatement en production** avec des identifiants sécurisés !

```
Admin :
  Email : admin@appresto.local
  Pseudo : admin_demo
  Mot de passe : Password123! (À CHANGER)

Client test :
  Email : client@appresto.local
  Pseudo : client_demo
  Mot de passe : Password123! (À CHANGER)
```

> 🔴 **IMPORTANT** : Ces mots de passe doivent être changés avant la mise en production.

---

## 4. Installation locale {#installation}

### Prérequis
- PHP 7.4+ 
- MySQL 5.7+ ou MariaDB 10.3+
- Apache
- Git (optionnel)
- Composer (non requis pour cette version)

### Étapes d'installation

#### 1️⃣ Cloner ou télécharger le projet
```bash
# Clonage (si disponible sur Git)
git clone https://github.com/votre-repo/appresto.git appresto
cd appresto/Lot\ 9

# OU téléchargement manuel
# Extraire l'archive dans htdocs (XAMPP) ou équivalent
```

#### 2️⃣ Créer la base de données
```bash
# Accédez à phpMyAdmin
# http://localhost/phpmyadmin

# Importez le fichier SQL
# Menu "Importer" → db_pizapp.v4.sql (recommandé)
# ou db_pizapp.sql (version antérieure)
```

#### 3️⃣ Configurer la connexion
Éditez `ConnexionBDD.php` :
```php
$server = "localhost";
$username = "root";           // Votre utilisateur MySQL
$password = "";               // Votre mot de passe MySQL
$db = "db_pizapp";            // Nom de la base
```

#### 4️⃣ Vérifier l'installation
```bash
# Accédez à l'application
http://localhost/Lot\ 9/

# Vous devez voir la page d'accueil
# Essayez de vous connecter avec un compte test
```

---

## 5. Configuration (.env) {#configuration}

### Variables importantes
Créez un fichier `.env.local` à la racine (optionnel, pour les configurations sensibles) :

```env
# Base de données
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=db_pizapp

# Serveur
APP_ENV=production
APP_DEBUG=false
APP_URL=https://appresto.votrerestaurant.com

# Paiement (intégration future)
STRIPE_KEY=sk_live_xxxxx
STRIPE_PUBLIC=pk_live_xxxxx

# Email (notifications)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=noreply@appresto.com
MAIL_PASS=xxxxx
```

### Fichier actuel
Pour cette version, la configuration est dans `ConnexionBDD.php` (voir section Installation).

---

## 6. Structure du projet {#structure}

```
Lot 9/
├── index.php                 # Page d'accueil (connexion/inscription)
├── ConnexionBDD.php          # Configuration base de données
├── Connexion.php             # Traitement login
├── Deconnexion.php           # Logout
├── CreateAccount.php         # Traitement inscription
│
├── productlist.php           # Catalogue des produits
├── products.php              # Requête MySQL pour les produits
├── productcard.php           # Rendu d'une carte produit
├── cart.php                  # Gestion du panier (localStorage)
├── Checkout.php              # Interface de paiement/caisse
├── commande_valide.php       # Page de confirmation
│
├── create_commande.php       # Création d'une commande (API)
├── api/
│   ├── commandes_en_attente.php   # Liste des commandes en attente (JSON)
│   ├── commande_accepter.php      # Accepter une commande
│   ├── commande_refuser.php       # Refuser une commande
│   ├── commande_terminer.php      # Marquer comme prête
│
├── order-status-client/      # Suivi de commande côté client
├── css/                      # Feuilles de style
├── img/                      # Images (produits, logos)
├── scripts/                  # JavaScript côté client
│   ├── cart.js               # Gestion du panier
│   ├── product-filters.js    # Filtrage des produits
│
├── db/
│   ├── db_pizapp.v4.sql      # Dump complet de la BD (RECOMMANDÉ)
│   ├── db_pizapp.sql         # Version antérieure
│   ├── Trigger.md            # Documentation des triggers SQL
│
├── README.md                 # Ce fichier
├── GUIDE_UTILISATEUR.md      # Guide opérationnel (restaurateur)
└── navbar.php                # Barre de navigation (réutilisable)
```

### Fichiers clés
- **ConnexionBDD.php** : Modification requise pour chaque environnement
- **db_pizapp.v4.sql** : À importer pour créer la BD (recommandé)
- **Lot 9/** : Tous les fichiers de cette version

---

## 7. Fonctionnalités livrées {#fonctionnalites}

### ✅ Incluses
- [x] Inscription et connexion sécurisée (bcrypt)
- [x] Catalogue de produits consultable
- [x] Panier avec localStorage
- [x] Checkout avec modal
- [x] Commandes enregistrées en BD
- [x] Statuts de commande (initiale → acceptée → prête → refusée)
- [x] API RESTful pour restaurateur
- [x] Historique complet des commandes
- [x] Page de confirmation de commande

### ⏳ Non incluses (futures versions)
- [ ] Paiement réel (Stripe, PayPal)
- [ ] Notifications email/SMS
- [ ] Livreur et suivi GPS
- [ ] Avis clients
- [ ] Programme de fidélité
- [ ] Dashboard statistiques avancées

---

## 8. Déploiement en production {#deploiement}

### Sur un serveur dédié

#### 1️⃣ Préparer le serveur
```bash
# 1. SSH sur votre serveur
ssh user@votredomaine.com

# 2. Installer les prérequis
sudo apt update
sudo apt install apache2 php7.4 mysql-server php7.4-mysql php7.4-mbstring

# 3. Configurer Apache
sudo a2enmod rewrite
sudo systemctl restart apache2

# 4. Configurer MySQL
sudo mysql_secure_installation
```

#### 2️⃣ Déployer AppResto
```bash
# Télécharger les fichiers
cd /var/www/html
sudo git clone <repo> appresto
cd appresto/Lot\ 9

# Permissions
sudo chown -R www-data:www-data .
sudo chmod -R 755 .
```

#### 3️⃣ Configurer SSL (HTTPS)
```bash
# Installez Certbot
sudo apt install certbot python3-certbot-apache

# Générez le certificat
sudo certbot --apache -d appresto.votredomaine.com
```

#### 4️⃣ Configurer la BD
```bash
# Créer la base
mysql -u root -p
CREATE DATABASE db_pizapp;
EXIT;

# Importer le dump
mysql -u root -p db_pizapp < db/db_pizapp.v4.sql
```

#### 5️⃣ Mettre en ligne
- Accédez à `https://appresto.votredomaine.com`
- Testez l'application complètement

### CI/CD (optionnel avec GitHub Actions)
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to server
        run: |
          ssh-agent bash -c 'ssh-add /home/user/.ssh/id_rsa; git pull'
```

---

## 9. Sauvegarde et maintenance {#maintenance}

### 📅 Sauvegardes régulières

#### Sauvegarder la base de données
```bash
# Sauvegarde hebdomadaire
mysqldump -u root -p db_pizapp > backup_appresto_$(date +%Y-%m-%d).sql

# Sauvegarder les fichiers
tar -czf appresto_backup_$(date +%Y-%m-%d).tar.gz /var/www/html/appresto/
```

#### Restaurer une sauvegarde
```bash
# Base de données
mysql -u root -p db_pizapp < backup_appresto_2026-05-07.sql

# Fichiers
tar -xzf appresto_backup_2026-05-07.tar.gz
```

### 🔄 Mises à jour

#### Mise à jour PHP
```bash
# Vérifier la version actuelle
php -v

# Mettre à jour
sudo apt update
sudo apt upgrade php7.4
sudo systemctl restart apache2
```

#### Mise à jour MySQL
```bash
sudo apt update
sudo apt upgrade mysql-server
```

### 🛡️ Sécurité continue
- Changez les mots de passe admin tous les 90 jours
- Vérifiez les logs d'accès (`/var/log/apache2/access.log`)
- Exécutez un antivirus régulièrement
- Mettez à jour les dépendances PHP

### 📊 Monitoring
```bash
# Vérifier l'espace disque
df -h

# Vérifier l'utilisation CPU/RAM
top

# Vérifier MySQL
systemctl status mysql
```

---

## 10. Limitations connues {#limitations}

⚠️ **Points importants à connaître** :

1. **Paiement fictif** : Les paiements ne sont pas réels. Intégrez Stripe/PayPal pour la production.
2. **Sans notifications** : Pas d'email/SMS automatiques (à ajouter).
3. **Sans livreur** : Gestion manuelle des livraisons (pas de GPS).
4. **Performance** : Peut supporter ~500 commandes/jour en production. Au-delà, optimisation requise.
5. **Scalabilité** : Base de données unique. Pour très gros volume, sharding recommandé.
6. **Support offline** : L'application requiert une connexion internet constante.

---

## 11. Documentation API {#api}

### Endpoints restaurateur (restaurateur uniquement)

#### Récupérer les commandes en attente
```bash
GET /api/commandes_en_attente.php

# Réponse (JSON)
[
  {
    "idcommande": 1,
    "utilisateur": "client_name",
    "montant_ttc": 29.99,
    "type_commande": "sur_place",
    "idetat": 1,
    "date_heure_commande": "2026-05-07 14:30:00"
  }
]
```

#### Accepter une commande
```bash
POST /api/commande_accepter.php
Content-Type: application/json

{
  "idcommande": 1
}

# Réponse
{ "success": true, "message": "Commande acceptée" }
```

#### Refuser une commande
```bash
POST /api/commande_refuser.php
Content-Type: application/json

{
  "idcommande": 1
}

# Réponse
{ "success": true, "message": "Commande refusée" }
```

#### Marquer comme prête
```bash
POST /api/commande_terminer.php
Content-Type: application/json

{
  "idcommande": 1
}

# Réponse
{ "success": true, "message": "Commande prête" }
```

**Authentification** : Nécessite une session valide (`$_SESSION['user_id']`)

---

## 12. Procédure de support {#support}

### Avant de contacter le support
1. ✅ Vérifiez qu'Apache et MySQL tournent
2. ✅ Vérifiez les logs (`/var/log/apache2/error.log`)
3. ✅ Testez avec un compte différent
4. ✅ Videz le cache du navigateur

### Contacter le support

| Urgence | Contact | Temps réponse |
|---------|---------|---------------|
| 🔴 **Critique** (app down) | raphael.tonon@gmail.com | 24h |
| 🟡 **Standard** (bug) | raphael.tonon@gmail.com | 72h |
| 🟢 **Question** (feature) | raphael.tonon@gmail.com | 1 semaine |

**En contactant le support, fournissez** :
- 📋 Description du problème
- 🖼️ Capture d'écran si applicable
- 📊 Logs d'erreur (copier-coller)
- 🕐 Heure du problème
- 👤 Compte impacté

### Logs importants
```
# Apache
/var/log/apache2/error.log
/var/log/apache2/access.log

# MySQL
/var/log/mysql/error.log

# Application
# Activer le debug dans Checkout.php
```

---

## 13. Licence et propriété {#licence}

### Propriété du code
✅ **Propriétaire** : [Votre nom / Entreprise]  
✅ **Développeur** : Raphael Tonon  
✅ **Date** : Mai 2026  
✅ **Version** : Lot 9  

### Droits d'utilisation
- ✅ Vous pouvez utiliser AppResto pour votre restaurant
- ✅ Vous pouvez le modifier pour vos besoins
- ❌ Vous ne pouvez pas le revendre
- ❌ Vous ne pouvez pas le redistribuer

### Dépendances externes
- ✅ PHP : Open source (PHP Group)
- ✅ MySQL : Open source (Oracle)
- ✅ Apache : Open source (Apache Foundation)

---

## ✅ Vous êtes prêt !

**Checklist finale avant production** :
- [ ] Installation complète testée
- [ ] Base de données importée
- [ ] Produits ajoutés
- [ ] Mots de passe changés
- [ ] HTTPS/SSL configuré
- [ ] Sauvegardes mises en place
- [ ] Équipe formée
- [ ] Support défini

**Bon succès avec AppResto ! 🍕**

---

**Documentation version** : Lot 9  
**Dernière mise à jour** : Mai 2026  
**Contact** : raphael.tonon@gmail.com

### 5️⃣ Création de la commande
- **Fichier** : `create_commande.php`
- **Réception** : `{ cart: [...], type_commande: "..." }`
- **Traitement** :
  1. Récalcule les prix côté serveur (sécurité)
  2. Crée enregistrement dans `commande` (montant_ttc, idetat = "initialisée")
  3. Crée lignes dans `ligne_de_commande` (id_produit, quantité, prix_unitaire)
  4. Renvoie `{ success: true, orderId: ... }`

### 6️⃣ Confirmation de commande
- **Page** : `commande_valide.php?id=<orderId>`
- **Affichage** :
  - Numéro de commande
  - Date/heure
  - Montant TTC
  - Statut initial ("Initialisée")
- **Lien** : Accès à `order-status-client/` pour suivre la commande

### 7️⃣ Suivi de commande (client)
- **Dossier** : `order-status-client/`
- **Affichage** : État actuel de la commande
- **Statuts possibles** :
  - "Initialisée"
  - "Acceptée"
  - "En préparation"
  - "Prête"
  - "Refusée"

### 8️⃣ Gestion des commandes (restaurateur)
- **Dossier** : `api/`
- **Endpoints** :
  - `commandes_en_attente.php` — Liste des commandes à traiter
  - `commande_accepter.php` — Passer au statut "Acceptée"
  - `commande_refuser.php` — Passer au statut "Refusée"
  - `commande_terminer.php` — Passer au statut "Prête"
- **Méthode** : POST JSON
- **Exemple** :
  ```javascript
  POST api/commande_accepter.php
  { "idcommande": 1 }
  Response: { "success": true, "message": "..." }
  ```

---

## Installation et configuration {#installation}

### Prérequis
- Windows avec XAMPP installé
- MySQL/MariaDB démarré
- Apache démarré

### Étape 1 : Copie des fichiers
1. Placer le dossier `PizApp/Lot 9` dans `C:\xampp\htdocs\`
2. Ou copier son contenu dans un sous-dossier de `htdocs` (ex. `PizApp_Lot9`)

### Étape 2 : Base de données

#### a) Créer la base
1. Accéder à phpMyAdmin : `http://localhost/phpmyadmin`
2. Cliquer sur "Nouvelle base de données"
3. Nommer la base : `db_pizapp` (ou autre, à adapter dans `ConnexionBDD.php`)
4. Charset : UTF-8
5. Cliquer sur "Créer"

#### b) Importer le schéma
1. Sélectionner la base `db_pizapp`
2. Aller à l'onglet "Importer"
3. Choisir le fichier `db/db_pizapp.v4.sql` (ou `db_pizapp.sql`)
4. Cliquer sur "Exécuter"

#### c) Créer les triggers (optionnel mais recommandé)
1. Aller à l'onglet "SQL"
2. Copier/coller les requêtes du fichier `db/Trigger.md`
3. Exécuter chaque trigger
> **Triggers principaux** : calcul automatique de `montant_ht`, `montant_ttc`, `total_articles`

### Étape 3 : Configuration de la connexion

**Fichier** : `ConnexionBDD.php`

```php
$server = "localhost";        // Serveur MySQL
$username = "root";           // Utilisateur MySQL
$password = "";               // Mot de passe (vide par défaut en dev)
$db = "db_pizapp";            // Nom de la base
```

**Adapter ces valeurs selon votre environnement.**

### Étape 4 : Démarrage

1. Ouvrir XAMPP et vérifier que Apache et MySQL sont verts ✅
2. Naviguer à : `http://localhost/Lot 9/index.php` (ou votre chemin)
3. Vous devriez voir la page d'accueil

---

## Structure des fichiers {#fichiers}

```
Lot 9/
├── index.php                    # Accueil (public)
├── Connexion.php                # Traitement login
├── CreateAccount.php            # Création de compte
├── Deconnexion.php              # Logout
├── ConnexionBDD.php             # Configuration DB (À ADAPTER)
│
├── productlist.php              # Affichage catalogue
├── products.php                 # Requête SQL produits
├── productcard.php              # Template carte produit
│
├── cart.php                     # Affichage panier côté serveur
├── Checkout.php                 # Modal paiement
├── create_commande.php          # API création commande
├── commande_valide.php          # Confirmation post-commande
│
├── navbar.php                   # Barre de navigation
│
├── api/
│   ├── commandes_en_attente.php # Récupère commandes à traiter
│   ├── commande_accepter.php    # Accepte une commande
│   ├── commande_refuser.php     # Refuse une commande
│   └── commande_terminer.php    # Marque comme prête
│
├── order-status-client/
│   └── ...                      # Pages suivi commande client
│
├── scripts/
│   ├── cart.js                  # Gestion panier (localStorage)
│   ├── main.js                  # Scripts généraux
│   ├── form-helpers.js          # Validation formulaires
│   └── product-filters.js       # Filtrage produits
│
├── css/
│   └── styles.css               # Feuille de styles
│
├── img/                         # Images (logos, icônes)
│
├── db/
│   ├── db_pizapp.v4.sql         # Dump complet (RECOMMANDÉ)
│   ├── db_pizapp.sql            # Dump alternatif
│   └── Trigger.md               # Description des triggers
│
└── README.md                    # Ce fichier
```

### Fichiers clés à connaître

| Fichier | Rôle | Modifications courantes |
|---------|------|------------------------|
| `ConnexionBDD.php` | Connexion DB | Host, username, password, db name |
| `create_commande.php` | Création commande | Logique métier (prix, taxes, etc.) |
| `api/commande_*.php` | Gestion statuts | Permissions, notifications |
| `productlist.php` | Affichage catalogue | Filtres, tri, pagination |
| `Checkout.php` | Modal paiement | Champs formulaire, validation |

---

## Guide de test {#test}

### 🔧 Test setup
1. S'assurer que MySQL et Apache tournent ✅
2. Base de données importée ✅
3. `ConnexionBDD.php` bien configuré ✅

### 📝 Comptes de test préchargés

| Login | Email | Note |
|-------|-------|------|
| `lasv_lya` | `LLaa@gmail.com` | Utilisateur 1 |
| `TONON_Raphael` | `raphael.tonon@gmail.com` | Utilisateur 2 |

> Les mots de passe sont hachés (bcrypt) dans la base. Contactez un admin ou recréez un compte de test.

### ✅ Parcours de test complet

#### 1. Accueil et inscription
- [ ] Ouvrir `http://localhost/Lot 9/index.php`
- [ ] Vérifier affichage de la page d'accueil
- [ ] Créer un nouveau compte via `CreateAccount.php`
- [ ] Se connecter

#### 2. Catalogue et panier
- [ ] Accéder à `productlist.php`
- [ ] Vérifier affichage des produits (pizzas, boissons, desserts)
- [ ] Ajouter 3-4 articles au panier
- [ ] Vérifier que le panier se met à jour (`localStorage`)
- [ ] Voir le total recalculé

#### 3. Paiement et commande
- [ ] Cliquer sur "Passer à la caisse"
- [ ] Vérifier que le modal apparaît avec les articles
- [ ] Sélectionner type de commande ("Sur place" OU "À emporter")
- [ ] Remplir formulaire de paiement (fictif, n'importe quels nombres)
- [ ] Cliquer "Confirmer le paiement"

#### 4. Confirmation
- [ ] Vérifier redirection vers `commande_valide.php?id=<N>`
- [ ] Affichage numéro commande, date, montant
- [ ] Vérifier dans phpMyAdmin :
  - Nouvelle ligne dans table `commande`
  - Lignes correspondantes dans `ligne_de_commande`

#### 5. Suivi commande (optionnel)
- [ ] Accéder à `order-status-client/` avec le numéro de commande
- [ ] Vérifier affichage du statut "Initialisée"

#### 6. Gestion restaurateur (optionnel)
- [ ] Accéder à `api/commandes_en_attente.php` (en GET pour test)
- [ ] Vérifier retour JSON des commandes
- [ ] Tester acceptation via `api/commande_accepter.php` (POST JSON)

---

## Fonctionnalités du Lot 9 {#lot9}

### ✨ Nouveautés par rapport aux lots précédents

#### 1. Modal Checkout améliorée
- **Fichier** : `Checkout.php`
- **Changements** :
  - Design modal responsive
  - Affichage dynamique des articles du panier
  - Calcul du total en temps réel
  - Saisie du type de commande (sur place / à emporter)

#### 2. Pages de confirmation
- **Fichier** : `commande_valide.php`
- **Nouveautés** :
  - Affichage détaillé post-commande
  - Récupération des données de la commande en BD
  - Lien d'accès au suivi de commande

#### 3. API de gestion des commandes
- **Dossier** : `api/`
- **Endpoints** :
  - `GET/POST commandes_en_attente.php` → Liste JSON des commandes
  - `POST commande_accepter.php` → Passe en "Acceptée"
  - `POST commande_refuser.php` → Passe en "Refusée"
  - `POST commande_terminer.php` → Passe en "Prête"
- **Format** : JSON pour communication front-back

#### 4. Page de suivi client
- **Dossier** : `order-status-client/`
- **Affichage** : État de la commande en temps réel
- **Statuts** :
  - 1 = "Initialisée"
  - 2 = "Acceptée"
  - 3 = "En préparation"
  - 4 = "Prête"
  - 5 = "Refusée"

---

## Sécurité et bonnes pratiques {#securite}

### 🔐 Points importants

1. **Authentification**
   - ✅ Vérifier `$_SESSION['user_id']` avant chaque page protégée
   - ✅ Rediriger vers login si session invalide
   - ✅ Hacher les mots de passe en bcrypt (déjà implémenté)

2. **Validation des données**
   - ✅ Toujours valider et nettoyer les entrées utilisateur
   - ✅ Utiliser `mysqli_real_escape_string()` ou requêtes paramétrées
   - ✅ `create_commande.php` recalcule les prix côté serveur (JAMAIS faire confiance au client)

3. **Protection SQL**
   - ✅ Utiliser `mysqli_prepare()` et `mysqli_stmt_bind_param()` pour les requêtes
   - ✅ Éviter les concaténations de chaînes dans les requêtes

4. **Gestion des erreurs**
   - ⚠️ Ne pas afficher les erreurs SQL au client
   - ⚠️ Logger les erreurs en fichier/base pour le debug
   - ⚠️ Afficher un message générique à l'utilisateur

5. **Production**
   - ❌ Ne JAMAIS laisser les mots de passe par défaut en production
   - ❌ Créer un utilisateur MySQL limité (ex. `appresto_user` sans accès `DROP`)
   - ❌ Configurer HTTPS (SSL/TLS)
   - ❌ Mettre à jour les dépendances PHP régulièrement

### 📋 Checklist mise en production

- [ ] `ConnexionBDD.php` avec utilisateur MySQL sécurisé
- [ ] Vérifier que `$_GET` et `$_POST` sont validés partout
- [ ] Tests complets (inscription, panier, commande, suivi)
- [ ] Backup de la base avant déploiement
- [ ] Logs configurés (erreurs, accès, commandes)
- [ ] SSL/HTTPS activé
- [ ] Sanitisation des inputs finalisée

---

## Troubleshooting

| Problème | Cause | Solution |
|----------|-------|----------|
| Page blanche | Erreur PHP non affichée | Vérifier `error_log` ou activer `display_errors` en dev |
| "Connexion refusée" | MySQL ne tourne pas | Démarrer MySQL via XAMPP |
| "Table introuvable" | Base non importée | Importer `db_pizapp.v4.sql` |
| Panier vide | localStorage désactivé | Vérifier que JS n'a pas d'erreur en console |
| Commande non créée | Erreur `create_commande.php` | Vérifier logs PHP et réponse AJAX en console (F12) |

---

## Contacts et support

Pour plus d'informations :
- Consulter les **diagrammes UML** dans `../Lot 1/`
- Vérifier les **triggers SQL** dans `db/Trigger.md`
- Contacter l'équipe de développement

---

**Dernière mise à jour** : Mai 2026  
**Auteur(s)** : TONON Raphaël et équipe  
**Version** : Lot 9

## 11. Modèle conceptuel des données (MCD)
Le MCD (entités et associations) peut être dérivé directement des diagrammes et des tables SQL fournis. Les entités principales sont :

- `Utilisateur` — `iduser`, `login_utilisateur`, `email_utilisateur`, `mot_de_passe_utilisateur`.
- `Produit` — `idproduit`, `typeproduit`, `nomproduit`, `libproduit`, `prixproduit`, `imgproduit`.
- `Commande` — `idcommande`, `date_heure_commande`, `montant_ttc`, `type_commande`, `iduser`, `idetat`.
- `Ligne_de_commande` — `idcommande`, `idproduit`, `quantite`, `total_ht`.
- `Etat` — `idetat`, `libetat`, `description`.

Relations clés :
- `Utilisateur` 1 — N `Commande`.
- `Commande` 1 — N `Ligne_de_commande`.
- `Ligne_de_commande` N — 1 `Produit`.
- `Commande` N — 1 `Etat`.

Pour obtenir le diagramme visuel, ouvrir `AP1.SLAM(MCD,Lot1).loo` dans l'outil d'origine ou générer un export depuis phpMyAdmin après import.

## 12. Modèle logique des données (MLD)
Le MLD correspond à la représentation relationnelle (types, clés, contraintes) présente dans `db_pizapp.v4.sql` :

- Types : `int`, `varchar`, `text`, `double`/`decimal` pour montants.
- PK/Index : `idproduit`, `iduser`, `idcommande`, `idetat`.
- FK : `commande.iduser` → `utilisateur.iduser`, `ligne_de_commande.idproduit` → `produit.idproduit`, `ligne_de_commande.idcommande` → `commande.idcommande`.

Importer le script `db_pizapp.v4.sql` dans phpMyAdmin permet d'utiliser l'outil "Designer" pour visualiser le MLD.

## 13. Modèle physique des données (scripts SQL)
Le modèle physique est fourni par les scripts SQL dans `Lot 3/db/` :
- `db_pizapp.v4.sql` (recommandé) — structure + données + contraintes.
- `db_pizapp.sql` — alternative plus légère.
- `Trigger.md` — description et SQL des triggers (calcul `total_ht`, recalcul montant TTC selon `type_commande`).

Exécuter ces scripts installe les tables, les données d'exemple et les contraintes.

## 14. Valeurs possibles et conventions

- États des commandes (`etat`) — valeurs définies par les scripts :
  - `1` : `initialisée`
  - `2` : `finalisée`
  - `3` : `calculée`
  - `4` : `en attente`
  - `5` : `abandonnée`
  - `6` : `en préparation`
  - `7` : `prête`
  - `8` : `servie`

- Types de consommation (`type_commande`) :
  - `1` = `à emporter` (TVA 5.5% dans `Trigger.md`)
  - `0` = `sur place` (TVA 10% dans `Trigger.md`)

Ces conventions sont utilisées dans `create_commande.php` et par les triggers.

## 15. Sitemap (enchaînement des pages)
Parcours utilisateur principal :

- `index.php` → (`Connexion.php` | `CreateAccount.php`) → connexion
- après connexion → `productlist.php` (catalogue)
  - composant `productcard.php` pour chaque produit
  - panneau `cart.php` (inclus globalement)
  - scripts frontend : `scripts/cart.js` (localStorage `pizapp_cart`)
- checkout : `create_commande.php` (POST JSON) → `commande_valide.php`
- autres pages : `Checkout.php`, `Deconnexion.php`.

## 16. Maquettes IHM (Lot 1)
- Voir `Lot 1/Appresto(IHM).pdf` pour la maquette complète (export PDF).  
- Les sources de diagrammes et maquettes se trouvent dans `Lot 1/` (`.loo` et XML draw.io). Ouvrez-les avec draw.io, LibreOffice Draw, ou l'outil d'édition approprié.

## 18. Manuel d'utilisation (Lot 3)

Cette section décrit pas-à-pas les actions utilisateur courantes implémentées dans `Lot 3/`.

### Inscription
- Page : `CreateAccount.php`  
- Description : formulaire côté serveur pour créer un nouveau compte. Les champs typiques incluent `login`, `email`, `mot_de_passe` ; le mot de passe doit être haché avant insertion (la page utilise `password_hash()` ou équivalent si présent).  
- Étapes utilisateur :
  1. Ouvrir `CreateAccount.php` dans le navigateur.
  2. Remplir `login`, `email` et `mot de passe` puis soumettre.
  3. Après succès, l'utilisateur est généralement redirigé vers `Connexion.php` (comportement dépend de l'implémentation actuelle de `CreateAccount.php`).

### Connexion
- Page : `Connexion.php`  
- Description : authentification basée sur `login` et `mot_de_passe` ; la comparaison doit utiliser `password_verify()` pour vérifier le hachage stocké dans `utilisateur.mot_de_passe_utilisateur`.
- Étapes utilisateur :
  1. Ouvrir `Connexion.php`.
  2. Saisir `login` et `mot de passe` puis soumettre.
  3. Si l'authentification réussit : `$_SESSION['user_id']` et `$_SESSION['user_login']` sont définis, puis redirection vers `productlist.php`.
  4. Si échec : le code affiche une erreur et renvoie à la page de connexion.

### Commande (sélection et envoi)
- Pages/composants impliqués : `productlist.php`, `productcard.php`, `cart.php`, `scripts/cart.js`, `create_commande.php`.
- Description : le client parcourt la liste des produits (rendu par `productcard.php`) et ajoute des items au panier. Le panier est stocké côté client dans `localStorage` sous la clé `pizapp_cart` et synchronisé lors de la validation.
- Étapes utilisateur :
  1. Se rendre sur `productlist.php` (requiert authentification).
  2. Cliquer sur les boutons d'ajout (les boutons portent les attributs `data-product-id`, `data-product-title`, `data-product-price`).
  3. Ouvrir le panneau panier (icône `cart-toggle`) pour vérifier/ajuster quantités ou supprimer des items.
  4. Cliquer sur `Passer à la caisse` pour ouvrir le panneau de paiement (`checkout-panel`).
  5. Confirmer la commande : le front envoie une requête `POST` JSON vers `create_commande.php` avec le corps :

```json
{
  "cart": [{ "id": 12, "quantity": 2 }, { "id": 31, "quantity": 1 }],
  "type_commande": 1
}
```

  6. `create_commande.php` : vérifie la session, récupère les prix depuis la base, calcule le total, crée la `commande` et les `ligne_de_commande`, puis renvoie JSON `{ success: true, idcommande: <id> }`.
  7. En cas de succès, le front redirige vers `commande_valide.php?id=<idcommande>`.

### Paiement (interface et notes)
- Interface : panneau de paiement présent dans le DOM (rendu par `cart.php`) et contrôlé par `scripts/cart.js`.
- Comportement actuel : paiement fictif — le formulaire collecte des champs de paiement (nom, numéro, expiry, CVV) mais NE transmet PAS ces données au serveur. Seule la commande (liste d'items + `type_commande`) est envoyée à `create_commande.php` pour créer la commande côté serveur.

Notes supplémentaires :
- `create_commande.php` recalcule les montants côté serveur en utilisant les prix en base — le serveur ne fait pas confiance aux prix envoyés par le client.
- Assurez-vous d'être connecté avant de passer la commande (sinon `productlist.php` redirige vers `Connexion.php`).

---