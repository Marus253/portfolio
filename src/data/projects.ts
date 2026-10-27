// Études de cas. Une section vide (tableau vide ou chaîne vide) n'est pas affichée :
// complète au fur et à mesure plutôt que d'inventer.
// Pour ajouter de vraies captures : mets les images dans public/images/projets/
// puis liste-les dans `screenshots` (ex. "images/projets/bma-dashboard.png").

export type Visual = "bma" | "mediflow" | "secpipeline" | "sigir" | "vision" | "pharma";
export type Status = "fonctionnel" | "en-cours" | "a-construire" | "prototype" | "finalise";

export const statusLabel: Record<Status, string> = {
  fonctionnel: "Fonctionnel · non publié",
  "en-cours": "En développement",
  "a-construire": "En construction",
  prototype: "Prototype",
  finalise: "Finalisé",
};

export type ArchNode = { label: string; detail: string };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  status: Status;
  featured: boolean;
  visual: Visual;
  stack: string[];
  // Angle client (langage métier) et angle recruteur (langage technique)
  business: string;
  technical: string;
  summary: { problem: string; users: string; goal: string };
  context: string;
  role: string[];
  solution: string[];
  architecture: ArchNode[];
  quality: string[];
  screenshots: { src: string; caption: string }[];
  results: string[];
  limits: string[];
  links: { label: string; href: string }[];
  confidentiality?: string;
};

