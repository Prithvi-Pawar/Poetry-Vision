
"use client";

import React, { useState, useEffect } from 'react'; // Ensured React is imported for JSX
import HeroSection from '@/components/hero-section';
import PoemGeneratorSection from '@/components/poem-generator-section';
import InstagramPreviewSection from '@/components/instagram-preview-section';
import TrendingPoemsSection from '@/components/trending-poems-section';
import FooterSection from '@/components/footer-section';

export default function Home() {
  const [generatedPoem, setGeneratedPoem] = useState<string | null>(null);
  const [poemTopic, setPoemTopic] = useState<string | null>(null);
  
  // Instagram Preview State
  const [selectedTheme, setSelectedTheme] = useState<string>("theme-default");
  const [selectedFont, setSelectedFont] = useState<string>("font-body"); 
  const [selectedTextColor, setSelectedTextColor] = useState<string>("#000000");

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
  // The user can then override this with the color picker.
  useEffect(() => {
    const themeDefaultTextColors: Record<string, string> = {
      'theme-default': '#333333', // Default theme (like minimalist)
      'theme-sunset': '#FFFFFF', // Sunset Glow
      'theme-minimalist': '#333333', // Minimalist
      'theme-dark': '#FAFAFA', // Dark Mode
      'theme-floral': '#2F2F2F', // Floral (dark text on assumed light pattern)
      'theme-vintage-paper': '#5D4037', // Vintage Paper (dark sepia)
      'theme-oceanic-calm': '#E0F7FA', // Oceanic Calm (light cyan/white)
      'theme-galaxy-dream': '#E1BEE7', // Galaxy Dream (light lavender)
    };

    if (themeDefaultTextColors[selectedTheme]) {
      setSelectedTextColor(themeDefaultTextColors[selectedTheme]);
    } else {
      // Fallback for unknown themes, or if a theme doesn't have a specific default
      setSelectedTextColor("#000000"); 
    }
  }, [selectedTheme]); // Only re-run when selectedTheme changes


  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <HeroSection scrollToGenerator={scrollToGenerator} />
      
      <PoemGeneratorSection 
        id="poem-generator"
        onPoemGenerated={handlePoemGenerated}
        setSelectedTheme={setSelectedTheme}
        currentPoem={generatedPoem}
      />
      
      {(generatedPoem || poemTopic) && (
         <InstagramPreviewSection
          poem={generatedPoem}
          poemTopic={poemTopic}
          selectedTheme={selectedTheme}
          selectedFont={selectedFont}
          setSelectedFont={setSelectedFont}
          selectedTextColor={selectedTextColor}
          setSelectedTextColor={setSelectedTextColor}
        />
      )}
      
      <TrendingPoemsSection />
      
      <FooterSection />
    </div>
  );
}
