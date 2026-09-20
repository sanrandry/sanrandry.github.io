# Randry — Portfolio, deux univers

Portfolio bilingue FR/EN, construit avec Next.js App Router, React, Tailwind CSS et SCSS. Sculpture en perspective CSS, dock, fenêtre déplaçable, projets détaillés et terminal à commandes limitées. Sass compile les styles au build ; aucun moteur 3D ni bibliothèque UI.

## Développement

Node.js 22.6+ pour les tests TypeScript sans framework.

```sh
npm ci
npm run dev
npm test
npm run lint
npx tsc --noEmit
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

## Organisation / maintenance

```text
src/
  app/                         Routes, layouts, métadonnées et styles globaux
    page.tsx                   Compose la route / (Server Component)
    portfolio/page.tsx         Route du portfolio classique
  features/web-os/
    WebOSPortfolio.tsx         Entrée client : composition, pas de vues inline
    model.ts                   Règles pures : état valide, recherche, terminal
    content.ts                 Contenu traduit, noms des apps, technologies
    hooks/                     Historique/préférence, fenêtre, plein écran, apparence
    shell/                     Bureau, lanceur mobile, fenêtre et dock
    views/                     Une vue par écran, cartes projet partagées
    dialogs/                   Univers, réglages, recherche et fiche projet
    ui/                        Icônes, horloge, sculpture, contrôles plein écran
    styles/index.scss          Point d'entrée SCSS et ordre de cascade
    styles/_*.scss             Styles par responsabilité et variante visuelle
  components/                  Interface classique conservée
  context/                     Langue du portfolio classique
  hooks/                       Animation du portfolio classique
  lib/i18n.ts                  Traductions et données communes aux deux interfaces
```

App Router n'impose pas de mettre tous les modules dans `app`. Ici, `app` décrit les routes et `features/web-os` regroupe la fonctionnalité interactive. C'est une organisation [documentée par Next.js](https://nextjs.org/docs/app/getting-started/project-structure), pas une seconde couche de routage.

### Où modifier quoi ?

| Besoin | Fichier ou dossier |
| --- | --- |
| Texte, parcours ou projet FR/EN | `src/lib/i18n.ts` |
| Technologies d'un projet, libellés des apps | `src/features/web-os/content.ts` ; conserver l'ordre des projets FR/EN, vérifié par `npm test` |
| Contenu d'un écran | `src/features/web-os/views/*View.tsx` |
| Navigation, Retour/Suivant, préférence d'univers | `src/features/web-os/hooks/usePortfolioSession.ts` |
| Position et agrandissement de fenêtre | `src/features/web-os/hooks/useDesktopWindow.ts` |
| Entrée/sortie du plein écran | `src/features/web-os/hooks/useFullscreen.ts` |
| Langue, thème, activation des animations | `src/features/web-os/hooks/useAppearance.ts` |
| Recherche ou dialogue | `src/features/web-os/dialogs/` |
| Style mobile, bureau ou Android | `styles/_mobile-*.scss`, `_desktop-*.scss`, `_chromeos.scss`, `_pixel.scss` |
| Couleurs et mouvement | `styles/_base.scss`, `_theme-motion.scss`, variantes Android |

### Règles simples

- `model.ts` et `content.ts` ne dépendent ni de React ni du navigateur. Les hooks utilisent ces règles ; l'interface utilise les hooks et le contenu. Pas de repository, injection de dépendances ou store global supplémentaire.
- `WebOSPortfolio` garde les hooks montés pendant toute la visite. `PortfolioViews` garde le brouillon/historique du terminal et le retour de copie **au-dessus** du rendu `key={page}` : déplacer cet état dans une vue le réinitialiserait à chaque navigation.
- L'historique pilote les dialogues natifs. Passer par les actions de session ; ne pas ajouter un deuxième état `isOpen` ni appeler `showModal()` depuis une vue. Initialisation de la préférence et de l'historique atomique pour éviter un flash du mauvais univers.
- SCSS utilise `@use`, pas l'ancien `@import` Sass. `index.scss` conserve l'ordre : base → contenu → responsive → variantes Android → ajustements transversaux. Ne pas trier ces imports alphabétiquement.
- Tailwind en priorité pour les styles simples dans le JSX (grilles, alignements, espacements, dimensions). Les règles de base correspondantes sont supprimées du SCSS, pas dupliquées avec `@apply`. Les classes sémantiques restantes servent aux effets, thèmes, variantes responsive et tests. Les exceptions SCSS non placées dans une couche CSS restent prioritaires sur les utilitaires : ne pas tenter de les écraser par accumulation de classes.
- SCSS reste adapté à la 3D, aux dessins CSS, aux animations et aux variantes complexes des coques. Tailwind et Sass sont compilés séparément : l'import Tailwind reste dans `app/globals.css`, les `@use` dans `features/web-os/styles/index.scss`.
- Les propriétés CSS personnalisées restent des variables CSS : elles permettent thème et déplacement dynamiques. SCSS sert à organiser et compiler les styles, pas à remplacer ce mécanisme navigateur.
- Les utilitaires Tailwind et `app/globals.css` restent nécessaires au portfolio classique ; pas de migration inutile de cette route.

### Vérification d'une modification

`npm test` vérifie terminal, recherche Unicode, validation d'historique/préférence et cohérence du contenu FR/EN. `npm run test:browser` couvre Retour/Suivant, dialogues, rechargement, plein écran et persistance du terminal via Chrome/CDP. Lint, TypeScript et build restent nécessaires après un déplacement de fichier.

Pour un changement visuel : vérifier les deux univers, FR/EN, clair/sombre, mobile 320/390 px et bureau 768/1440 px. Ouvrir les six vues, huit projets, recherche et réglages ; contrôler focus, défilement et absence de débordement. Comparer aussi `/portfolio/` si les styles globaux changent.

## Contenu

Les visuels des projets sont des illustrations conceptuelles, pas des captures des produits. Aucun lien de démo inventé. Portrait original préservé ; avatar WebP optimisé pour le bureau. Aperçu social disponible dans `public/images/og-image.png`.

Cadrage, critères d’acceptation et bilan de validation : `BMAD.md`.
