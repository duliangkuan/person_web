'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

import BootSequence from '@/components/BootSequence';
import CursorBlock from '@/components/CursorBlock';
import CyberGrid from '@/components/CyberGrid';
import TopHUD from '@/components/TopHUD';
import TerminalInput from '@/components/TerminalInput';
import Hero from '@/components/sections/Hero';
import Stack from '@/components/sections/Stack';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Influence from '@/components/sections/Influence';
import Manifesto from '@/components/sections/Manifesto';

const NeuralFlux = dynamic(() => import('@/components/NeuralFlux'), { ssr: false });

export default function Page() {
  const [booted, setBooted] = useState(false);

  return (
    <main className="relative">
      <NeuralFlux />
      <CyberGrid />
      <div className="noise" />
      <div className="scanlines" />
      <div className="vignette" />

      {!booted && <BootSequence onExit={() => setBooted(true)} />}
      <CursorBlock />

      {booted && (
        <>
          <TopHUD />
          <Hero />
          <Stack />
          <Experience />
          <Projects />
          <Influence />
          <Manifesto />
          <div className="h-24" />
          <TerminalInput />
        </>
      )}
    </main>
  );
}
