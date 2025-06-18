
"use client";

import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/hero-section';
import PoemGeneratorSection from '@/components/poem-generator-section';
import InstagramPreviewSection from '@/components/instagram-preview-section';
import TextSuggestionsSection from '@/components/text-suggestions-section';
import FooterSection from '@/components/footer-section';

export default function Home() {
  const [generatedPoem, setGeneratedPoem] = useState<string | null>(null);
  const [poemTopic, setPoemTopic] = useState<string | null>(null);
  const [generatorInputValue, setGeneratorInputValue] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('');

  // Image Preview State
  const [selectedTheme, setSelectedTheme] = useState<string>("theme-soft-gradient-pastels");
  const [selectedFont, setSelectedFont] = useState<string>("font-body");
  const [selectedTextColor, setSelectedTextColor] = useState<string>("#4A4A4A"); // Default for soft gradient
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>("original-fit");

  const handlePoemGenerated = (poem: string, topic: string) => {
    setGeneratedPoem(poem);
    setPoemTopic(topic);
  };

  const scrollToGenerator = () => {
    const generatorSection = document.getElementById('poem-generator');
    if (generatorSection) {
      generatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const themeDefaultTextColors: Record<string, string> = {
      'theme-soft-gradient-pastels': '#4A4A4A',
      'theme-vintage-parchment': '#5D4037',
      'theme-monochrome-dark': '#FAFAFA',
      'theme-blurred-nature': '#FFFFFF',
      'theme-minimalist-abstract': '#333333',
      'theme-aesthetic-collage': '#4B4254',
      'theme-glassmorphism-glow': '#F0F0F0',
    };

    if (themeDefaultTextColors[selectedTheme]) {
      setSelectedTextColor(themeDefaultTextColors[selectedTheme]);
    } else {
      setSelectedTextColor("#333333"); // Fallback
    }
  }, [selectedTheme]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <HeroSection scrollToGenerator={scrollToGenerator} />

      <PoemGeneratorSection
        id="poem-generator"
        onPoemGenerated={handlePoemGenerated}
        setSelectedTheme={setSelectedTheme}
        currentPoem={generatedPoem}
        initialTopic={generatorInputValue}
        setInitialTopic={setGeneratorInputValue}
      />

      {(generatedPoem || poemTopic) && (
         <InstagramPreviewSection
          poem={generatedPoem}
          poemTopic={poemTopic || "Verse Vision Poem"}
          selectedTheme={selectedTheme}
          selectedFont={selectedFont}
          setSelectedFont={setSelectedFont}
          selectedTextColor={selectedTextColor}
          setSelectedTextColor={setSelectedTextColor}
          selectedAspectRatio={selectedAspectRatio}
          setSelectedAspectRatio={setSelectedAspectRatio}
          authorName={authorName}
          setAuthorName={setAuthorName}
        />
      )}

      <TextSuggestionsSection
        setGeneratorInputValue={setGeneratorInputValue}
        scrollToGenerator={scrollToGenerator}
      />

      <FooterSection />
    </div>
  );
}
