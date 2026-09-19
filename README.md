# Randry — Portfolio, deux univers

Portfolio bilingue FR/EN, construit avec Next.js, React et CSS natif. Aucun moteur 3D ni nouvelle dépendance : sculpture en perspective CSS, dock, fenêtre déplaçable, projets détaillés et terminal à commandes limitées.

## Développement

Node.js 22.6+ pour les tests TypeScript sans framework.

```sh
npm ci
npm run dev
npm test
npm run lint
npm run build
```

Régression navigateur sans dépendance supplémentaire : démarrer le site et Chrome avec un port de débogage local `9333`, puis `npm run test:browser`. `PORTFOLIO_URL` (défaut `http://127.0.0.1:3000/`) et `CHROME_DEBUG_URL` permettent de cibler un export servi localement et un autre port. Le test utilise un contexte isolé, fermé à la fin ; ne pas exposer le port de débogage sur le réseau.

- `/` : choix iPhone ou Android au premier accès ; français par défaut, thèmes clair/sombre.
- iPhone → macOS sur ordinateur / iOS sur téléphone. Android → ChromeOS sur ordinateur / Pixel sur téléphone. Même contenu et même 3D dans les deux univers.
- Choix enregistré dans `localStorage` (`portfolio-experience`), modifiable depuis la barre/menu macOS ou les réglages ChromeOS/mobiles. Aucun compte ni détection automatique du système ; stockage bloqué sans empêcher la navigation.
- Mobile : widgets, grille d’apps, favoris, recherche locale insensible aux accents, réglages et apps plein écran avec retour accueil. Contenus accessibles en portrait et paysage ; aucune application native requise.
- Retour/Suivant natifs : historique des vues et dialogues, restauré au rechargement. Depuis l’accueil initial, Retour peut quitter le site normalement ; aucun piège de navigation. Les boutons Accueil internes restent des raccourcis vers le lanceur.
- Plein écran sur téléphone et PC : tentative automatique au premier toucher/clic d’un contrôle de navigation, lorsque l’API est disponible. Sur PC, bouton **Éteindre** dans la barre macOS ou le shelf ChromeOS : quitte uniquement le plein écran, sans fermer l’onglet ni perdre la vue courante. Il devient **Plein écran** pour une réactivation manuelle. Réglages mobiles conservés ; aucune réactivation forcée après une sortie. L’autorisation gestuelle du navigateur ne peut pas être contournée. Selon le navigateur, Retour peut d’abord quitter le plein écran avant de parcourir l’historique. Le mode F11/plein écran d’une application installée reste géré par le navigateur ou le système, pas par cette API.
- Depuis l’écran d’accueil du téléphone : manifeste `display: fullscreen`, icônes et métadonnées pour lancement sans barre navigateur. Sur iPhone : Partager → Sur l’écran d’accueil, puis ouvrir l’icône. Le système peut conserver sa barre d’état. Aucun service worker ni mode hors ligne ajouté.
- `/portfolio/` : ancien portfolio conservé.
- `out/` : export statique à héberger à la racine du domaine, comme dans le workflow GitHub Pages existant. `next start` ne sert pas cet export ; utiliser un serveur de fichiers statiques pour prévisualiser `out/`.
- Aucun envoi d’e-mail côté serveur : contact par `mailto:`. Le terminal ne lance aucun code système.
- Animations désactivables dans la barre d’état du bureau ou les réglages mobiles ; préférence `prefers-reduced-motion` respectée.

## Contenu

Traductions et parcours : `src/lib/i18n.ts`. Interface : `src/components/WebOSPortfolio.tsx`. Apparence : `src/components/desktop.css`.

Les visuels des projets sont des illustrations conceptuelles, pas des captures des produits. Aucun lien de démo inventé. Portrait original préservé ; avatar WebP optimisé pour le bureau. Aperçu social disponible dans `public/images/og-image.png`.

Cadrage, critères d’acceptation et bilan de validation : `BMAD.md`.
