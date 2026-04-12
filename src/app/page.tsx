"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Work from "@/components/Work";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import SocialSidebar from "@/components/SocialSidebar";
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handleLoaderDone = useCallback(() => setLoaded(true), []);

  return (
    <LanguageProvider>
      <Loader onDone={handleLoaderDone} />
      <Header loaded={loaded} />
      <SocialSidebar loaded={loaded} />
      <main>
        <Hero loaded={loaded} />
        <About />
        <Experience />
        <Work />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
