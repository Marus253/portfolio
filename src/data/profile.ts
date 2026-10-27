// Profil, parcours et compétences. Règle : n'écrire ici que des faits vérifiables
// (alignés sur le CV PDF). Modifie ce fichier pour mettre à jour le site.

export const profile = {
  firstName: "Warren",
  lastName: "Musau",
  fullName: "Warren Emmanuel Musau",
  initials: "WM",
  title: "Développeur logiciel backend",
  city: "Kinshasa, RDC",
  email: "warrenmusau5@gmail.com",
  phone: "+243 842 038 593",
  whatsapp: "243842038593",
  cv: "cv-warren-musau.pdf",
  cvUpdated: "octobre 2026",
  photo: "images/warren.jpeg",
  headline: "Je conçois des logiciels qui répondent à de vrais besoins métier.",
  pitch:
    "Je développe des applications backend et des solutions logicielles en portant une attention particulière à la fiabilité, aux données, aux tests et à la sécurité.",
  availability: "Disponible pour des prestations et des opportunités backend, sur place à Kinshasa ou à distance.",
  hours: "Lundi – vendredi, 9 h – 18 h (heure de Kinshasa, UTC+1)",
  responseTime: "Réponse sous 48 h ouvrées",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/Marus253" },
  { label: "LinkedIn", href: "https://linkedin.com/in/emmanuel-musau-08b986309" },
  { label: "Email", href: `mailto:${profile.email}` },
];

export const intro = [
  "Développeur logiciel orienté backend, je travaille principalement avec Python, Django et FastAPI. Je m'intéresse à la conception des données, à la fiabilité des systèmes et à la sécurité applicative.",
  "Mon point de départ est toujours le besoin réel : comprendre comment une organisation fonctionne, ce qui la ralentit, puis construire un outil qui s'intègre à son quotidien plutôt que l'inverse.",
];

export type Experience = {
  org: string;
  role: string;
  period: string;
  kind: "pro" | "mission";
  points: string[];
};

export const experience: Experience[] = [
  {
    org: "DGCMP — Direction informatique",
    role: "Stagiaire / Assistant informatique",
    period: "2024 – 2025",
    kind: "pro",
    points: [
      "Assistance aux utilisateurs et résolution de problèmes informatiques.",
      "Maintenance des postes de travail et support technique.",
      "Participation au suivi des demandes et des incidents.",
    ],
  },
];

export const education = [
  { title: "Master 1 — Réseaux, Sécurité et Systèmes d'information", place: "Université Protestante au Congo (UPC), Kinshasa", period: "En cours" },
  { title: "Licence en Sciences informatiques — Génie logiciel", place: "Université Protestante au Congo (UPC), Kinshasa", period: "2024 – 2025" },
  { title: "Diplôme d'État — Option scientifique", place: "ESGTK, Mbuji-Mayi", period: "2021" },
];

export const languages = [
  { name: "Français", level: "Courant" },
  { name: "Anglais", level: "Intermédiaire (technique)" },
];

// level : "prestation" = utilisable en mission · "pratique" = utilisé en projet · "exploration" = en apprentissage
export type SkillLevel = "prestation" | "pratique" | "exploration";
export const skillLevels: Record<SkillLevel, string> = {
  prestation: "Maîtrisé pour une prestation",
  pratique: "Utilisé en projet",
  exploration: "En exploration",
};

export const skills: { domain: string; items: { name: string; level: SkillLevel }[] }[] = [
  {
    domain: "Backend & API",
    items: [
      { name: "Python", level: "prestation" },
      { name: "Django", level: "prestation" },
      { name: "FastAPI", level: "pratique" },
      { name: "API REST", level: "prestation" },
      { name: "PHP", level: "pratique" },
    ],
  },
  {
    domain: "Bases de données",
    items: [
      { name: "SQL", level: "prestation" },
      { name: "MySQL", level: "prestation" },
      { name: "PostgreSQL", level: "pratique" },
    ],
  },
  {
    domain: "Qualité logicielle & tests",
    items: [
      { name: "Scénarios de test", level: "pratique" },
      { name: "Cas limites & validation", level: "pratique" },
      { name: "Documentation technique", level: "pratique" },
    ],
  },
  {
    domain: "Sécurité applicative",
    items: [
      { name: "Notions OWASP", level: "pratique" },
      { name: "Authentification & rôles", level: "pratique" },
      { name: "DevSecOps", level: "exploration" },
    ],
  },
  {
    domain: "Web & autres langages",
    items: [
      { name: "HTML / CSS / JavaScript", level: "pratique" },
      { name: "React", level: "pratique" },
      { name: "Rust", level: "exploration" },
      { name: "Java / Spring Boot", level: "exploration" },
      { name: "C#", level: "exploration" },
    ],
  },
  {
    domain: "Outils",
    items: [
      { name: "Git / GitHub", level: "pratique" },
      { name: "Linux", level: "pratique" },
      { name: "Docker", level: "exploration" },
      { name: "GitHub Actions", level: "exploration" },
    ],
  },
];

export const method = [
  { title: "Comprendre", text: "Le besoin, les utilisateurs, les contraintes et ce qui existe déjà." },
  { title: "Cadrer", text: "Une solution et un périmètre clairs : ce qui est inclus, ce qui ne l'est pas." },
  { title: "Construire", text: "Un développement progressif, avec des points d'étape réguliers." },
  { title: "Vérifier", text: "Tests, documentation et corrections avant toute livraison." },
  { title: "Livrer", text: "Mise en service, explications et maintenance si elle est prévue." },
];
