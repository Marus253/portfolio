// Notes & veille. Brouillons rédigés à partir des études de cas du site :
// relis-les, ajuste-les avec tes mots, ou remplace-les par tes propres articles.
// Pour ajouter une note : copie un bloc, change le slug, la date et le texte.

export type Post = {
  slug: string;
  title: string;
  date: string; // AAAA-MM-JJ
  tag: string;
  excerpt: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "bloquer-une-livraison",
    title: "Bloquer une livraison quand un contrôle échoue",
    date: "2026-11-10",
    tag: "DevSecOps",
    excerpt: "Pourquoi SecPipeline arrête tout dès qu'un test, une analyse statique ou un audit de dépendances signale un problème.",
    body: [
      "Les failles et les régressions coûtent le plus cher quand on les découvre après la mise en production. C'est le problème de départ de SecPipeline & Guard, la chaîne DevSecOps de démonstration que je construis.",
      "Le principe est simple : chaque modification passe par un pipeline GitHub Actions qui lance les tests automatisés, une analyse statique du code et un audit des dépendances. Si un contrôle échoue, la livraison est bloquée.",
      "L'objectif n'est pas d'empiler des outils, mais de rendre le résultat reproductible et lisible, avec des rapports avant / après correction. C'est utile surtout pour les petites équipes qui n'ont pas de spécialiste sécurité dédié.",
    ],
  },
  {
    slug: "contrat-api-strict",
    title: "Un contrat d'API strict pour en finir avec les erreurs 422",
    date: "2026-11-03",
    tag: "Backend",
    excerpt: "Sur MediFlow, aligner précisément le client Flutter et le backend FastAPI a supprimé une famille entière d'erreurs de validation.",
    body: [
      "MediFlow est un système de gestion hospitalière : un backend FastAPI et PostgreSQL, et un client Flutter Desktop sur chaque poste de travail, sur le réseau local de l'établissement.",
      "Une bonne partie des bugs venait d'un décalage entre ce que le client envoyait et ce que l'API attendait : la réponse était une erreur de validation 422. La correction n'est pas de relâcher la validation, mais de fixer un contrat d'API strict, partagé par les deux côtés.",
      "Les corrections sont ensuite organisées par vagues — bloquants, stabilité, qualité, long terme — pour avancer sans tout casser. Prochaine priorité : la couverture de tests.",
    ],
  },
  {
    slug: "centraliser-avant-automatiser",
    title: "Centraliser les données avant d'automatiser",
    date: "2026-10-09",
    tag: "Retour d'expérience",
    excerpt: "Ce que SIGIR m'a appris : le vrai problème des contraventions n'était pas le papier, mais des données éparpillées entre services.",
    body: [
      "SIGIR est une application Django pour gérer les infractions routières en RDC, de la saisie de l'infraction jusqu'au paiement.",
      "L'idée de départ était l'automatisation : identifier un véhicule à partir d'une photo de sa plaque (c'est le prototype Vision-V, avec OpenCV et l'OCR). Mais un échange avec une officière pendant l'analyse du besoin a déplacé le problème : les données des différents services n'étaient pas centralisées.",
      "Leçon retenue : automatiser une saisie ne sert à rien si l'information ne circule pas ensuite. On commence par un circuit de données unique et traçable ; l'automatisation vient après.",
    ],
  },
];

export const findPost = (slug?: string) => posts.find((p) => p.slug === slug);

export const formatDate = (d: string) =>
  new Date(d + "T12:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