export const projects: Project[] = [
  {
    slug: "bestme-academy",
    title: "BMA — BestMe Academy",
    tagline: "Plateforme de gestion d'une académie de formation",
    status: "fonctionnel",
    featured: true,
    visual: "bma",
    stack: ["React", "PHP", "MySQL"],
    business: "Numériser la gestion d'une académie : inscriptions, apprenants, formations et suivi depuis un seul outil.",
    technical: "Application React avec API PHP et base MySQL : authentification, gestion des rôles, inscriptions et tableaux de bord.",
    summary: {
      problem: "Une gestion des formations et des inscriptions dispersée entre plusieurs supports manuels.",
      users: "L'équipe administrative de l'académie, les formateurs et les apprenants.",
      goal: "Centraliser les inscriptions et le suivi dans des espaces adaptés à chaque profil.",
    },
    context:
      "BestMe Academy forme des jeunes au leadership, à l'entrepreneuriat, au numérique et à l'éducation financière. Le projet vise à remplacer une organisation manuelle par une plateforme web avec des espaces utilisateurs et des fonctions de gestion.",
    role: [
      "Participation à la conception et au développement de la plateforme.",
      "Rédaction du cahier des charges fonctionnel.",
    ],
    solution: [
      "Authentification et espaces utilisateurs selon le rôle.",
      "Gestion des inscriptions aux formations.",
      "Tableaux de bord de suivi pour l'administration.",
    ],
    architecture: [
      { label: "Interface", detail: "React" },
      { label: "API", detail: "PHP" },
      { label: "Données", detail: "MySQL" },
    ],
    quality: [],
    screenshots: [],
    results: [],
    limits: ["Projet fonctionnel mais pas encore publié en production."],
    links: [],
  },
  {
    slug: "mediflow",
    title: "MediFlow",
    tagline: "Système de gestion hospitalière",
    status: "en-cours",
    featured: true,
    visual: "mediflow",
    stack: ["FastAPI", "PostgreSQL", "API REST", "Flutter Desktop"],
    business: "Structurer les opérations et les données d'un établissement de santé : patients, consultations et postes de travail métiers.",
    technical: "Backend FastAPI et PostgreSQL exposant une API REST, avec contrôle d'accès, journalisation et fonctionnement en réseau local.",
    summary: {
      problem: "Des flux de patients et des informations médicales difficiles à suivre d'un service à l'autre.",
      users: "Personnel d'accueil, médecins, pharmacie et caisse d'un établissement de santé.",
      goal: "Un outil fiable sur le réseau local de l'établissement, avec des accès adaptés à chaque poste.",
    },
    context:
      "Beaucoup d'établissements fonctionnent avec une connexion Internet instable : l'application est pensée pour tourner sur le réseau local, avec un client desktop par poste de travail.",
    role: [
      "Développement de l'application : backend FastAPI et client desktop.",
      "Audits techniques et plans de correction priorisés.",
    ],
    solution: [
      "API REST pour les patients, consultations et postes métiers.",
      "Contrôle d'accès selon le rôle de l'utilisateur.",
      "Journalisation des actions.",
    ],
    architecture: [
      { label: "Client", detail: "Flutter Desktop" },
      { label: "API", detail: "FastAPI · REST" },
      { label: "Données", detail: "PostgreSQL" },
    ],
    quality: [
      "Contrat d'API strict entre client et backend pour éviter les erreurs de validation (422).",
      "Corrections organisées par vagues : bloquants, stabilité, qualité, long terme.",
    ],
    screenshots: [],
    results: [],
    limits: [
      "Couverture de tests encore faible : priorité des prochaines itérations.",
      "Mode hors-ligne et synchronisation pas encore implémentés.",
    ],
    links: [],
    confidentiality: "Aucune donnée médicale réelle n'est utilisée ni publiée : les démonstrations reposent sur des données fictives.",
  },
  {
    slug: "secpipeline-guard",
    title: "SecPipeline & Guard",
    tagline: "Chaîne DevSecOps de démonstration",
    status: "a-construire",
    featured: true,
    visual: "secpipeline",
    stack: ["FastAPI", "Docker", "GitHub Actions", "Tests", "Analyse statique"],
    business: "Aider une équipe à détecter les problèmes de qualité et de sécurité avant chaque livraison, automatiquement.",
    technical: "Application FastAPI conteneurisée, pipeline GitHub Actions : tests automatisés, analyse statique, audit des dépendances et rapports.",
    summary: {
      problem: "Des failles et régressions découvertes trop tard, après la mise en production.",
      users: "Petites équipes de développement sans spécialiste sécurité dédié.",
      goal: "Un pipeline reproductible qui bloque une livraison quand un contrôle échoue.",
    },
    context:
      "Projet de référence en cours de construction, destiné à démontrer une démarche d'ingénierie complète : code, tests, sécurité et documentation.",
    role: ["Conception et réalisation complètes (projet personnel)."],
    solution: [
      "Application FastAPI d'exemple, conteneurisée avec Docker.",
      "Pipeline GitHub Actions : tests, analyse statique, audit des dépendances.",
      "Rapports avant / après correction.",
    ],
    architecture: [
      { label: "Code", detail: "FastAPI · Docker" },
      { label: "CI", detail: "GitHub Actions" },
      { label: "Contrôles", detail: "Tests · SAST · dépendances" },
      { label: "Rapports", detail: "Résultats publiés" },
    ],
    quality: [],
    screenshots: [],
    results: [],
    limits: ["En construction : le dépôt, les rapports et le guide d'installation seront publiés ici."],
    links: [],
  },
  {
    slug: "sigir",
    title: "SIGIR",
    tagline: "Gestion des infractions routières en RDC",
    status: "prototype",
    featured: false,
    visual: "sigir",
    stack: ["Python", "Django", "MySQL"],
    business: "Remplacer un traitement manuel des contraventions, lent et propice à la fraude, par un suivi centralisé et des paiements traçables.",
    technical: "Application web Django et MySQL : gestion des acteurs, des dossiers et des paiements, avec exploration de l'automatisation.",
    summary: {
      problem: "Des contraventions traitées sur papier, sans centralisation des données entre services.",
      users: "Agents de contrôle, officiers chargés du traitement, contrevenants.",
      goal: "Un circuit numérique de la saisie de l'infraction jusqu'au paiement.",
    },
    context:
      "Au cours de l'analyse du besoin, un échange avec une officière a confirmé que les données des différents services n'étaient pas centralisées : c'est le cœur du problème que SIGIR cherche à résoudre.",
    role: ["Contribution au développement : modules de gestion des acteurs, des dossiers et des paiements."],
    solution: [
      "Saisie des infractions et identification du véhicule par la plaque.",
      "Suivi des dossiers et des paiements.",
      "Tableau de bord de suivi.",
    ],
    architecture: [
      { label: "Web", detail: "Templates Django" },
      { label: "Backend", detail: "Django" },
      { label: "Données", detail: "MySQL" },
    ],
    quality: [],
    screenshots: [],
    results: [],
    limits: ["Prototype non déployé ; le projet est en pause."],
    links: [],
  },
  {
    slug: "vision-v",
    title: "Vision-V",
    tagline: "Prototype d'identification de véhicules",
    status: "prototype",
    featured: false,
    visual: "vision",
    stack: ["Python", "OpenCV", "OCR", "Django"],
    business: "Identifier automatiquement un véhicule à partir d'une photo de sa plaque.",
    technical: "Traitement d'images OpenCV et reconnaissance de caractères (OCR) pour lire des plaques, avec intégration web.",
    summary: {
      problem: "Une identification des véhicules entièrement manuelle sur le terrain.",
      users: "Agents de contrôle (cas d'usage lié à SIGIR).",
      goal: "Détecter, redresser et lire une plaque sans matériel spécialisé.",
    },
    context: "Expérimentation menée en amont de SIGIR, dont l'idée de départ était justement l'identification des plaques.",
    role: ["Conception et réalisation du prototype."],
    solution: ["Détection et redressement de la plaque.", "Lecture des caractères par OCR."],
    architecture: [
      { label: "Image", detail: "Photo terrain" },
      { label: "Vision", detail: "OpenCV" },
      { label: "Lecture", detail: "OCR" },
      { label: "Web", detail: "Django" },
    ],
    quality: [],
    screenshots: [],
    results: [],
    limits: ["Prototype expérimental : précision non mesurée sur un jeu de données de référence."],
    links: [],
  },
  {
    slug: "pharmastock",
    title: "PharmaStock",
    tagline: "Gestion de stock pharmaceutique",
    status: "finalise",
    featured: false,
    visual: "pharma",
    stack: ["PHP", "MySQL"],
    business: "Suivre un stock de médicaments et être alerté avant les dates de péremption.",
    technical: "Application PHP et MySQL avec requêtes optimisées pour des inventaires périssables.",
    summary: {
      problem: "Des pertes dues à des produits périmés non repérés à temps.",
      users: "Gestionnaires de pharmacie.",
      goal: "Un inventaire à jour avec des alertes de péremption.",
    },
    context: "",
    role: ["Conception et réalisation."],
    solution: ["Suivi des entrées et sorties de stock.", "Surveillance des dates de péremption."],
    architecture: [
      { label: "Web", detail: "PHP" },
      { label: "Données", detail: "MySQL" },
    ],
    quality: ["Optimisation des requêtes SQL pour garder une saisie rapide."],
    screenshots: [],
    results: [],
    limits: [],
    links: [],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const findProject = (slug?: string) => projects.find((p) => p.slug === slug);
