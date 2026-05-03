export type Lang = "fr" | "en";

export const translations = {
  fr: {
    os: {
      status: "Disponible freelance",
      menu: "Portfolio OS",
      dock: "Dock",
      open: "Ouvrir",
      close: "Fermer",
      minimize: "Reduire",
      restore: "Restaurer",
      desktop: "Bureau",
      windows: {
        profile: "Profil",
        experience: "Experience",
        projects: "Projets",
        terminal: "Terminal",
        contact: "Contact",
      },
      bootLines: ["Chargement du profil", "Montage des projets", "Connexion au reseau"],
    },
    nav: {
      about: "A propos",
      experience: "Experience",
      work: "Projets",
      contact: "Contact",
      resume: "CV",
    },
    hero: {
      greeting: "Bonjour, je suis",
      tagline: "Je construis des plateformes web robustes.",
      description:
        "Developpeur Fullstack base a Antananarivo, specialise en interfaces modernes, backends scalables, microservices et livraison produit.",
      cta: "Explorer le bureau",
    },
    about: {
      sectionNum: "1.",
      sectionTitle: "A propos",
      p1: "Je suis Santatraina Sitraka RANDRY, developpeur Fullstack base a Antananarivo, Madagascar. Diplome d'un Master 2 en informatique a l'Ecole Nationale d'Informatique Madagascar, je conçois et developpe des applications web depuis plus de 6 ans.",
      p2: "Mon parcours couvre des systemes de gestion de robots, plateformes d'observation de la Terre, CRM, applications RH et systemes de livraison, en startup comme en entreprise etablie.",
      p3: "Je suis disponible en freelance et j'interviens sur des architectures frontend modernes, des backends scalables, des microservices et des environnements Dockerises.",
      techTitle: "Stack recente",
    },
    stats: [
      { label: "Experience", value: "6+ ans" },
      { label: "Focus", value: "Fullstack" },
      { label: "Base", value: "Madagascar" },
    ],
    experience: {
      sectionNum: "2.",
      sectionTitle: "Experience",
      jobs: [
        {
          company: "Freelance",
          role: "Developpeur Fullstack",
          period: "Fev 2025 - Oct 2025",
          bullets: [
            "Developpement et maintenance du site web et des espaces clients d'une entreprise specialisee dans l'energie.",
            "Migration de l'interface de Nuxt 2 vers Nuxt 3, amelioration des performances et modernisation du code.",
            "Mise en place de nouvelles fonctionnalites avec Strapi et PostgreSQL.",
          ],
        },
        {
          company: "Hairun Technology",
          role: "Consultant Developpeur Fullstack",
          period: "Sep 2022 - Fev 2025",
          bullets: [
            "Developpement et maintenance de l'application de gestion et monitoring des robots Bbot.",
            "Developpement d'une plateforme d'observation de la Terre pour des secteurs gouvernementaux, militaires et maritimes.",
            "Systeme centralise pour restaurants et franchises: back office, maintenance robots et interface salle d'attente.",
          ],
        },
        {
          company: "reffmedia",
          role: "Developpeur Fullstack",
          period: "2022 - 2023",
          bullets: [
            "Developpement d'un CRM dedie a la gestion des relations clients et a la generation de leads.",
            "Architecture evenementielle avec RabbitMQ pour la communication entre services.",
            "Monorepo gere avec Lerna.",
          ],
        },
        {
          company: "APMF Madagascar",
          role: "Consultant",
          period: "Mar 2023 - Jun 2023",
          bullets: [
            "Integration d'un systeme de chat en temps reel sur une plateforme RH.",
            "Migration de l'application d'Angular 8 vers Angular 16.",
          ],
        },
        {
          company: "haisoa.com",
          role: "Chef de Projet & Dev Fullstack",
          period: "Jan 2022 - Sep 2022",
          bullets: [
            "Conception et developpement d'une plateforme complete de gestion pour l'ONG Voakajy.",
            "Modules RH, paie, conges, recrutement, formation, logistique, comptabilite et timesheet.",
            "Architecture microservices avec Nest.js, Prisma, Next.js, MongoDB et PostgreSQL.",
          ],
        },
      ],
    },
    work: {
      sectionNum: "3.",
      sectionTitle: "Projets realises",
      label: "Projet mis en avant",
      projects: [
        {
          title: "Promethee Earth Intelligence",
          description:
            "Plateforme d'observation de la Terre multi-secteurs avec architecture microservices et communication inter-services via gRPC.",
        },
        {
          title: "Plateforme Voakajy",
          description:
            "Plateforme complete de gestion RH pour l'ONG Voakajy: employes, paie, conges, recrutement, formation, logistique, comptabilite et timesheet.",
        },
      ],
    },
    projects: {
      sectionTitle: "Autres projets notables",
      archiveLink: "voir tous les projets",
      items: [
        {
          title: "Bbot - Gestion & Monitoring Robots",
          description:
            "Application de gestion et monitoring des robots Bbot, avec migration d'une interface Unity vers Blazor.",
        },
        {
          title: "pazzirobotics - Back Office PCC",
          description:
            "Systeme centralise pour restaurants et franchises: back office, maintenance robots et salle d'attente.",
        },
        {
          title: "CRM reffmedia",
          description:
            "CRM dedie a la relation client et a l'automatisation de leads, avec architecture evenementielle RabbitMQ.",
        },
        {
          title: "meetual.com - API GraphQL v2",
          description:
            "Developpement de l'API GraphQL v2 d'une plateforme de reservation de therapie en ligne.",
        },
        {
          title: "Facily Post France",
          description: "Plateforme de gestion de livraison de courriers avec application mobile et backend.",
        },
        {
          title: "Reservation Funerarium",
          description: "Plateforme de reservation de funerarium et de pompes funebres.",
        },
      ],
    },
    contact: {
      sectionNum: "04.",
      sectionLabel: "Et maintenant ?",
      title: "Travaillons ensemble",
      description:
        "Je suis disponible pour des missions freelance ou des opportunites a temps plein. Pour un projet, une question ou un echange, contactez-moi directement.",
      cta: "Dire bonjour",
    },
    terminal: {
      whoami: "Developpeur Fullstack, orientee produit, architecture et livraison.",
      stack: "Vue/Nuxt, React/Next, Node/Nest, .NET, Docker, PostgreSQL, MongoDB, gRPC, GraphQL.",
      availability: "Disponible pour missions freelance, renfort produit ou opportunites long terme.",
    },
    footer: "Concu et developpe par Santatraina Sitraka RANDRY",
  },

  en: {
    os: {
      status: "Available for freelance",
      menu: "Portfolio OS",
      dock: "Dock",
      open: "Open",
      close: "Close",
      minimize: "Minimize",
      restore: "Restore",
      desktop: "Desktop",
      windows: {
        profile: "Profile",
        experience: "Experience",
        projects: "Projects",
        terminal: "Terminal",
        contact: "Contact",
      },
      bootLines: ["Loading profile", "Mounting projects", "Connecting network"],
    },
    nav: {
      about: "About",
      experience: "Experience",
      work: "Work",
      contact: "Contact",
      resume: "Resume",
    },
    hero: {
      greeting: "Hi, my name is",
      tagline: "I build robust web platforms.",
      description:
        "Fullstack developer based in Antananarivo, specialized in modern interfaces, scalable backends, microservices, and product delivery.",
      cta: "Explore desktop",
    },
    about: {
      sectionNum: "1.",
      sectionTitle: "About",
      p1: "I'm Santatraina Sitraka RANDRY, a Fullstack developer based in Antananarivo, Madagascar. I hold a Master's degree in Computer Science from the Ecole Nationale d'Informatique Madagascar and have been designing and building web applications for over 6 years.",
      p2: "My experience spans robot management systems, Earth observation platforms, CRMs, HR applications, and delivery systems in both startups and established companies.",
      p3: "I'm available for freelance work and focus on modern frontend architectures, scalable backends, microservices, and Docker-based delivery.",
      techTitle: "Recent stack",
    },
    stats: [
      { label: "Experience", value: "6+ years" },
      { label: "Focus", value: "Fullstack" },
      { label: "Base", value: "Madagascar" },
    ],
    experience: {
      sectionNum: "2.",
      sectionTitle: "Experience",
      jobs: [
        {
          company: "Freelance",
          role: "Fullstack Developer",
          period: "Feb 2025 - Oct 2025",
          bullets: [
            "Developed and maintained the website and client portals for an energy-sector company.",
            "Migrated the interface from Nuxt 2 to Nuxt 3, improving performance and modernizing the codebase.",
            "Implemented new features with Strapi and PostgreSQL.",
          ],
        },
        {
          company: "Hairun Technology",
          role: "Fullstack Developer Consultant",
          period: "Sep 2022 - Feb 2025",
          bullets: [
            "Built and maintained the Bbot robot management and monitoring application.",
            "Developed an Earth observation platform for government, military, and maritime sectors.",
            "Created centralized restaurant and franchise tools: back office, robot maintenance, and waiting-room display.",
          ],
        },
        {
          company: "reffmedia",
          role: "Fullstack Developer",
          period: "2022 - 2023",
          bullets: [
            "Developed a CRM for client relationship management and lead generation automation.",
            "Designed event-driven communication between services with RabbitMQ.",
            "Worked in a Lerna-managed monorepo.",
          ],
        },
        {
          company: "APMF Madagascar",
          role: "Consultant",
          period: "Mar 2023 - Jun 2023",
          bullets: [
            "Integrated a real-time chat system into an HR management platform.",
            "Migrated the application from Angular 8 to Angular 16.",
          ],
        },
        {
          company: "haisoa.com",
          role: "Project Lead & Fullstack Developer",
          period: "Jan 2022 - Sep 2022",
          bullets: [
            "Designed and built a complete management platform for NGO Voakajy.",
            "Covered HR, payroll, leave, recruitment, training, logistics, accounting, and timesheets.",
            "Delivered a microservices architecture with Nest.js, Prisma, Next.js, MongoDB, and PostgreSQL.",
          ],
        },
      ],
    },
    work: {
      sectionNum: "3.",
      sectionTitle: "Selected work",
      label: "Featured project",
      projects: [
        {
          title: "Promethee Earth Intelligence",
          description:
            "Multi-sector Earth observation platform with microservices architecture and inter-service communication via gRPC.",
        },
        {
          title: "Voakajy Platform",
          description:
            "Complete HR management platform for NGO Voakajy: employees, payroll, leave, recruitment, training, logistics, accounting, and timesheets.",
        },
      ],
    },
    projects: {
      sectionTitle: "Other noteworthy projects",
      archiveLink: "view archive",
      items: [
        {
          title: "Bbot - Robot Management & Monitoring",
          description:
            "Robot management and monitoring application for Bbot, including migration from a Unity interface to Blazor.",
        },
        {
          title: "pazzirobotics - PCC Back Office",
          description:
            "Centralized system for restaurants and franchises: back office, robot maintenance, and waiting-room display.",
        },
        {
          title: "reffmedia CRM",
          description:
            "CRM for client relationship management and lead generation automation with RabbitMQ event architecture.",
        },
        {
          title: "meetual.com - GraphQL API v2",
          description:
            "GraphQL API v2 development for an online therapy booking platform.",
        },
        {
          title: "Facily Post France",
          description: "Mail delivery management platform with mobile application and backend.",
        },
        {
          title: "Funeral Home Booking",
          description: "Online booking platform for funeral homes and funeral services.",
        },
      ],
    },
    contact: {
      sectionNum: "04.",
      sectionLabel: "What's next?",
      title: "Let's work together",
      description:
        "I'm open to freelance missions and full-time opportunities. For a project, a question, or a quick exchange, reach out directly.",
      cta: "Say hello",
    },
    terminal: {
      whoami: "Fullstack developer focused on product, architecture, and delivery.",
      stack: "Vue/Nuxt, React/Next, Node/Nest, .NET, Docker, PostgreSQL, MongoDB, gRPC, GraphQL.",
      availability: "Available for freelance missions, product reinforcement, or long-term opportunities.",
    },
    footer: "Built by Santatraina Sitraka RANDRY",
  },
} as const;

export type Translations = typeof translations.fr;
