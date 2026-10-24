# Portfolio — Warren Musau

Portfolio personnel : développeur backend & systèmes basé à Kinshasa.

**Stack :** React 18 · Vite · TypeScript · Tailwind CSS · GSAP (ScrollTrigger) · Framer Motion · hls.js

## Lancer en local

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # génère dist/
npm run preview
```

## Modifier le contenu

Tout le texte (projets, parcours, statistiques, liens, email) est dans **`src/data.ts`**.
Le CV est `public/cv-warren-musau.pdf`, la photo `public/images/warren.jpeg`.

## Structure

```
src/
  data.ts              contenu du site
  pages/Index.tsx      page d'accueil (chargement + sections)
  pages/Resume.tsx     page /cv avec aperçu PDF
  sections/            Hero, Works, Journey, Explorations, Stats, Contact
  components/          Navbar, LoadingScreen, HlsVideo, Modal, GradientButton…
```

## Déploiement (GitHub Pages)

Le workflow `.github/workflows/deploy.yml` construit et publie le site à chaque push sur `main`.
Activer une fois : **Settings → Pages → Source : GitHub Actions**.
