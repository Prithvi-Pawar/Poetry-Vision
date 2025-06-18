
"use client";

import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/hero-section';
import PoemGeneratorSection from '@/components/poem-generator-section';
import InstagramPreviewSection from '@/components/instagram-preview-section';
import TrendingPoemsSection from '@/components/trending-poems-section';
import FooterSection from '@/components/footer-section';

export default function Home() {
  const [generatedPoem, setGeneratedPoem] = useState<string | null>(null);
  const [poemTopic, setPoemTopic] = useState<string | null>(null);
  const [generatorInputValue, setGeneratorInputValue] = useState<string>('');

  // Instagram Preview State
  const [selectedTheme, setSelectedTheme] = useState<string>("theme-default");
  const [selectedFont, setSelectedFont] = useState<string>("font-body");
  const [selectedTextColor, setSelectedTextColor] = useState<string>("#000000");
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string>("1:1");

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

  // Effect to set a suitable default text color when the theme changes.
  useEffect(() => {
    const themeDefaultTextColors: Record<string, string> = {
      'theme-default': '#333333',
      'theme-sunset': '#FFFFFF',
      'theme-minimalist': '#333333',
      'theme-dark': '#FAFAFA',
      'theme-floral': '#2F2F2F',
      'theme-vintage-paper': '#5D4037',
      'theme-oceanic-calm': '#E0F7FA',
      'theme-galaxy-dream': '#E1BEE7',
    };

    if (themeDefaultTextColors[selectedTheme]) {
      setSelectedTextColor(themeDefaultTextColors[selectedTheme]);
    } else {
      setSelectedTextColor("#000000");
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
        />
      )}

      <TrendingPoemsSection
        setGeneratorInputValue={setGeneratorInputValue}
        scrollToGenerator={scrollToGenerator}
      />

      <FooterSection />
    </div>
  );
}
