// Tout le contenu du site est ici : modifie ce fichier pour mettre à jour le portfolio.

export const profile = {
  firstName: "Warren",
  lastName: "Musau",
  initials: "WM",
  city: "Kinshasa",
  email: "warrenmusau5@gmail.com",
  phone: "+243 842 038 593",
  cv: "cv-warren-musau.pdf",
  photo: "images/warren.jpeg",
  description:
    "Je conçois des architectures backend fiables, des automatisations utiles et des systèmes pensés pour la sécurité dès la première ligne.",
  roles: ["Backend", "Systèmes", "Sécurité", "Automatisation"],
};

export const socials = [
  { label: "GitHub", href: "https://github.com/Marus253" },
  { label: "LinkedIn", href: "https://linkedin.com/in/emmanuel-musau-08b986309" },
  { label: "Email", href: `mailto:${profile.email}` },
];

export type Visual = "sigir" | "pharma" | "vision" | "hospital";

export type Project = {
  title: string;
  kind: string;
  status: string;
  summary: string;
  problem: string;
  stack: string[];
  visual: Visual;
  span: string;
  aspect: string;
  href?: string;
};

export const projects: Project[] = [
  {
    title: "SIGIR",
    kind: "Plateforme gouvernementale",
    status: "MVP · Django",
    summary:
      "Système intégré de gestion des infractions routières en RDC : saisie avec photo, identification par plaque, paiement mobile money et reçu QR.",
    problem:
      "Remplacer un processus manuel, lent et propice à la fraude, dans un écosystème où les données de l'État ne sont pas centralisées.",
    stack: ["Django", "DRF", "MySQL", "JWT", "Celery", "Redis"],
    visual: "sigir",
    span: "md:col-span-7",
    aspect: "aspect-[4/3] md:aspect-[16/11]",
  },
  {
    title: "Vision-V",
    kind: "Recherche IA",
    status: "Expérimentation",
    summary:
      "Reconnaissance automatique de plaques d'immatriculation par vision par ordinateur.",
    problem:
      "Détecter, redresser et lire une plaque dans des photos prises sur le terrain, sans matériel spécialisé.",
    stack: ["Python", "OpenCV", "OCR"],
    visual: "vision",
    span: "md:col-span-5",
    aspect: "aspect-[4/3] md:aspect-auto md:h-full",
  },
  {
    title: "PharmaStock",
    kind: "Gestion de stock",
    status: "Finalisé",
    summary:
      "Gestion de stock pharmaceutique avec surveillance des dates de péremption et alertes.",
    problem:
      "Optimiser les requêtes SQL pour suivre des inventaires périssables sans ralentir la saisie.",
    stack: ["PHP", "MySQL"],
    visual: "pharma",
    span: "md:col-span-5",
    aspect: "aspect-[4/3] md:aspect-auto md:h-full",
  },
  {
    title: "Gestion hospitalière",
    kind: "Application desktop",
    status: "En cours",
    summary:
      "Application de gestion hospitalière pour Windows : patients, consultations et postes de travail métiers.",
    problem:
      "Garder un contrat d'API strict entre le client Flutter et le backend FastAPI, et prévoir le mode hors-ligne.",
    stack: ["Flutter", "FastAPI", "Riverpod"],
    visual: "hospital",
    span: "md:col-span-7",
    aspect: "aspect-[4/3] md:aspect-[16/11]",
  },
];

export const journey = [
  {
    title: "Master 1 — Réseaux, Sécurité & Systèmes d'information",
    place: "Université Protestante au Congo",
    tag: "Formation",
    meta: "En cours",
    glyph: "M1",
  },
  {
    title: "Revue systématique : Transformers et LLM pour détecter les menaces dans les logs",
    place: "Recherche académique",
    tag: "Recherche",
    meta: "SLR",
    glyph: "AI",
  },
  {
    title: "Conseil digital, audit de crédibilité et refonte de site",
    place: "MENJI GROUP",
    tag: "Consulting",
    meta: "Web & UX",
    glyph: "MG",
  },
  {
    title: "Formation des jeunes aux compétences numériques",
    place: "BestMe Academy",
    tag: "Éducation",
    meta: "Digital",
    glyph: "BA",
  },
];

export const explorations = [
  { title: "OCR & parsing", note: "Extraction de texte depuis des documents photographiés, redressement de perspective.", code: "cv2.warpPerspective()" },
  { title: "API REST", note: "Contrats d'API versionnés, authentification JWT, permissions par rôle.", code: "GET /api/v1/infractions" },
  { title: "Linux & serveurs", note: "Administration, services systemd, durcissement de base.", code: "$ systemctl status" },
  { title: "Tâches asynchrones", note: "Relances automatiques et files de tâches avec Celery et Redis.", code: "@shared_task" },
  { title: "OWASP", note: "Validation des entrées, gestion des sessions, principe du moindre privilège.", code: "A01:2021" },
  { title: "Docker", note: "Environnements reproductibles pour le développement et les tests.", code: "docker compose up" },
];

export const stats = [
  { value: 4, suffix: "", label: "Systèmes conçus" },
  { value: 6, suffix: "+", label: "Technologies backend" },
  { value: 1, suffix: "", label: "Master en sécurité en cours", prefix: "M" },
];
