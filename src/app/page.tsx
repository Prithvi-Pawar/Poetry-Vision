
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

  // Instagram Preview State
  const [selectedTheme, setSelectedTheme] = useState<string>("theme-default");
  const [selectedFont, setSelectedFont] = useState<string>("font-body"); // Default to Alegreya
  const [selectedTextColor, setSelectedTextColor] = useState<string>("#333333"); 
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
      'theme-default': '#333333', // Dark grey for default light theme
      'theme-sunset': '#FFFFFF', // White for sunset
      'theme-minimalist': '#333333', // Dark grey for minimalist light
      'theme-dark': '#FAFAFA', // Light grey/white for dark theme
      'theme-floral': '#2F2F2F', // Dark text for light floral
      'theme-vintage-paper': '#5D4037', // Dark sepia for vintage paper
      'theme-oceanic-calm': '#E0F7FA', // Light cyan for oceanic
      'theme-galaxy-dream': '#E1BEE7', // Light lavender for galaxy
      'theme-forest-mist': '#E8F5E9', // Light green for forest mist
      'theme-desert-dusk': '#4E342E', // Dark brown for desert dusk
      'theme-mountain-peak': '#FFFFFF', // White for mountain peak
      'theme-cherry-blossom': '#8B4561', // Dark Pink/Maroon for cherry blossom
      'theme-aurora-borealis': '#FFFFFF', // White for aurora
      'theme-starry-night': '#F0F8FF', // AliceBlue for starry night
      'theme-tropical-beach': '#000080', // Navy for tropical beach
      'theme-urban-grit': '#1A1A1A', // Very dark gray for urban grit
      'theme-pastel-dream': '#5C5470', // Dark lavender grey for pastel
      'theme-monochrome-lines': '#212121', // Dark grey for monochrome lines
      'theme-watercolor-splash': '#3A4F7A', // Dark desaturated blue for watercolor
      'theme-geometric-patterns': '#444444', // Dark grey for geometric
      'theme-autumn-leaves': '#FFF8DC', // Cornsilk for autumn leaves
      'theme-winter-frost': '#00008B', // DarkBlue for winter frost
      'theme-spring-meadow': '#2F4F4F', // DarkSlateGray for spring meadow
      'theme-cosmic-dust': '#EAEAEA', // Light grey for cosmic dust
      'theme-marble-elegance': '#3E3E3E', // Dark grey for marble
      'theme-woodgrain-rustic': '#F5F5DC', // Beige for woodgrain
      'theme-retro-vibes': '#333333', // Dark grey for retro
      'theme-gothic-romance': '#D1C4E9', // Light purple for gothic
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
