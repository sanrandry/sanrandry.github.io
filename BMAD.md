# Portfolio — boucle BMAD légère

## Boucle — refactor maintenable, 20 septembre 2026

### Cadrage

- Demande : sortir du fichier unique, rendre le code lisible et maintenable par un humain.
- Point de départ : `WebOSPortfolio.tsx` contient toute la coque, les vues, les dialogues et les effets navigateur ; `desktop.css` concentre tous les styles.
- Boucle BMAD adaptée, sans installation du framework : analyser → définir les responsabilités → extraire → tester/revoir → corriger → revalider. Référence : [Build a Change](https://docs.bmad-method.org/build/build-a-change/).
- Hors périmètre : nouveau design, nouvelles fonctionnalités, modification du contenu professionnel et déploiement. Seule dépendance ajoutée : Sass, à la demande explicite de SCSS ; aucune version existante modifiée.

### Architecture retenue

- Un dossier fonctionnel `src/features/web-os/`, une entrée de composition explicite.
- Règles pures et contenu sans React ni API navigateur ; hooks pour historique/préférence, fenêtre et plein écran ; UI séparée en coques, vues, dialogues et petits éléments partagés.
- État conservé au niveau de sa durée de vie : historique, terminal et retour de copie ne doivent pas disparaître lors d'un changement de vue.
- SCSS découpé par responsabilité avec `@use` ; ordre de cascade et sélecteurs conservés. À la demande complémentaire : Tailwind pour les styles simples de 31 règles (vues/cartes/dialogue), sans duplication de leurs déclarations de base en SCSS. Version classique isolée, inchangée.
- Pas de repository, conteneur d'injection, classe de cas d'usage ou contexte global supplémentaire : aucun besoin métier ne les justifie.

### Acceptation / suivi

- [x] Entrée courte ; aucune nouvelle concentration des responsabilités dans un contrôleur géant.
- [x] Comportements et markup conservés : univers, FR/EN, thème, mouvement, 3D, six vues, huit projets, terminal, contact, fenêtre, recherche et dialogues.
- [x] Retour/Suivant, rechargement, focus et plein écran testés dans le navigateur.
- [x] Cascade CSS vérifiée ; rendu bureau/mobile et version classique vérifiés.
- [x] Tests, lint, TypeScript, build/export et contrôle du diff réussis.
- [x] Guide de maintenance : où modifier quoi, dépendances et commandes de vérification.

### État initial

Tests de logique existants réussis avant modification. Deux images non suivies (`public/iMac.svg`, `public/imac-frame.png`) appartiennent à l'utilisateur et restent intactes.

### Construction → revue → corrections

- Entrée React : 2 024 → 120 lignes. Plus gros module TSX extrait : fenêtre, 272 lignes. Logique pure déplacée sans wrapper de compatibilité ; imports de route/tests actualisés.
- État du terminal et retour de copie conservés dans `PortfolioViews`, hors sous-arbre remonté à chaque page. Test de régression navigateur ajouté pour historique et brouillon du terminal.
- Choix d'univers/historique initialisés ensemble ; références des dialogues conservées et fiche nommée explicitement `projectDialog`. Synchronisation, nettoyage des listeners et restauration du focus relus.
- Sass compile les styles du Web OS ; Tailwind reste compilé depuis le CSS global. Variables CSS dynamiques conservées, aucune abstraction SCSS artificielle.
- Migration Tailwind : comparaison a détecté une différence réelle de largeur intrinsèque des statistiques à 320 px (`repeat(3, 1fr)` versus `minmax(0, 1fr)`). Valeur originale conservée explicitement. Alignement `start` et rayon `50%` conservés aussi.
- Organisation App Router expliquée dans README avec référence officielle : routes dans `app`, fonctionnalité dans `features/web-os`, colocation également possible mais non obligatoire.

### Preuves finales

- `npm test` réussi : contrôles existants + contenu extrait, libellés, ordre FR/EN et correspondance technologies/projets. `npx tsc --noEmit` et `npm run build` réussis ; routes `/` et `/portfolio/` exportées.
- `npm run lint` : zéro erreur, uniquement les trois avertissements `<img>` préexistants dans la version classique. `git diff --check` réussi.
- Avant migration Tailwind, concaténation CSS identique à l'original et sortie Sass normalisée identique (79 204 octets). Après migration : 24 états comparés avant/après dans le navigateur (six vues × deux univers × 320/1440 px), **aucune différence sur les 30 propriétés calculées contrôlées**, y compris géométrie, couleurs et typographie.
- Comparaison de rendu serveur original/refactor : 24 combinaisons vue/langue/univers, HTML identique hors classes utilitaires ajoutées. DOM initial hydraté identique avant migration Tailwind, hors horloges et marqueurs React.
- **96 contrôles responsive sur l'export final** : six vues × deux univers × (FR clair / EN sombre) × 320/390/768/1440 px. Taille réelle et configuration contrôlées à chaque état ; aucun débordement horizontal du document ou du contenu.
- Navigateur intégré : huit projets dans chaque univers, Retour/Suivant, fermeture/rechargement d'une fiche, réglages imbriqués, Échap, recherche accentuée, changement d'univers sans perte de vue, terminal conservé après navigation, fermeture/réduction/agrandissement et réouverture de fenêtre. Sortie native depuis la racine vers `about:blank` vérifiée, sans piège d'historique.
- Entrée plein écran sur interaction et sortie par bouton testées dans les deux univers ; thème, langue, animations désactivées et 18 faces de la sculpture vérifiés. Route classique chargée sur l'export ; console de l'export final sans erreur/avertissement.

### Limites / livraison

- La commande CDP `npm run test:browser` n'a pas pu être exécutée : endpoint Chrome 9333 absent, endpoint 9222 non exploitable. Scénarios vérifiés via le navigateur intégré ; script existant enrichi et syntaxe contrôlée, sans annoncer un passage CDP inexistant. Refus d'API/stockage, Safari et appareils physiques non re-testés dans cette boucle.
- Audit npm : 10 vulnérabilités dans les dépendances existantes, dont une classification critique pour Next.js ; Sass absent des paquets signalés. Versions préexistantes inchangées. Mise à jour de sécurité à traiter séparément ; pas de `npm audit fix --force` pendant le refactor.
- Livraison initiale locale : aucun commit, push ni déploiement pendant le refactor. Guide de maintenance dans `README.md`, contrôles conservés dans `tests/`.
- Demande complémentaire « deploy » : publication autorisée via le workflow GitHub Pages existant sur `main` ; les deux images utilisateur non suivies restent exclues du commit.

---

## Extension — plein écran PC et bouton Éteindre

Demande : reprendre le plein écran automatique du téléphone sur PC, avec un bouton pour en sortir.

- API existante réutilisée, première interaction réelle avec la navigation uniquement. Pas de nouvelle dépendance et pas de réactivation après sortie volontaire.
- Bouton visible dans la barre macOS et le shelf ChromeOS : **Éteindre** appelle seulement `exitFullscreen()`, sans fermer l’onglet, modifier l’historique ou quitter la vue. Hors plein écran, bouton **Plein écran** pour le réactiver. Libellés FR/EN et variante compacte aux petites largeurs desktop.
- API absente/mode d’application installé : bouton désactivé avec explication. Le plein écran F11 reste contrôlé par le navigateur, pas par cette API. Consignes desktop distinctes du repli d’installation mobile.
- Test navigateur modifié avant correction : échec sur l’entrée automatique desktop. Après correction : passage dans les deux univers, premier clic réel, bouton Éteindre, conservation vue/URL/historique, réactivation manuelle et absence de retour automatique.
- Inspection des deux bureaux en 768, 1024 et 1440 px : bouton à l’écran, directement cliquable, aucun débordement. Clic réel Éteindre validé dans macOS ; captures des deux variantes inspectées. Aucun arrêt système, `window.close()` ou redirection.
- Validation finale : scénario navigateur complet sur export statique réussi (mobile conservé, deux bureaux, premier choix desktop, API absente et bouton absent sur téléphone) ; tests unitaires, TypeScript et build réussis ; lint sans erreur, trois avertissements `<img>` préexistants. Choix desktop : audit Lighthouse snapshot accessibilité/bonnes pratiques/SEO 100, aucun audit échoué.

Livraison initiale locale ; après présentation de l’aperçu, l’utilisateur a demandé le déploiement de cette extension sur GitHub Pages.

---

## Boucle — Retour natif du téléphone et plein écran par défaut

Demande du 19 septembre 2026 : le bouton/geste Retour natif quittait le portfolio au lieu de restaurer la vue précédente ; demande complémentaire de plein écran mobile par défaut.

### Cadrage / reproduction

- Parcours minimal : onglet vide → portfolio mobile → Android → Projets → Retour natif. L’historique restait à deux entrées ; Retour ouvrait `about:blank` plutôt que l’accueil du portfolio.
- Test écrit avant correction : `node tests/browser-navigation.test.mjs`, échec `Native Back must not leave the portfolio from Projects`, origine réelle `null` au lieu de l’origine du portfolio. Même symptôme reproduit via le bouton Retour de Chrome piloté par DevTools.
- Hypothèses classées : transitions non inscrites dans l’historique ; état non restauré lors de `popstate` ; dialogues suivis seulement dans le DOM. Inspection : trois mécanismes absents, navigation uniquement via état React/`showModal()`.

### Architecture / correction minimale

- API History native, sans routeur ou dépendance supplémentaire. État validé et borné (`portfolioView`) : vue, accueil/app, dialogue, index du projet, profondeur. Champs Next conservés, entrée initiale remplacée, transitions réelles ajoutées ; restauration sur Retour/Suivant/rechargement.
- Un seul état pilote désormais vues et quatre dialogues. Fermer une fiche, une recherche ou les réglages consomme son entrée ; Échap/fermeture native suit la même logique. Revenir d’une fiche issue de la recherche restaure la recherche. Cliquer à nouveau l’onglet courant n’ajoute pas d’entrée.
- Aucun faux historique ajouté au lancement et aucun blocage de sortie depuis l’accueil. Confinement du défilement limité à l’axe vertical pour ne pas interdire les gestes de navigation horizontaux.
- Plein écran : tentative au premier toucher réel d’un contrôle mobile, gestion des refus/API absente et bouton dans les réglages. Sortie volontaire respectée, pas de boucle de réactivation. Le navigateur exige une activation utilisateur : impossible de forcer un onglet classique au chargement.
- Manifeste `display: fullscreen`, métadonnées web-app et icônes PNG dérivées de l’icône existante via `sharp` déjà installé. Lancement depuis l’écran d’accueil sans barre navigateur ; pas de service worker, promesse hors ligne ou masquage garanti des barres système.

### Références de plateforme

- [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API) : `replaceState`, `pushState`, `popstate`.
- [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen) : activation utilisateur obligatoire et refus possibles.
- [WebKit — applications écran d’accueil](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/) : manifeste `standalone`/`fullscreen` pour ouverture en web-app.
- [Overscroll behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overscroll-behavior) : confinement horizontal susceptible d’empêcher le geste Retour.

### Validation

- [x] Reproduction rouge conservée dans un test navigateur exécutable sans nouvelle dépendance.
- [x] Retour/Suivant, fiches, fermeture, rechargement, onglets, réglages imbriqués, recherche et sortie depuis la racine vérifiés dans les deux univers mobiles.
- [x] Plein écran déclenché par toucher réel dans Chrome, sortie puis absence de réactivation forcée, entrée/sortie depuis réglages vérifiées.
- [x] API refusée ou absente : consigne d’ajout à l’écran d’accueil, navigation conservée.
- [x] Export statique : scénario complet `PORTFOLIO_URL=http://127.0.0.1:4173/ npm run test:browser` réussi, y compris entrée/sortie plein écran via de vrais événements tactiles et contrôle desktop sans activation automatique.
- [x] Douze états responsive : accueil/réglages des deux univers en 320×568, 390×844 et 844×390. Aucun débordement horizontal, bas des contenus accessible, axe horizontal `overscroll-behavior-x: auto`. Captures 320 px du repli et des réglages inspectées.
- [x] `npm test`, lint (zéro erreur, trois avertissements `<img>` préexistants), TypeScript et `npm run build` réussis. Manifeste/icônes HTTP 200 ; Lighthouse snapshot de l’accueil iPhone avec aide d’installation : accessibilité/bonnes pratiques/SEO 100, aucun audit échoué. Console export sans erreur/alerte.

Le test navigateur pilote directement les entrées de l’historique via CDP et attend un nouveau document après rechargement : pas d’évaluation JavaScript détruite par un retour inter-document, ni de faux positif sur l’ancien DOM. Aucun log de diagnostic ajouté au produit.

Validation Chrome/émulation et API réelles ; pas de téléphone physique ni de Safari iOS disponible. Le système peut consommer un premier Retour pour sortir du plein écran. Les images utilisateur non suivies restent intactes. Livraison initiale locale seulement, conformément à la demande. Après validation de cet aperçu, l’utilisateur a demandé séparément le déploiement sur GitHub Pages.

---

## Boucle — choisir son univers : iPhone ou Android

Demande du 19 septembre 2026 : choix explicite iPhone/Android, avec macOS/iOS existants côté iPhone et ChromeOS/Pixel côté Android.

### Cadrage et architecture

- Première visite : dialogue de choix illustré, accessible au clavier, fermeture possible sans mémoriser de choix.
- Préférence locale validée (`apple` / `google`), mémorisée seulement après action. Aucun profilage ni détection automatique de l’appareil ; stockage indisponible sans blocage.
- Choix modifiable depuis menu/barre macOS, réglages mobiles ou réglages ChromeOS.
- iPhone : design macOS/iOS conservé. Android : shelf/lanceur ChromeOS, contrôles de fenêtre à droite, surfaces tonales et Pixel mobile (en-tête date, widgets sculptés, icônes circulaires, recherche inférieure).
- Une seule source pour contenus, projets, coordonnées, 3D et interactions. React/CSS/dialog/localStorage natifs ; aucune dépendance ajoutée.
- Références primaires : [shelf ChromeOS](https://support.google.com/chromebook/answer/3113576?hl=en), [accueil Pixel](https://support.google.com/pixelphone/answer/2781850?hl=en). Inspirations web, pas des systèmes natifs ni une affiliation à Apple/Google.
- Boucle BMAD adaptée : cadrer → construire → revue des exigences et tests → corriger → revalider. Framework non installé.

### Acceptation

- [x] Choix présenté au premier accès, enregistré, restauré après rechargement et modifiable dans les quatre interfaces.
- [x] iPhone restitue les designs macOS et iOS existants.
- [x] Android affiche un bureau ChromeOS distinct et un accueil/app Pixel distinct.
- [x] Navigation, huit projets, terminal, CV/contact et 3D disponibles dans les deux univers.
- [x] FR/EN, thèmes clair/sombre, clavier/focus et mouvement réduit préservés.
- [x] Stockage bloqué/corrompu géré ; fermeture du choix sans piège clavier.
- [x] Responsive portrait/paysage/mobile ↔ ordinateur, sans débordement ni contenu inaccessible.
- [x] Tests, lint, build/export et inspection navigateur vérifiés, corrections documentées.

### Revue / corrections

- Dialogue de choix illustré FR/EN, mémorisation après clic uniquement et changement sans perdre page, langue ou thème courants.
- Contrastes corrigés sur widgets/icônes Pixel, noms accessibles alignés avec libellés visibles, taille tactile conservée.
- Contrôles Android différenciés : flèche retour, menu vertical, onglets Material. Lanceur/recherche et réglages ChromeOS ancrés au shelf.
- Trois contrastes insuffisants préexistants corrigés aussi sur le bureau Apple (numéros de projets, intitulés de postes, liens Contact), sans modifier sa composition.
- Revue de rechargement : masquage de la coque jusqu’à lecture de préférence, pour éviter un flash Apple avant Android. Repli CSS `noscript` pour conserver le contenu statique si JavaScript est désactivé.

### Preuves

- `npm test` : contrôles existants conservés ; parseur de préférence accepte uniquement `apple`/`google`, rejette neuf types/valeurs invalides.
- `npm run lint` : zéro erreur ; trois avertissements `<img>` préexistants sur la version classique.
- `npm run build` : compilation, TypeScript et export réussis. Un premier essai a échoué sur une connexion Google Fonts ; disponibilité HTTP 200 puis builds suivants réussis, sans changer de dépendance.
- **184 états responsive** : deux univers × deux langues ; accueil + six apps en 320×568 / 390×844 / 430×932 / 844×390 tactile, six vues en 768×1024 / 1024×768 / 1440×1000. Aucun débordement ; défilement au bas des contenus et retour du focus mobiles contrôlés.
- Choix initial, fermeture Échap, choix depuis réglages, sauvegarde puis rechargement Apple/Google testés. Valeur corrompue : dialogue proposé à nouveau. Lecture/écriture du stockage refusées : univers appliqué pour la visite avec message explicite, aucune erreur console.
- Seize ouvertures de fiches sur export : huit projets dans chacun des deux univers. Lanceur ChromeOS recherché par « voakajy », fiche ouverte puis fermée au clavier.
- Fenêtre ChromeOS : agrandir/restaurer/réduire/fermer/rouvrir testés ; glisser réel de 140 px, borné au bureau. Sculpture CSS conservée : 18 faces, `preserve-3d`. Mouvement réduit émulé : animations `none`, transitions `0s`, y compris sur le choix d’univers.
- Inspections visuelles : choix 320 px et bureau, macOS/iOS conservés, ChromeOS, Pixel clair/sombre, app Android et réglages.
- Lighthouse snapshots : six vues Pixel en clair/sombre, accueil Pixel, choix et réglages, bureaux ChromeOS/macOS après corrections : accessibilité, bonnes pratiques et SEO **100**. Navigation sur export : mêmes scores. Mesures ponctuelles, pas une certification ; pas de score global de performance annoncé.
- Rechargement final Android, bureau/mobile : aucun audit Lighthouse échoué après correction du clignotement. JavaScript désactivé : contenu statique et lien CV visibles, repli vérifié.
- Export servi sur `http://127.0.0.1:4173` : CV, avatar et route classique HTTP 200 ; aucune erreur/alerte console.

### Livraison / limites

Boucle terminée localement. Aucun commit, push ni déploiement pour cette demande ; production précédente inchangée. Validation Chrome avec émulation mobile, pas de test matériel Android/iPhone/Safari. Les deux images utilisateur non suivies restent intactes.

---

## Nouvelle boucle — expérience iPhone sur mobile

Demande du 19 septembre 2026 : « sur mobile met comme un ios de iphone utilise un bouucle bmad ».
La livraison macOS ci-dessous reste la base ; cette boucle remplace sa coque mobile, sans changer le bureau ordinateur.

### Cadrage / architecture

- Mobile : écran d’accueil iOS, widgets de profil/parcours, grille d’apps, dock translucide, barre d’état stylisée et indicateur d’accueil.
- App ouverte : contenu existant en plein écran, retour accueil et onglets tactiles. Pas de feux tricolores ni de fenêtre Finder sur téléphone.
- Recherche locale et réglages FR/EN, thème et animations ; aucune commande/icône sans action.
- Réutiliser données, composants, dialog HTML natif et CSS. Aucune dépendance supplémentaire.
- Limite mobile : moins de 768 px, ainsi que les écrans tactiles en paysage jusqu’à 1024 × 500 px. Zones sûres `env(safe-area-inset-*)`, hauteur dynamique, contenu défilable sur petits écrans et en paysage.
- Référence : [Apple, Layout](https://developer.apple.com/design/human-interface-guidelines/layout). Il s’agit d’une interface web inspirée d’iOS, pas d’un système ou d’une application native Apple. Indicateurs réseau/batterie uniquement décoratifs.

### Critères d’acceptation iOS

- [x] Accueil mobile immédiatement identifiable comme iPhone/iOS, validé visuellement.
- [x] Apps, widgets, recherche, réglages, dock et retour accueil fonctionnels.
- [x] Toutes les vues, huit projets, CV, coordonnées, terminal et 3D existants conservés.
- [x] FR/EN, clair/sombre, clavier et mouvement réduit ; cibles tactiles de 44 px pour commandes principales.
- [x] Aucun contenu bloqué ni débordement horizontal à 320/390/430 px, en paysage et en passant mobile ↔ bureau.
- [x] Bureau macOS inchangé visuellement et fonctionnellement.
- [x] Tests, lint, build/export statique et inspection navigateur réussis ; bilan de corrections documenté.

### Construction → revue → corrections

- Coque mobile indépendante du bureau : accueil à widgets, huit raccourcis, dock translucide, apps plein écran et quatre onglets.
- Recherche Spotlight locale sur six apps et huit projets, normalisation Unicode testée ; ouverture directe des fiches projet et état sans résultat.
- Dialogues HTML natifs pour recherche/réglages, focus restauré, fermeture clavier, réglages réutilisant langue/thème/animations existants.
- Revue tactile : recherche, retour accueil, liens Contact et bouton de pied de page agrandis à 44 px minimum.
- Revue responsive : glisser/agrandir la fenêtre désactivés en paysage tactile ; fermer/réduire sur ordinateur remet l’accueil mobile dans un état récupérable.
- Revue des six vues : contrastes mobiles corrigés pour liens Contact, numéros de projets et intitulés du parcours.

### Vérifications

- `npm test` : terminal, parité FR/EN et recherche (accents, casse, Unicode composé/décomposé, chaîne vide et caractères littéraux).
- `npm run lint` : zéro erreur, trois avertissements `<img>` préexistants sur le portfolio classique.
- `npm run build` : compilation, TypeScript et export statique réussis ; aucune dépendance ajoutée.
- **56 états responsive** : accueil + six apps × FR/EN × 320 × 568, 390 × 844, 430 × 932 et 844 × 390. Aucun débordement horizontal, retour du focus correct, défilement des apps jusqu’au bas vérifié.
- Widgets, dock, quatre onglets, huit fiches projet, terminal au clavier, recherche par « FUNERARIUM » / « a propos », absence de résultat, réglages et retour accueil inspectés dans Chrome.
- Réduction de mouvement émulée : animations de fenêtre/contenu désactivées. Règle commune de désactivation conservée pour la sculpture 3D.
- Export local réel : CV, avatar, image sociale, version classique, robots et sitemap HTTP 200 ; aucune erreur/alerte console.
- Lighthouse **navigation sur export**, mobile et bureau : accessibilité **100**, bonnes pratiques **100**, SEO **100**. Audits **snapshot** complémentaires sur chacune des six vues mobiles en clair/sombre et sur les réglages : mêmes scores après corrections. Performance non mesurée ; audits ponctuels, pas une certification.
- Inspection visuelle du bureau macOS, accueil iPhone et app plein écran, portrait et paysage. Passage ordinateur réduit/fermé → mobile testé.

### Livraison / limites

Boucle terminée localement. Aucun commit, push ni déploiement. Validation par émulation Chrome ; pas de test matériel iPhone/Safari, du clavier virtuel iOS ni des encoches réelles. Les zones sûres et `viewport-fit=cover` sont prévues dans le code. Identité, CV et coordonnées existants conservés ; indicateurs réseau/batterie décoratifs, sans lecture matérielle.

---

## Intention / cadrage — 19 septembre 2026

Demande : actualiser le portfolio avec une expérience macOS et de la 3D.
Clarification utilisateur : **style macOS seulement**, aucun MacBook physique.
Méthode adaptée du [Quick Flow BMAD](https://github.com/bmad-code-org/BMAD-METHOD/blob/main/docs/reference/workflow-map.md) : cadrer → construire → vérifier → corriger. Le framework BMAD n'est pas installé ; aucune installation nécessaire pour cette boucle locale.

## Audit / décisions

- Next.js 16, React 19, TypeScript, export statique ; aucune dépendance ajoutée.
- Contenu, liens sociaux, CV et traductions existants réutilisés ; aucune expérience inventée.
- Ancien portfolio conservé sur `/portfolio/`.
- Nouvelle entrée native React plutôt qu'iframe : contenu indexable, navigation clavier et mobile simples.
- Direction : bureau bleu océan, fenêtre ivoire translucide, sidebar Finder, typographie système, dock sculpté.
- 3D réelle en CSS `preserve-3d`, pilotage au pointeur optionnel ; pas de WebGL ni de modèle externe.
- Fichiers utilisateur `public/iMac.svg` et `public/imac-frame.png` laissés intacts.

## Acceptation

- [x] Accueil, projets, parcours, à propos et contact accessibles FR/EN.
- [x] Dock et contrôles de fenêtre opérationnels, récupération après fermeture/réduction.
- [x] Projets détaillés sans faux liens, CV et coordonnées conservés.
- [x] Terminal à commandes bornées, aucune exécution de code arbitraire.
- [x] 3D interactive et animations désactivables ; préférence de mouvement réduit respectée.
- [x] Clavier, focus visible, 320 px à grand écran, aucun débordement horizontal.
- [x] Tests exécutables, lint, TypeScript et export statique validés.
- [x] Inspection visuelle bureau/mobile puis correction des défauts.

## Résultat / revue

### Itération 1 — construire

Accueil et cinq vues internes, huit fiches projet, thèmes clair/sombre, dock et contrôles de fenêtre. Sculpture composée de trois volumes CSS, six faces chacun. Visuels conceptuels des projets à la place des anciennes photos génériques de chats ; originaux laissés intacts.

### Itération 2 — revoir et corriger

- Fonction de rendu des cartes stable : suppression du composant recréé à chaque rendu.
- Suppression des anciennes règles CSS de coque devenues inutiles.
- Correction des accents français, sans modification des dates ni des expériences.
- Noms accessibles alignés sur les libellés visibles ; cible de 24 px pour les contrôles de fenêtre.
- Contrastes corrigés en clair et sombre, focus restauré après fermeture/menu/modal.
- Correction du débordement de l’accueil à 320 px et du rendu tablette.
- Préférence système de mouvement réduit vérifiée : animation calculée `none`.
- Retour de copie d’adresse traduit dynamiquement ; échec du presse-papiers annoncé sans perdre l’adresse.
- Portrait de bureau optimisé : original 1 042 593 octets préservé, avatar WebP 1 608 octets, via Sharp déjà installé.
- Image Open Graph manquante créée : PNG natif 1200 × 630, 77 491 octets.

### Preuves de validation

- `npm test` : commandes du terminal, entrées inconnues, parité du contenu FR/EN, identité et huit projets vérifiés. Node 22 peut afficher un avertissement bénin de détection ESM pour les imports `.ts`.
- `npm run lint` : **0 erreur**, trois avertissements `<img>` préexistants dans `About.tsx` et `Work.tsx` de la version classique, laissée intacte.
- `npm run build` : compilation, TypeScript et export statique réussis, routes `/` et `/portfolio/` conservées.
- Chrome : **60 contrôles de débordement** réussis, six vues × deux langues × largeurs 320/390/768/1024/1440 px.
- Contrôles d’interface : réduire, fermer, rouvrir, agrandir/restaurer, changer langue/thème, ouvrir les huit projets, vérifier le parcours, désactiver les animations.
- Glisser-déposer natif vérifié : déplacement de 140 px horizontalement, fenêtre restant dans les limites du bureau.
- Inclinaison 3D au pointeur vérifiée, modal fermé par Échap avec retour du focus, terminal utilisé au clavier.
- Copie d’adresse : succès et refus simulés sans toucher au presse-papiers du système ; messages et traduction vérifiés.
- Export servi réellement sur `http://127.0.0.1:4173` : page, version classique, CV, avatar, aperçu social, robots et sitemap retournent HTTP 200. Aucune erreur ni avertissement dans la console de cette page de production.
- Lighthouse **navigation sur export statique, bureau** : accessibilité **100**, bonnes pratiques **100**, SEO **100**, zéro audit échoué. Audits **snapshot** complémentaires clair, sombre et mobile : mêmes scores. Ces mesures ponctuelles ne constituent pas une certification d’accessibilité ; performance non mesurée par cet outil.
- `git diff --check` : aucun défaut d’espacement.

### Livraison

Boucle terminée. Aperçu local, aucun déploiement, commit ni push. Les coordonnées et dates du CV n’ont pas été actualisées faute de nouvelles informations ; le contenu professionnel existant est conservé. Aucun service externe ni commande système exécuté par le terminal du site.
