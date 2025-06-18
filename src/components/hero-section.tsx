"use client";

import type React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  scrollToGenerator: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToGenerator }) => {
  return (
    <section className="w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-center p-6 relative overflow-hidden animated-gradient">
      <div className="absolute inset-0 bg-background/30 backdrop-blur-sm"></div>
      <div className="relative z-10 space-y-8">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-primary-foreground drop-shadow-lg">
          Turn Feelings into Poetry
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto drop-shadow-sm">
          Unleash your inner poet with Verse Vision. Transform your thoughts, emotions, or even just a single word into beautiful, AI-crafted verses.
        </p>
        <Button
          size="lg"
          className="font-headline text-lg bg-primary hover:bg-primary/90 text-primary-foreground btn-pulse px-8 py-6 rounded-lg shadow-xl"
          onClick={scrollToGenerator}
          aria-label="Scroll to poem generator"
        >
          Generate a Poem
          <ArrowDown className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
