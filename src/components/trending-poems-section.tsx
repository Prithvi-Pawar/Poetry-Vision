"use client";

import type React from 'react';
import PoemCard from "./poem-card";
import { Button } from '@/components/ui/button';
import { Sparkles, HelpCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const trendingPoemsData = [
  {
    title: "City at Dusk",
    poemSnippet: "Neon hums a lullaby,\nConcrete dreams beneath the sky...",
    imageUrl: "https://placehold.co/600x400/A098D3/F4F2F9?text=City+Dusk",
    imageHint: "city dusk"
  },
  {
    title: "Whispers of the Forest",
    poemSnippet: "Ancient trees in emerald cloak,\nSunlight spills, a gentle stroke...",
    imageUrl: "https://placehold.co/600x400/D398A0/F4F2F9?text=Forest+Whispers",
    imageHint: "forest nature"
  },
  {
    title: "Ocean's Heartbeat",
    poemSnippet: "Waves crash soft on sandy shore,\nSecrets kept forevermore...",
    imageUrl: "https://placehold.co/600x400/A0D398/F4F2F9?text=Ocean+Heartbeat",
    imageHint: "ocean waves"
  },
];

const TrendingPoemsSection: React.FC = () => {
  const { toast } = useToast();

  const handleFeelingStuck = () => {
    const prompts = [
      "Try writing about 'a memory from childhood'.",
      "What if you explored the feeling of 'nostalgia'?",
      "Consider a poem about 'the stars on a clear night'.",
      "How about the topic 'a hidden path'?",
      "Write about 'the sound of rain'.",
    ];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    toast({
      title: "Feeling Stuck? Try this!",
      description: randomPrompt,
      duration: 7000,
    });
  };

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Sparkles className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="font-headline text-4xl md:text-5xl mb-4">Trending Poem Ideas</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get inspired by these popular themes and verses crafted by others.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingPoemsData.map((poem, index) => (
            <PoemCard
              key={index}
              title={poem.title}
              poemSnippet={poem.poemSnippet}
              imageUrl={poem.imageUrl}
              imageHint={poem.imageHint}
              onViewPoem={() => toast({ title: "Coming Soon", description: "Viewing full trending poems will be available later!"})}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" onClick={handleFeelingStuck} className="font-headline text-lg border-accent text-accent hover:bg-accent/10">
            <HelpCircle className="mr-2 h-5 w-5" />
            Feeling Stuck? Get a Prompt!
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrendingPoemsSection;
