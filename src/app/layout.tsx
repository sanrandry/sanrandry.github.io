import type { Metadata } from "next";
import { Roboto, Inknut_Antiqua } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inknutAntiqua = Inknut_Antiqua({
  variable: "--font-inknut",
  subsets: ["latin"],
  weight: ["600"],
});

const BASE_URL = "https://sanrandry.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Santatraina Sitraka RANDRY — Fullstack Developer / Développeur Fullstack",
    template: "%s | Santatraina Sitraka RANDRY",
  },
  description:
    "Fullstack developer specialized in Vue.js, Nuxt.js, React, Next.js, Node.js and microservices. Available for freelance. · Développeur Fullstack spécialisé Vue.js, Nuxt.js, React, Next.js, Node.js et microservices. Disponible en freelance.",
  keywords: [
    // EN
    "Fullstack Developer", "Web Developer", "Freelance Developer",
    "Vue.js", "Nuxt.js", "React", "Next.js", "Node.js", "Nest.js",
    "TypeScript", "Microservices", "Docker", "PostgreSQL", "MongoDB",
    "Madagascar", "Santatraina Sitraka RANDRY",
    // FR
    "Développeur Fullstack", "Développeur Web", "Développeur Freelance",
    "Développeur Vue.js", "Développeur React", "Développeur Node.js",
    "Architecture microservices", "Développeur Madagascar",
  ],
  authors: [{ name: "Santatraina Sitraka RANDRY", url: BASE_URL }],
  creator: "Santatraina Sitraka RANDRY",
  publisher: "Santatraina Sitraka RANDRY",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "fr_FR",
    url: BASE_URL,
    siteName: "Santatraina Sitraka RANDRY",
    title: "Santatraina Sitraka RANDRY — Fullstack Developer / Développeur Fullstack",
    description:
      "Fullstack developer · Vue.js, Nuxt.js, React, Next.js, Node.js, microservices. Freelance available. · Développeur Fullstack disponible en freelance.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Santatraina Sitraka RANDRY — Fullstack Developer / Développeur Fullstack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Santatraina Sitraka RANDRY — Fullstack Developer / Développeur Fullstack",
    description:
      "Fullstack developer · Vue.js, Nuxt.js, React, Next.js, Node.js. Freelance available. · Développeur Fullstack disponible en freelance.",
    images: ["/images/og-image.png"],
    creator: "@sanrandry",
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en": BASE_URL,
      "fr": BASE_URL,
      "x-default": BASE_URL,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Santatraina Sitraka RANDRY",
      url: BASE_URL,
      email: "sinrandry@gmail.com",
      jobTitle: ["Fullstack Developer", "Développeur Fullstack"],
      description: [
        "Fullstack developer specialized in Vue.js, Nuxt.js, React, Next.js, Node.js and microservices architecture. Available for freelance missions.",
        "Développeur Fullstack spécialisé en Vue.js, Nuxt.js, React, Next.js, Node.js et architecture microservices. Disponible en freelance.",
      ],
      knowsLanguage: ["en", "fr"],
      knowsAbout: [
        "Vue.js", "Nuxt.js", "React", "Next.js", "Node.js", "Nest.js",
        "TypeScript", "Microservices", "Docker", "PostgreSQL", "MongoDB",
        "C# .NET", "gRPC", "GraphQL", "Prisma",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Antananarivo",
        addressCountry: "MG",
      },
      sameAs: [
        "https://github.com/sanrandry",
        "https://www.linkedin.com/in/randry-santatraina-sitraka-131415168/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Santatraina Sitraka RANDRY — Portfolio",
      inLanguage: ["en", "fr"],
      author: { "@id": `${BASE_URL}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${inknutAntiqua.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-white font-roboto">{children}</body>
    </html>
  );
}
