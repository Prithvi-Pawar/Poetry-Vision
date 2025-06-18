
"use client";

import React from 'react';
import PoemCard from "./poem-card";
import { Button } from '@/components/ui/button';
import { Sparkles, HelpCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const trendingPoemsData = [
  {
    title: "City at Dusk",
    poemSnippet: "Neon hums a lullaby,\nConcrete dreams beneath the sky...",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "city dusk"
  },
  {
    title: "Whispers of the Forest",
    poemSnippet: "Ancient trees in emerald cloak,\nSunlight spills, a gentle stroke...",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "forest nature"
  },
  {
    title: "Ocean's Heartbeat",
    poemSnippet: "Waves crash soft on sandy shore,\nSecrets kept forevermore...",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "ocean waves"
  },
];

interface TrendingPoemsSectionProps {
  setGeneratorInputValue: (value: string) => void;
  scrollToGenerator: () => void;
}

const TrendingPoemsSection: React.FC<TrendingPoemsSectionProps> = ({ setGeneratorInputValue, scrollToGenerator }) => {
  const { toast } = useToast();
  const [promptIndex, setPromptIndex] = React.useState(0);

  const prompts = [
    "a memory from childhood",
    "the feeling of nostalgia",
    "the stars on a clear night",
    "a hidden path",
    "the sound of rain",
    "a forgotten dream",
    "the changing seasons",
    "a quiet moment of reflection",
  ];

  const handleFeelingStuck = () => {
    const nextPromptIndex = (promptIndex + 1) % prompts.length;
    setPromptIndex(nextPromptIndex);
    const selectedPrompt = prompts[nextPromptIndex];
    toast({
      title: "New Prompt!",
      description: `Try writing about: "${selectedPrompt}"`,
      duration: 7000,
    });
    setGeneratorInputValue(selectedPrompt);
    scrollToGenerator();
  };

  const handleViewPoemIdea = (title: string) => {
    setGeneratorInputValue(title);
    scrollToGenerator();
    toast({
      title: "Idea Loaded!",
      description: `"${title}" has been added to the generator. Try generating a poem!`,
    });
  };

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Sparkles className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="font-headline text-4xl md:text-5xl mb-4">Trending Poem Ideas</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get inspired by these popular themes and verses. Click to try them in the generator!
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
              onViewPoem={() => handleViewPoemIdea(poem.title)}
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
