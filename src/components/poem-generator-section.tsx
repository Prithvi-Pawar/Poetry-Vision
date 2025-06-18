
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2, Palette } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { generatePoemFromText, type GeneratePoemFromTextInput } from '@/ai/flows/generate-poem-from-text';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PoemGeneratorSectionProps {
  id: string;
  onPoemGenerated: (poem: string, topic: string) => void;
  setSelectedTheme: (theme: string) => void;
  currentPoem: string | null;
  initialTopic: string;
  setInitialTopic: (topic: string) => void;
}

const themes = [
  { value: "theme-soft-gradient-pastels", label: "🌅 Soft Gradient Pastels" },
  { value: "theme-vintage-parchment", label: "📜 Vintage Parchment" },
  { value: "theme-monochrome-dark", label: "🌑 Monochrome Dark" },
  { value: "theme-blurred-nature", label: "🌿 Blurred Nature" },
  { value: "theme-minimalist-abstract", label: "🌀 Minimalist Abstract" },
  { value: "theme-aesthetic-collage", label: "✂️ Aesthetic Collage" },
  { value: "theme-glassmorphism-glow", label: "✨ Glassmorphism Glow" },
];

const PoemGeneratorSection: React.FC<PoemGeneratorSectionProps> = ({ id, onPoemGenerated, setSelectedTheme, currentPoem, initialTopic, setInitialTopic }) => {
  const [topic, setTopic] = useState(initialTopic || '');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (initialTopic) {
      setTopic(initialTopic);
    }
  }, [initialTopic]);

  const handleGeneratePoem = async () => {
    if (!topic.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a word, emotion, or topic.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      const input: GeneratePoemFromTextInput = { text: topic };
      const result = await generatePoemFromText(input);
      onPoemGenerated(result.poem, topic);
      toast({
        title: "Poem Generated!",
        description: "Your masterpiece is ready.",
      });
    } catch (error) {
      console.error("Error generating poem:", error);
      toast({
        title: "Generation Failed",
        description: "Could not generate poem. Please try again.",
        variant: "destructive",
      });
      onPoemGenerated("", topic);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id={id} className="w-full py-16 md:py-24 bg-background/70 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <Card className="max-w-3xl mx-auto shadow-xl">
          <CardHeader className="text-center">
            <Wand2 className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="font-headline text-4xl">Craft Your Poem</CardTitle>
            <CardDescription className="text-lg">
              Enter a word, emotion, or topic to inspire your AI-generated poem.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="topic-input" className="font-medium text-foreground/80">
                Inspiration (Word, Emotion, Topic)
              </label>
              <Input
                id="topic-input"
                type="text"
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                  if (initialTopic && e.target.value !== initialTopic) {
                    setInitialTopic('');
                  }
                }}
                placeholder="e.g., Solitude, Joy, Autumn Forest"
                className="text-base"
                aria-label="Poem inspiration input"
              />
            </div>
            <Button
              onClick={handleGeneratePoem}
              disabled={isLoading}
              className="w-full font-headline text-lg btn-pulse bg-primary hover:bg-primary/90"
              aria-live="polite"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-5 w-5" />
                  Generate Poem
                </>
              )}
            </Button>

            {currentPoem && (
              <div className="space-y-4 pt-6 fade-in">
                <h3 className="font-headline text-2xl text-center text-primary">Your Generated Poem</h3>
                <Textarea
                  value={currentPoem}
                  readOnly
                  rows={10}
                  className="bg-muted/30 border-primary/30 focus:ring-primary text-base leading-relaxed"
                  aria-label="Generated poem text"
                />
                <div className="space-y-2">
                  <label htmlFor="theme-select" className="font-medium text-foreground/80 flex items-center">
                     <Palette className="mr-2 h-5 w-5 text-accent"/> Image Theme
                  </label>
                  <Select onValueChange={setSelectedTheme} defaultValue="theme-soft-gradient-pastels">
                    <SelectTrigger id="theme-select" className="w-full" aria-label="Select image theme">
                      <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent>
                      {themes.map(theme => (
                        <SelectItem key={theme.value} value={theme.value}>{theme.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PoemGeneratorSection;
