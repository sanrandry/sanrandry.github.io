export type Lang = "fr" | "en";

export const translations = {
  fr: {
    nav: {
      about: "À propos",
      experience: "Expérience",
      work: "Projets",
      contact: "Contact",
      resume: "CV",
    },
    hero: {
      greeting: "Bonjour, je suis",
      tagline: "Je construis des choses pour le web.",
      description:
        "Développeur Fullstack passionné par la création d'expériences digitales robustes et accessibles. Spécialisé en Vue.js / Nuxt.js, React et Node.js, avec une solide expérience en architecture microservices et DevOps.",
      cta: "Voir mes projets",
    },
    about: {
      sectionNum: "1.",
      sectionTitle: "À propos",
      p1: "Je suis Santatraina Sitraka RANDRY, développeur Fullstack basé à Antananarivo, Madagascar. Diplômé d'un Master 2 en informatique à l'École Nationale d'Informatique Madagascar (2019), je conçois et développe des applications web robustes depuis plus de 6 ans.",
      p2: "Mon parcours m'a amené à travailler sur des projets variés : systèmes de gestion de robots, plateformes d'observation de la Terre, CRM, applications RH et systèmes de livraison — en startup comme en entreprise établie.",
      p3: "Actuellement disponible en freelance, je suis spécialisé dans les architectures frontend modernes (Vue.js/Nuxt.js, React/Next.js) et les backends scalables (Node.js, Nest.js, .NET, microservices, Docker).",
      techTitle: "Quelques technologies récentes :",
    },
    experience: {
      sectionNum: "2.",
      sectionTitle: "Où j'ai travaillé",
      jobs: [
        {
          company: "Freelance",
          role: "Développeur Fullstack",
          period: "Fév 2025 – Oct 2025",
          bullets: [
            "Développement et maintenance du site web ainsi que des espaces clients d'une entreprise spécialisée dans le domaine de l'énergie.",
            "Migration de l'interface de Nuxt 2 vers Nuxt 3, amélioration des performances et modernisation du code.",
            "Mise en place de nouvelles fonctionnalités avec Strapi (CMS headless) et PostgreSQL.",
          ],
        },
        {
          company: "Hairun Technology",
          role: "Consultant Développeur Fullstack",
          period: "Sep 2022 – Fév 2025",
          bullets: [
            "Développement et maintenance de l'application de gestion et de monitoring des robots Bbot. Migration de l'interface du robot de Unity vers Blazor.",
            "Développement d'une plateforme d'observation de la Terre (Prométhée Earth Intelligence) pour secteurs gouvernement, militaire, maritime. Communication via gRPC.",
            "Système de gestion centralisé pour restaurants et franchises chez pazzirobotics : back office PCC, maintenance robots, interface salle d'attente.",
          ],
        },
        {
          company: "reffmedia",
          role: "Développeur Fullstack",
          period: "2022 – 2023",
          bullets: [
            "Développement d'un CRM dédié à la gestion des relations clients et à l'automatisation de la génération de leads.",
            "Architecture événementielle avec RabbitMQ pour la communication entre services.",
            "Monorepo géré avec Lerna.",
          ],
        },
        {
          company: "APMF Madagascar",
          role: "Consultant",
          period: "Mar 2023 – Jun 2023",
          bullets: [
            "Intégration d'un système de chat en temps réel sur la plateforme de gestion des ressources humaines.",
            "Migration de l'application d'Angular 8 vers Angular 16.",
          ],
        },
        {
          company: "haisoa.com",
          role: "Chef de Projet & Dev Fullstack",
          period: "Jan 2022 – Sep 2022",
          bullets: [
            "Conception et développement d'une plateforme complète de gestion pour l'ONG Voakajy.",
            "Modules : gestion des employés, paie, congés, recrutement, formation, logistique, comptabilité, timesheet.",
            "Architecture microservices avec Nest.js, Prisma, Next.js.",
          ],
        },
      ],
    },
    work: {
      sectionNum: "3.",
      sectionTitle: "Quelques projets réalisés",
      label: "Projet mis en avant",
      projects: [
        {
          title: "Prométhée Earth Intelligence",
          description:
            "Plateforme d'observation de la Terre multi-secteurs (gouvernement, militaire, pompiers, maritime). Architecture microservices avec communication inter-services via gRPC.",
        },
        {
          title: "Plateforme Voakajy (haisoa.com)",
          description:
            "Conception et développement d'une plateforme complète de gestion RH pour l'ONG Voakajy : employés, paie, congés, recrutement, formation, logistique, comptabilité, timesheet.",
        },
      ],
    },
    projects: {
      sectionTitle: "Autres projets notables",
      archiveLink: "voir tous les projets",
      items: [
        {
          title: "Bbot — Gestion & Monitoring Robots",
          description:
            "Application de gestion et monitoring des robots Bbot. Migration interface robot de Unity vers Blazor.",
        },
        {
          title: "pazzirobotics — Back Office PCC",
          description:
            "Système de gestion centralisé pour restaurants et franchises. Interface back office, maintenance robots, salle d'attente.",
        },
        {
          title: "CRM reffmedia",
          description:
            "CRM dédié à la gestion des relations clients et à l'automatisation de la génération de leads. Architecture événementielle RabbitMQ.",
        },
        {
          title: "meetual.com — API GraphQL v2",
          description:
            "Développement de l'API GraphQL v2 de la plateforme de réservation de thérapie en ligne.",
        },
        {
          title: "Facily Post France",
          description:
            "Plateforme de gestion de la livraison des courriers. Application mobile + backend.",
        },
        {
          title: "Réservation Funérarium — wedevin.fr",
          description: "Plateforme de réservation de funérarium et de pompes funèbres.",
        },
      ],
    },
    contact: {
      sectionNum: "04.",
      sectionLabel: "Et maintenant ?",
      title: "Travaillons ensemble",
      description:
        "Je suis actuellement disponible pour des missions freelance ou des opportunités à temps plein. Que vous ayez un projet en tête, une question, ou simplement envie d'échanger — mon inbox est ouvert !",
      cta: "Dire bonjour",
    },
    footer: "Conçu & Développé par Santatraina Sitraka RANDRY",
  },

  en: {
    nav: {
      about: "About",
      experience: "Experience",
      work: "Work",
      contact: "Contact",
      resume: "Resume",
    },
    hero: {
      greeting: "Hi, my name is",
      tagline: "I build things for the web.",
      description:
        "Fullstack developer passionate about building robust and accessible digital experiences. Specialized in Vue.js / Nuxt.js, React and Node.js, with strong expertise in microservices architecture and DevOps.",
      cta: "Check out my work",
    },
    about: {
      sectionNum: "1.",
      sectionTitle: "About me",
      p1: "I'm Santatraina Sitraka RANDRY, a Fullstack developer based in Antananarivo, Madagascar. I hold a Master's degree in Computer Science from the École Nationale d'Informatique Madagascar (2019) and have been designing and building web applications for over 6 years.",
      p2: "My journey has taken me through diverse projects: robot management systems, Earth observation platforms, CRMs, HR applications and delivery systems — in both startups and established companies.",
      p3: "Currently available for freelance work, I specialize in modern frontend architectures (Vue.js/Nuxt.js, React/Next.js) and scalable backends (Node.js, Nest.js, .NET, microservices, Docker).",
      techTitle: "Technologies I've been working with recently:",
    },
    experience: {
      sectionNum: "2.",
      sectionTitle: "Where I've Worked",
      jobs: [
        {
          company: "Freelance",
          role: "Fullstack Developer",
          period: "Feb 2025 – Oct 2025",
          bullets: [
            "Development and maintenance of the website and client portals for an energy sector company.",
            "Migration from Nuxt 2 to Nuxt 3, improving performance and modernizing the codebase.",
            "Implementation of new features using Strapi (headless CMS) and PostgreSQL.",
          ],
        },
        {
          company: "Hairun Technology",
          role: "Fullstack Developer Consultant",
          period: "Sep 2022 – Feb 2025",
          bullets: [
            "Development and maintenance of the Bbot robot management and monitoring application. Migration of the robot interface from Unity to Blazor.",
            "Development of an Earth observation platform (Prométhée Earth Intelligence) for government, military, and maritime sectors. Inter-service communication via gRPC.",
            "Centralized management system for restaurants and franchises at pazzirobotics: PCC back office, robot maintenance interface, waiting room display.",
          ],
        },
        {
          company: "reffmedia",
          role: "Fullstack Developer",
          period: "2022 – 2023",
          bullets: [
            "Development of a CRM dedicated to client relationship management and lead generation automation.",
            "Event-driven architecture with RabbitMQ for inter-service communication.",
            "Monorepo managed with Lerna.",
          ],
        },
        {
          company: "APMF Madagascar",
          role: "Consultant",
          period: "Mar 2023 – Jun 2023",
          bullets: [
            "Integration of a real-time chat system into the HR management platform.",
            "Migration of the application from Angular 8 to Angular 16.",
          ],
        },
        {
          company: "haisoa.com",
          role: "Project Lead & Fullstack Developer",
          period: "Jan 2022 – Sep 2022",
          bullets: [
            "Design and development of a comprehensive management platform for NGO Voakajy.",
            "Modules: employee management, payroll, leave, recruitment, training, logistics, accounting, timesheet.",
            "Microservices architecture with Nest.js, Prisma, Next.js.",
          ],
        },
      ],
    },
    work: {
      sectionNum: "3.",
      sectionTitle: "Some Things I've Built",
      label: "Featured Project",
      projects: [
        {
          title: "Prométhée Earth Intelligence",
          description:
            "Multi-sector Earth observation platform (government, military, firefighters, maritime). Microservices architecture with inter-service communication via gRPC.",
        },
        {
          title: "Voakajy Platform (haisoa.com)",
          description:
            "Design and development of a comprehensive HR management platform for NGO Voakajy: employees, payroll, leave, recruitment, training, logistics, accounting, timesheets.",
        },
      ],
    },
    projects: {
      sectionTitle: "Other Noteworthy Projects",
      archiveLink: "view the archive",
      items: [
        {
          title: "Bbot — Robot Management & Monitoring",
          description:
            "Robot management and monitoring application for Bbot. Migration of robot interface from Unity to Blazor.",
        },
        {
          title: "pazzirobotics — PCC Back Office",
          description:
            "Centralized management system for restaurants and franchises. Back office, robot maintenance interface, waiting room display.",
        },
        {
          title: "reffmedia CRM",
          description:
            "CRM for client relationship management and lead generation automation. Event-driven architecture with RabbitMQ.",
        },
        {
          title: "meetual.com — GraphQL API v2",
          description:
            "Development of the GraphQL API v2 for an online therapy booking platform.",
        },
        {
          title: "Facily Post France",
          description: "Mail delivery management platform. Mobile app + backend.",
        },
        {
          title: "Funeral Home Booking — wedevin.fr",
          description: "Online booking platform for funeral homes and funeral services.",
        },
      ],
    },
    contact: {
      sectionNum: "04.",
      sectionLabel: "What's Next?",
      title: "Get In Touch",
      description:
        "I'm currently open to freelance missions or full-time opportunities. Whether you have a project in mind, a question, or just want to say hi — my inbox is always open!",
      cta: "Say Hello",
    },
    footer: "Built by Santatraina Sitraka RANDRY",
  },
} as const;

export type Translations = typeof translations.fr;
