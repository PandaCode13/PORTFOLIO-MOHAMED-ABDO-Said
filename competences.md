# CSS — Section Compétences (style onglets + cartes de technologies)

CSS adapté à la nouvelle section compétences, inspiré du design de youssoufabayazid.fr.
Le style utilise **des onglets par famille** et **des cartes de technologies** avec leur type
(Framework, Langage, Markup, Styling, Base de données, Outil…).
Aucune barre de progression ni pourcentage.
Accessibilité : navigation clavier (flèches + roving tabindex), panels focusables,
contraste WCAG vérifié.

---

## 1. Structure HTML attendue (avec accessibilité)

Pattern ARIA tabs standard :
- Conteneur : `role="tablist"`.
- Onglets : `role="tab"`, l'onglet actif a `aria-selected="true"` et `tabindex="0"`,
  les inactifs `aria-selected="false"` et `tabindex="-1"` (roving tabindex).
- `aria-controls` pointe vers l'`id` du panel ; le panel a `aria-labelledby` vers l'`id` de l'onglet.
- Panels : `role="tabpanel"`, l'actif a `tabindex="0"` pour être focusable.
- Le premier onglet ET le premier panel sont marqués `is-active` en dur dans le HTML
  (fallback si JS désactivé).

```html
<div class="skill-tabs" role="tablist" aria-label="Familles de compétences">
  <button class="skill-tab is-active" id="tab-frontend" role="tab"
          aria-selected="true" aria-controls="panel-frontend" tabindex="0"
          data-tab="frontend">Frontend <span class="skill-count">6</span></button>
  <button class="skill-tab" id="tab-backend" role="tab"
          aria-selected="false" aria-controls="panel-backend" tabindex="-1"
          data-tab="backend">Backend &amp; Données <span class="skill-count">9</span></button>
  <button class="skill-tab" id="tab-languages" role="tab"
          aria-selected="false" aria-controls="panel-languages" tabindex="-1"
          data-tab="languages">Langages <span class="skill-count">5</span></button>
  <button class="skill-tab" id="tab-design" role="tab"
          aria-selected="false" aria-controls="panel-design" tabindex="-1"
          data-tab="design">UI/UX &amp; Design <span class="skill-count">4</span></button>
  <button class="skill-tab" id="tab-tools" role="tab"
          aria-selected="false" aria-controls="panel-tools" tabindex="-1"
          data-tab="tools">Outils &amp; Déploiement <span class="skill-count">7</span></button>
</div>

<div class="skill-tab-panel is-active" data-panel="frontend"
     id="panel-frontend" role="tabpanel" aria-labelledby="tab-frontend" tabindex="0">
  <article class="tech-card">
    <h3>React.js</h3>
    <span class="tech-type">Framework</span>
  </article>
  <!-- ... autres cartes du panneau ... -->
</div>

<div class="skill-tab-panel" data-panel="backend"
     id="panel-backend" role="tabpanel" aria-labelledby="tab-backend" tabindex="0">
  <!-- ... cartes ... -->
</div>
```

---

## 1bis. Catégories fusionnées / renommées

Le design par onglets oblige chaque onglet à se justifier seul. Tri recommandé :

- **Frontend (6)** : HTML5/CSS3 · JavaScript · React.js · Next.js · TypeScript · Vite
- **Backend & Données (9)** : PHP · Node.js · API REST · Architecture client/serveur ·
  Échanges API HTTP · MySQL · MongoDB · SQL · Gestion de catalogue
  *(les bases de données sont fusionnées dans le Backend)*
- **Langages (5)** : C · Java · YAML · JSON · Python
- **UI/UX & Design (4)** : Figma · Maquettes · Wireframes · Interfaces utilisateur
- **Outils & Déploiement (7)** : Docker · TailwindCSS · Render · WampServer ·
  Visual Studio Code · Eclipse · Anaconda

> **Méthode & infrastructure retirée** : inventaire réseau, sauvegarde de données,
> sécurisation de fichiers rejoignent la description de l'expérience (ex. Teknosure).
> "Analyse des besoins clients" et "Cahier des charges" peuvent être mentionnés dans
> l'expérience ou la section À propos.

---

## 2. Variables réutilisées (déjà présentes dans `said.css`)

Le fichier `said.css` définit les variables en clair (`:root`) puis les redéfinit dans
`body.dark-mode` (ex. `--blue: #6da0ff`, `--blue-soft: #1b2a49`, `--white: #141c31`).
On s'appuie donc sur les variables partout pour gérer le dark mode automatiquement.

```css
:root {
  --muted: #5b6475;
  --line: #dce5f5;
  --white: #ffffff;
  --blue: #2457d6;
  --blue-dark: #12347f;
  --blue-soft: #eaf1ff;
  --red: #d72638;
  --red-dark: #981b2a;
  --radius: 8px;
}
```

---

## 3. Barre d'onglets

```css
.skill-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 26px;
}

.skill-tab {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--white);
  color: var(--text, var(--blue-dark));
  font: inherit;
  font-weight: 600;
  font-size: 0.92rem;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.skill-tab:hover {
  border-color: var(--blue);
}

.skill-tab.is-active {
  background: linear-gradient(90deg, var(--blue), var(--red));
  border-color: transparent;
  color: var(--white);
  transform: translateY(-2px);
}

/* Focus visible clavier : anneau net sur tous les états */
.skill-tab:focus-visible {
  outline: 3px solid var(--blue);
  outline-offset: 2px;
}

.skill-count {
  display: inline-grid;
  place-items: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: 999px;
  background: var(--blue-soft);
  color: var(--blue-dark);
  font-size: 0.75rem;
  font-weight: 700;
}

.skill-tab.is-active .skill-count {
  background: rgba(255, 255, 255, 0.22);
  color: var(--white);
}
```

