"use client";

import type React from 'react';
import { useState, useEffect } from 'react';
import HeroSection from '@/components/hero-section';
import PoemGeneratorSection from '@/components/poem-generator-section';
import InstagramPreviewSection from '@/components/instagram-preview-section';
import TrendingPoemsSection from '@/components/trending-poems-section';
import FooterSection from '@/components/footer-section';

export default function Home() {
  const [generatedPoem, setGeneratedPoem] = useState<string | null>(null);
  const [poemTopic, setPoemTopic] = useState<string | null>(null);
  
  // Instagram Preview State
  const [selectedTheme, setSelectedTheme] = useState<string>("theme-default"); // e.g., 'theme-sunset', 'theme-minimalist'
  const [selectedFont, setSelectedFont] = useState<string>("font-body"); // Tailwind font class
  const [selectedTextColor, setSelectedTextColor] = useState<string>("#000000"); // Hex color

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
  
  // Effect to handle theme affecting text color for preview
  useEffect(() => {
    if (selectedTheme === 'theme-sunset' || selectedTheme === 'theme-dark') {
      if(selectedTextColor === "#000000" || selectedTextColor === "#333333") setSelectedTextColor("#FFFFFF");
    } else if (selectedTheme === 'theme-minimalist' || selectedTheme === 'theme-floral' || selectedTheme === 'theme-default') {
       if(selectedTextColor === "#FFFFFF") setSelectedTextColor("#000000");
    }
  }, [selectedTheme, selectedTextColor]);


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
