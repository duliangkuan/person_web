import TopHUD from '@/components/TopHUD';
import Hero from '@/components/sections/Hero';
import LearningClub from '@/components/sections/LearningClub';
import Stack from '@/components/sections/Stack';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Influence from '@/components/sections/Influence';
import Manifesto from '@/components/sections/Manifesto';

export default function Page() {
  return (
    <main className="paper-shell relative overflow-x-clip">
      <div className="paper-grid" aria-hidden="true" />
      <div className="paper-grain" aria-hidden="true" />
      <TopHUD />
      <Hero />
      <LearningClub />
      <Stack />
      <Experience />
      <Projects />
      <Influence />
      <Manifesto />
    </main>
  );
}
