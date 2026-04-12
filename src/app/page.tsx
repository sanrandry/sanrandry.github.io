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

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handleLoaderDone = useCallback(() => setLoaded(true), []);

  return (
    <>
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
      <footer className="text-center py-8 text-[#495670] text-xs font-mono">
        <p>Designed &amp; Built by Santatraina Sitraka RANDRY</p>
      </footer>
    </>
  );
}
