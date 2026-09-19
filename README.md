# Randry — Portfolio macOS / iOS

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

- `/` : bureau macOS sur ordinateur, accueil inspiré d’iOS sur téléphone ; français par défaut, thèmes clair/sombre.
- Mobile : widgets, grille d’apps, dock, recherche locale insensible aux accents, réglages et apps plein écran avec retour accueil. Contenus accessibles en portrait et paysage ; aucune application native Apple requise.
- `/portfolio/` : ancien portfolio conservé.
- `out/` : export statique à héberger à la racine du domaine, comme dans le workflow GitHub Pages existant. `next start` ne sert pas cet export ; utiliser un serveur de fichiers statiques pour prévisualiser `out/`.
- Aucun envoi d’e-mail côté serveur : contact par `mailto:`. Le terminal ne lance aucun code système.
- Animations désactivables dans la barre d’état du bureau ou les réglages mobiles ; préférence `prefers-reduced-motion` respectée.

## Contenu

Traductions et parcours : `src/lib/i18n.ts`. Interface : `src/components/WebOSPortfolio.tsx`. Apparence : `src/components/desktop.css`.

Les visuels des projets sont des illustrations conceptuelles, pas des captures des produits. Aucun lien de démo inventé. Portrait original préservé ; avatar WebP optimisé pour le bureau. Aperçu social disponible dans `public/images/og-image.png`.

Cadrage, critères d’acceptation et bilan de validation : `BMAD.md`.
