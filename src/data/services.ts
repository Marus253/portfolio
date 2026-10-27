// Trois offres solides plutôt qu'un catalogue. Le délai n'est donné qu'après cadrage.

export type Service = {
  id: string;
  title: string;
  pitch: string;
  problems: string[];
  deliverables: string[];
  excluded: string[];
  stack: string;
};

export const services: Service[] = [
  {
    id: "application-metier",
    title: "Applications métier",
    pitch: "Des outils de gestion sur mesure pour remplacer les fichiers Excel, le papier et les processus manuels.",
    problems: [
      "Les informations sont éparpillées entre cahiers, fichiers et messages.",
      "Le suivi d'activité prend trop de temps ou n'est pas fiable.",
      "Vous n'avez pas de vision claire de vos chiffres.",
    ],
    deliverables: [
      "Application web avec les fonctionnalités convenues au cadrage",
      "Comptes utilisateurs et accès selon les rôles",
      "Tableau de bord de suivi",
      "Documentation d'utilisation et transfert",
    ],
    excluded: ["Application mobile native", "Matériel et infrastructure réseau"],
    stack: "Django ou FastAPI · PostgreSQL / MySQL · interface web",
  },
  {
    id: "backend-api",
    title: "Backend, API & bases de données",
    pitch: "La partie invisible mais essentielle : une API fiable, des données bien structurées et des accès sécurisés.",
    problems: [
      "Votre application a besoin d'une API ou d'un backend solide.",
      "Votre base de données est lente, mal structurée ou incohérente.",
      "Deux systèmes doivent échanger des données.",
    ],
    deliverables: [
      "API REST documentée",
      "Modèle de données et base configurée",
      "Authentification et gestion des permissions",
      "Tests des points critiques",
    ],
    excluded: ["Design graphique de l'interface", "Hébergement géré sur la durée (sauf accord)"],
    stack: "Python · Django / DRF · FastAPI · PostgreSQL",
  },
  {
    id: "automatisation",
    title: "Automatisation & intégration",
    pitch: "Supprimer les tâches répétitives : traitements de données, relances, échanges entre applications.",
    problems: [
      "Une même tâche est refaite à la main chaque jour.",
      "Des données doivent être extraites, nettoyées ou converties.",
      "Des documents scannés doivent être exploités (OCR).",
    ],
    deliverables: [
      "Script ou workflow automatisé",
      "Tests sur vos cas réels",
      "Procédure d'exploitation documentée",
    ],
    excluded: ["Automatisation de systèmes auxquels vous n'avez pas un accès autorisé"],
    stack: "Python · OpenCV / OCR · tâches planifiées",
  },
];

export const quoteInfo = [
  "Votre activité et le problème à résoudre",
  "Les personnes qui utiliseront l'outil",
  "Ce que vous utilisez aujourd'hui (Excel, papier, autre logiciel…)",
  "Votre délai et, si possible, un budget indicatif",
];

export const securityNote =
  "Dans chaque prestation : validation des entrées, gestion des accès, tests des points critiques et documentation — la sécurité et la qualité sont intégrées, pas vendues en option.";