> `color: var(--text, var(--blue-dark))` : utilise `--blue-dark` la plupart du temps,
> mais bascule proprement dans le dark mode où le texte clair est fourni par `--text`/`--ink`.

---

## 4. Panneaux (contenu de chaque onglet)

```css
.skill-tab-panel {
  display: none;
}

.skill-tab-panel.is-active {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

/* Cible clavier/AT : anneau discret sur le panel focusé */
.skill-tab-panel:focus-visible {
  outline: 2px solid var(--blue);
  outline-offset: 4px;
  border-radius: var(--radius);
}
```

---

## 5. Cartes de technologies

```css
.tech-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  min-height: 110px;
  padding: 20px 22px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--white);
  box-shadow: 0 12px 34px rgba(18, 52, 127, 0.08);
  transition: transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease;
}

.tech-card:hover {
  transform: translateY(-6px);
  border-color: transparent;
  box-shadow: 0 22px 52px rgba(18, 52, 127, 0.18);
}

.tech-card h3 {
  font-size: 1.05rem;
  line-height: 1.28;
  color: var(--blue-dark);
  margin: 0;
}

.tech-card:hover h3 {
  border-bottom: 2px solid var(--blue); /* remplace le changement de couleur pour éviter le doublon bleu */
  display: inline-block;
}

.tech-type {
  align-self: flex-start;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--blue-soft);
  color: var(--blue-dark);          /* texte plus foncé : meilleur contraste en petit texte (0.75rem) */
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  line-height: 1.4;
}
```

> **Pourquoi ce choix pour le `tech-type`** : `var(--blue)` (#2457d6) sur `var(--blue-soft)`
> (#eaf1ff) donne ~5.3:1, dans le seuil AA pour du texte normal ; mais en 0.75rem uppercase,
> seuls certains navigateurs l'exigent plus haut. Passer en `--blue-dark` (#12347f) monte le
> ratio à ~8.5:1, sans risque, et évite une concurrence visuelle avec le `h3`.
> Recommandé : vérifier à l'œil ou avec le [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).

---

## 6. Dark mode

Grâce aux variables redéfinies dans `body.dark-mode`, la plupart des règles ci-dessus
s'appliquent déjà. Il ne reste qu'à ajuster les fonds/bordures explicites et les classes.

```css
body.dark-mode .tech-card {
  border-color: var(--line);
  background: var(--white);
  box-shadow: none;
}

body.dark-mode .tech-card:hover {
  border-color: transparent;
  box-shadow: 0 22px 52px rgba(0, 0, 0, 0.4);
}

body.dark-mode .tech-type {
  background: var(--blue-soft);
  color: var(--blue-dark);
}

body.dark-mode .skill-tab {
  border-color: var(--line);
  background: var(--white);
  color: var(--ink, #f6f8ff);
}

body.dark-mode .skill-count {
  background: var(--blue-soft);
  color: var(--blue-dark);
}

body.dark-mode .skill-tab.is-active,
body.dark-mode .skill-tab.is-active .skill-count {
  color: #081020; /* texte foncé lisible sur le dégradé clair du dark mode */
}
```

> En dark mode, les variables `--blue`/`--red` deviennent claires (#6da0ff / #ff5f73) ;
> le dégradé d'onglet actif doit donc porter un **texte foncé** (`#081020`) et non `--white`
> pour conserver un bon contraste.

---

## 7. Media queries responsive

```css
/* Tablette : 2 colonnes */
@media (max-width: 900px) {
  .skill-tab-panel.is-active {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Mobile : 1 colonne */
@media (max-width: 560px) {
  .skill-tab-panel.is-active {
    grid-template-columns: 1fr;
  }

  /* Onglets scrollables horizontalement sur petit écran */
  .skill-tabs {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 8px;
    scrollbar-width: thin;
  }

  .skill-tab {
    flex: 0 0 auto;
    white-space: nowrap;
  }
}
```

---

## 8. Logique JS (onglets + navigation clavier ARIA)

À ajouter dans le script inline de `index.html` :
- Clic => active onglet + panel.
- Flèches **Gauche / Droite** => déplace le focus et la sélection entre onglets
  (pattern ARIA tabs).
- **Home / End** => premier / dernier onglet (bonus standard).
- Gère le **roving tabindex** (l'onglet actif seul reste `tabindex="0"`).

```js
(function () {
  const tablist = document.querySelector(".skill-tabs");
  if (!tablist) return;

  const tabs = Array.from(tablist.querySelectorAll(".skill-tab"));
  const panels = Array.from(document.querySelectorAll(".skill-tab-panel"));

  function selectTab(next, focus = true) {
    tabs.forEach((t) => {
      const on = t === next;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
      t.setAttribute("tabindex", on ? "0" : "-1");
      if (on && focus) t.focus();
    });
    panels.forEach((p) => {
      p.classList.toggle("is-active", p.dataset.panel === next.dataset.tab);
    });
  }

  function adjacent(dir) {
    const current = document.activeElement;
    const idx = tabs.indexOf(current);
    if (idx === -1) return;
    const next = tabs[(idx + dir + tabs.length) % tabs.length];
    selectTab(next);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => selectTab(tab));

    tab.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        adjacent(e.key === "ArrowRight" ? 1 : -1);
      } else if (e.key === "Home") {
        e.preventDefault();
        selectTab(tabs[0]);
      } else if (e.key === "End") {
        e.preventDefault();
        selectTab(tabs[tabs.length - 1]);
      }
    });
  });
})();
```
