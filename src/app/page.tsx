
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
  const [selectedTextColor, setSelectedTextColor] = useState<string>("#4A4A4A");
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>("original-fit");

  const handlePoemGenerated = (poem: string, topic: string) => {
    setGeneratedPoem(poem);
    setPoemTopic(topic || null); // Ensure topic is null if empty string
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
      'theme-celestial-cosmic': '#E0E0E0',
      'theme-modern-grid': '#222222',
      'theme-film-frame': '#3B2F2F',
      'theme-rainy-window': '#FFFFFF',
      'theme-mystic-tarot': '#F0E6FF',
      'theme-y2k-aesthetic': '#FFFFFF',
      'theme-boho-earthy': '#4A3B31',
      'theme-dream-journal': '#FFFFFF',
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

      {(generatedPoem || poemTopic !== null) && (
         <InstagramPreviewSection
          poem={generatedPoem}
          poemTopic={poemTopic}
          setPoemTopic={setPoemTopic}
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
