
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, HelpCircle, ChevronRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const textSuggestions = [
  "The last sunset I saw",
  "A forgotten childhood toy",
  "The sound of rain on a windowpane",
  "A dream I can't quite remember",
  "The quiet of a library",
  "The bustling energy of a city street",
  "A blooming flower in spring",
  "The crisp air of autumn",
  "The warmth of a summer day",
  "The silence of a winter night",
  "A journey to a faraway land",
  "The comfort of a familiar place",
  "A secret whispered between friends",
  "The courage to face a fear",
  "A moment of pure joy",
  "The echo of an old song",
  "Stars in a midnight sky",
  "A cup of coffee on a cold morning"
];

const feelingStuckPrompts = [
  "Describe the color blue without using the word 'blue'.",
  "Write about a time you felt invisible.",
  "Imagine a conversation between the sun and the moon.",
  "What does hope taste like?",
  "A secret kept for too long.",
  "The world from a bird's perspective.",
  "The feeling of sand between your toes.",
  "A flickering candle in a dark room.",
  "The smell of old books.",
  "A path not taken.",
  "The wisdom of an ancient tree.",
  "A child's laughter.",
  "The weight of a promise.",
  "Dancing in the rain.",
  "The magic of a first snow.",
  "A quiet moment of gratitude.",
  "The rhythm of the ocean waves.",
  "A single falling leaf.",
  "The taste of a favorite childhood candy.",
  "The comfort of a pet.",
  "An unexpected encounter.",
  "The view from a mountaintop.",
  "A memory that always makes you smile.",
  "The feeling of homesickness.",
  "A letter to your younger self.",
  "The silence after a storm.",
  "A bustling marketplace in a foreign land.",
  "The oldest object in your home.",
  "A dream you had last night.",
  "The beauty of imperfection.",
  "A conversation with an animal.",
  "The last time you felt truly free.",
  "A city waking up.",
  "The kindness of a stranger.",
  "A song that moves you to tears.",
  "The patterns in the clouds.",
  "A favorite family tradition.",
  "The feeling of accomplishment.",
  "A walk in the woods.",
  "The quiet hum of a refrigerator.",
  "An unsolved mystery.",
  "The stars on a clear night.",
  "A hidden path.",
  "The sound of rain.",
  "A forgotten dream.",
  "The changing seasons.",
  "A quiet moment of reflection.",
  "The first cup of coffee in the morning.",
  "A window looking out onto a busy street.",
  "The feeling of anticipation.",
  "A childhood hiding spot.",
  "The smell of freshly baked bread.",
  "A road trip with no destination.",
  "The oldest tree you've ever seen.",
  "A conversation overheard.",
  "The feeling of déjà vu.",
  "A moment you wish you could relive.",
  "The comfort of a warm blanket.",
  "A book that changed your perspective.",
  "The last time you laughed until you cried.",
  "The quiet before dawn.",
  "A shadow dancing on the wall.",
  "The strength of a spider's web.",
  "A memory of your grandparents.",
  "The excitement of a new beginning.",
  "A forgotten photograph.",
  "The taste of saltwater.",
  "A crack in the pavement where a flower grows.",
  "The feeling of being lost.",
  "A wish made on a falling star.",
  "The warmth of a fireplace.",
  "A bird singing outside your window.",
  "The story behind a scar.",
  "A moment of unexpected beauty.",
  "The peace of a sleeping child.",
  "A melody stuck in your head.",
  "The hustle and bustle of a train station.",
  "A letter you never sent.",
  "The comfort of an old sweater.",
  "A place where you feel most like yourself.",
  "The colors of a sunrise.",
  "A time you were brave.",
  "The sound of distant music.",
  "A reflection in a puddle.",
  "The joy of a simple pleasure.",
  "A field of wildflowers.",
  "The feeling of letting go.",
  "A memory of the sea.",
  "The silence of an empty room.",
  "A journey through time.",
  "The wisdom in a child's eyes.",
  "A flickering streetlamp.",
  "The taste of victory.",
  "A secret garden.",
  "The feeling of nostalgia for a place you've never been.",
  "A bridge connecting two worlds.",
  "The rustling of leaves in the wind.",
  "A single raindrop.",
  "The comfort of a shared silence.",
  "A dream of flying.",
  "The resilience of nature.",
  "A story told by the stars."
];


interface TextSuggestionsSectionProps {
  setGeneratorInputValue: (value: string) => void;
  scrollToGenerator: () => void;
}

const TextSuggestionsSection: React.FC<TextSuggestionsSectionProps> = ({ setGeneratorInputValue, scrollToGenerator }) => {
  const { toast } = useToast();
  const [promptIndex, setPromptIndex] = React.useState(0);

  const handleFeelingStuck = () => {
    const nextPromptIndex = (promptIndex + 1) % feelingStuckPrompts.length;
    setPromptIndex(nextPromptIndex);
    const selectedPrompt = feelingStuckPrompts[nextPromptIndex];
    toast({
      title: "New Prompt!",
      description: `Try writing about: "${selectedPrompt}"`,
      duration: 7000,
    });
    setGeneratorInputValue(selectedPrompt);
    scrollToGenerator();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setGeneratorInputValue(suggestion);
    scrollToGenerator();
    toast({
      title: "Suggestion Loaded!",
      description: `"${suggestion}" has been added to the generator. Try creating a poem!`,
    });
  };

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <Lightbulb className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="font-headline text-4xl md:text-5xl mb-2">Poem Starters & Ideas</CardTitle>
            <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Need a spark? Try one of these suggestions or get a random prompt.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {textSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start text-left h-auto py-3 px-4 border-primary/50 hover:bg-primary/10 hover:border-primary group"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span className="flex-grow text-primary group-hover:text-primary-foreground">{suggestion}</span>
                  <ChevronRight className="h-5 w-5 text-primary/70 group-hover:text-primary-foreground transition-transform group-hover:translate-x-1" />
                </Button>
              ))}
            </div>
            <div className="text-center">
              <Button variant="outline" size="lg" onClick={handleFeelingStuck} className="font-headline text-lg border-accent text-accent hover:bg-accent/10">
                <HelpCircle className="mr-2 h-5 w-5" />
                Feeling Stuck? Get a Prompt!
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TextSuggestionsSection;
