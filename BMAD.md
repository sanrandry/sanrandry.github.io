# Portfolio — boucle BMAD légère

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
