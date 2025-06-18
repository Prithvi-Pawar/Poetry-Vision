
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Smartphone, Type as TypeIcon, Palette as PaletteIcon, Crop as AspectRatioIcon, Loader2, Languages, User as UserIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { generatePoemImage } from '@/ai/flows/generate-poem-image-flow';
import { translateText } from '@/ai/flows/translate-text-flow';

interface InstagramPreviewSectionProps {
  poem: string | null;
  poemTopic: string | null;
  selectedTheme: string;
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  selectedTextColor: string;
  setSelectedTextColor: (color: string) => void;
  selectedAspectRatio: string;
  setSelectedAspectRatio: (ratio: string) => void;
  authorName: string;
  setAuthorName: (name: string) => void;
}

const fontOptions = [
  { value: "font-body", label: "Alegreya (Serif)" },
  { value: "font-headline", label: "Belleza (Sans-Serif)" },
  { value: "font-code", label: "Courier Prime (Monospace)" },
  { value: "font-playfair", label: "Playfair Display (Serif)" },
  { value: "font-lato", label: "Lato (Sans-Serif)" },
  { value: "font-dancing", label: "Dancing Script (Script)" },
  { value: "font-roboto-slab", label: "Roboto Slab (Serif)" },
  { value: "font-open-sans", label: "Open Sans (Sans-Serif)" },
  { value: "font-merriweather", label: "Merriweather (Serif)" },
  { value: "font-montserrat", label: "Montserrat (Sans-Serif)" },
  { value: "font-pacifico", label: "Pacifico (Script)" },
  { value: "font-lobster", label: "Lobster (Script)" },
  { value: "font-caveat", label: "Caveat (Handwriting)" },
  { value: "font-indie-flower", label: "Indie Flower (Handwriting)" },
  { value: "font-bebas-neue", label: "Bebas Neue (Display)" },
  { value: "font-oswald", label: "Oswald (Sans-Serif)" },
  { value: "font-raleway", label: "Raleway (Sans-Serif)" },
  { value: "font-ubuntu", label: "Ubuntu (Sans-Serif)" },
  { value: "font-quicksand", label: "Quicksand (Sans-Serif)" },
  { value: "font-josefin-sans", label: "Josefin Sans (Sans-Serif)" },
  { value: "font-crimson-text", label: "Crimson Text (Serif)" },
  { value: "font-arvo", label: "Arvo (Serif)" },
  { value: "font-poppins", label: "Poppins (Sans-Serif)" },
  { value: "font-nunito", label: "Nunito (Sans-Serif)" },
  { value: "font-shadows-into-light", label: "Shadows Into Light (Handwriting)" },
  { value: "font-amatic-sc", label: "Amatic SC (Handwriting)" },
];

const colorOptions = [
  { value: "#FFFFFF", label: "White" },
  { value: "#000000", label: "Black" },
  { value: "#333333", label: "Dark Grey" },
  { value: "#A098D3", label: "Primary Purple" },
  { value: "#D398A0", label: "Accent Pink" },
  { value: "#0D47A1", label: "Deep Blue" },
  { value: "#2E7D32", label: "Forest Green" },
  { value: "#F57C00", label: "Warm Orange" },
  { value: "#D4AF37", label: "Soft Gold" },
  { value: "#36454F", label: "Charcoal" },
  { value: "#5D4037", label: "Sepia Brown" },
  { value: "#E0F7FA", label: "Light Cyan" },
  { value: "#E1BEE7", label: "Light Lavender" },
  { value: "#4E342E", label: "Dark Brown" },
  { value: "#8B4561", label: "Dark Pink/Maroon" },
  { value: "#F0F8FF", label: "AliceBlue" },
  { value: "#000080", label: "Navy" },
  { value: "#1A1A1A", label: "Very Dark Gray" },
  { value: "#5C5470", label: "Dark Lavender Grey" },
  { value: "#3A4F7A", label: "Dark Desaturated Blue" },
  { value: "#FFF8DC", label: "Cornsilk" },
  { value: "#00008B", label: "DarkBlue" },
  { value: "#2F4F4F", label: "DarkSlateGray" },
  { value: "#EAEAEA", label: "Light Grey" },
  { value: "#F5F5DC", label: "Beige" },
];

const aspectRatioOptions = [
  { value: "original-fit", label: "Fit Text (Variable Height)" },
  { value: "4:5", label: "4:5 (Portrait)" },
];

const languageOptions = [
    { value: "Arabic", label: "Arabic (العربية)" },
    { value: "Chinese (Simplified)", label: "Chinese (简体中文)" },
    { value: "English", label: "English" },
    { value: "French", label: "French (Français)" },
    { value: "German", label: "German (Deutsch)" },
    { value: "Hindi", label: "Hindi (हिन्दी)" },
    { value: "Japanese", label: "Japanese (日本語)" },
    { value: "Marathi", label: "Marathi (मराठी)" },
    { value: "Portuguese", label: "Portuguese (Português)" },
    { value: "Russian", label: "Russian (Русский)" },
    { value: "Sanskrit", label: "Sanskrit (संस्कृतम्)" },
    { value: "Spanish", label: "Spanish (Español)" },
].sort((a, b) => a.label.localeCompare(b.label));


// Mappings for LLM prompt
const themeDescriptions: Record<string, string> = {
  'theme-soft-gradient-pastels': "A smooth, horizontal or diagonal gradient transition between light, soothing pastel colors like lavender, baby pink, peach, mint, or pale blue. Creates a dreamy, calm atmosphere. data-ai-hint: pastel gradient",
  'theme-vintage-parchment': "A textured background mimicking old, slightly yellowed parchment paper, possibly with faint lines or a vintage feel. Torn edges or coffee stain effects are optional if the AI can render them subtly. data-ai-hint: parchment texture",
  'theme-monochrome-dark': "A solid, very dark background (e.g., jet black, deep navy, or graphite grey) with light-colored text (e.g., white, beige, or soft gold) for a dramatic, high-contrast, elegant look. data-ai-hint: dark elegant",
  'theme-blurred-nature': "A nature scene (forest, ocean, sunset, flowers) as a background, with a soft blur effect applied so the text remains the focus. The nature imagery should set a peaceful, serene, or spiritual mood. data-ai-hint: nature blur",
  'theme-minimalist-abstract': "A clean, minimalist background with subtle abstract shapes, light lines, or soft brush strokes, typically using a neutral color palette. The design should feel modern and artistic, keeping the text as the primary focus. data-ai-hint: abstract minimal",
  'theme-aesthetic-collage': "A scrapbook-inspired theme featuring elements like torn paper, doodles, tape graphics, or polaroid frames. It should feel youthful, expressive, and handmade. data-ai-hint: scrapbook collage",
  'theme-glassmorphism-glow': "A modern UI-inspired theme. The poem text appears on a translucent, frosted-glass-style panel. The background behind the panel is often a blurred image or a soft gradient with a subtle glow. The look should be sleek and futuristic. data-ai-hint: glassmorphism abstract",
};

const fontDescriptions: Record<string, string> = {
  "font-body": "a classic, readable serif font like Alegreya",
  "font-headline": "a clean, modern sans-serif font like Belleza",
  "font-code": "a typewriter-style monospace font like Courier Prime",
  "font-playfair": "an elegant and slightly formal serif font like Playfair Display",
  "font-lato": "a clear and friendly sans-serif font like Lato",
  "font-dancing": "a flowing, cursive script font like Dancing Script",
  "font-roboto-slab": "a sturdy and readable slab serif font like Roboto Slab",
  "font-open-sans": "a highly legible and neutral sans-serif font like Open Sans",
  "font-merriweather": "a traditional and easy-to-read serif font like Merriweather",
  "font-montserrat": "a geometric and versatile sans-serif font like Montserrat",
  "font-pacifico": "a fun, brush script font like Pacifico",
  "font-lobster": "a bold, retro script font like Lobster",
  "font-caveat": "a friendly, handwritten cursive font like Caveat",
  "font-indie-flower": "a playful, handwritten font like Indie Flower",
  "font-bebas-neue": "a condensed, impactful display sans-serif font like Bebas Neue",
  "font-oswald": "a narrow, condensed sans-serif font like Oswald, good for headlines",
  "font-raleway": "an elegant and thin sans-serif font like Raleway",
  "font-ubuntu": "a modern, humanist sans-serif font like Ubuntu",
  "font-quicksand": "a rounded and friendly sans-serif font like Quicksand",
  "font-josefin-sans": "a vintage-inspired geometric sans-serif font like Josefin Sans",
  "font-crimson-text": "a classic, old-style serif font like Crimson Text",
  "font-arvo": "a geometric slab-serif font like Arvo",
  "font-poppins": "a geometric sans-serif font like Poppins, very versatile",
  "font-nunito": "a well-balanced, rounded sans-serif font like Nunito",
  "font-shadows-into-light": "a neat, flowing handwritten script like Shadows Into Light",
  "font-amatic-sc": "a quirky, narrow handwritten font like Amatic SC",
};


const InstagramPreviewSection: React.FC<InstagramPreviewSectionProps> = ({
  poem,
  poemTopic,
  selectedTheme,
  selectedFont,
  setSelectedFont,
  selectedTextColor,
  setSelectedTextColor,
  selectedAspectRatio,
  setSelectedAspectRatio,
  authorName,
  setAuthorName,
}) => {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [currentDisplayedPoem, setCurrentDisplayedPoem] = useState<string | null>(poem);
  const [targetLanguage, setTargetLanguage] = useState<string>("Spanish");

  useEffect(() => {
    setCurrentDisplayedPoem(poem);
  }, [poem]);

  const handleDownloadImage = async () => {
    if (!currentDisplayedPoem) {
      toast({
        title: "No Poem to Download",
        description: "Please generate a poem first.",
        variant: "destructive",
      });
      return;
    }
    setIsDownloading(true);
    toast({
      title: "Generating Image...",
      description: "Your poetic image is being crafted. This may take a moment.",
    });

    const themeDescription = themeDescriptions[selectedTheme] || 'a neutral background with legible text';
    const fontDescription = fontDescriptions[selectedFont] || 'a standard readable font';

    let aspectRatioForAI: string;
    if (selectedAspectRatio === "original-fit") {
      aspectRatioForAI = "dynamic, prioritize fitting all poem text legibly without compression. Image canvas should expand as needed, prefer portrait for long poems, otherwise square.";
    } else if (selectedAspectRatio === "4:5") {
      aspectRatioForAI = "4:5 portrait aspect ratio";
    } else {
      aspectRatioForAI = "1:1 square aspect ratio"; 
    }

    try {
      const result = await generatePoemImage({
        poemText: currentDisplayedPoem,
        poemTopic: poemTopic || "Untitled Poem",
        theme: themeDescription,
        fontFamily: fontDescription,
        textColorHex: selectedTextColor,
        aspectRatio: aspectRatioForAI,
        authorName: authorName.trim() || undefined,
      });

      if (result.imageDataUri) {
        const link = document.createElement('a');
        link.href = result.imageDataUri;
        link.download = `verse_vision_${poemTopic?.replace(/\s+/g, '_') || 'poem'}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast({
          title: "Image Downloaded!",
          description: "Your poem image has been saved.",
        });
      } else {
        throw new Error("Image data URI not found in response.");
      }
    } catch (error) {
      console.error("Error generating or downloading image:", error);
      toast({
        title: "Download Failed",
        description: "Could not generate or download the image. The AI might be busy or the request too complex. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleTranslatePoem = async () => {
    if (!poem) { 
      toast({
        title: "No Poem to Translate",
        description: "Please generate a poem first.",
        variant: "destructive",
      });
      return;
    }
    setIsTranslating(true);
    toast({
      title: `Translating to ${targetLanguage}...`,
      description: "This may take a moment.",
    });
    try {
      const result = await translateText({ textToTranslate: poem, targetLanguage });
      setCurrentDisplayedPoem(result.translatedText);
      toast({
        title: "Poem Translated!",
        description: `Your poem has been translated to ${targetLanguage}.`,
      });
    } catch (error) {
      console.error("Error translating poem:", error);
      toast({
        title: "Translation Failed",
        description: "Could not translate the poem. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTranslating(false);
    }
  };


  let displayPoemText = currentDisplayedPoem || "Your beautiful poem will appear here once generated.\n\nTry different themes and styles!";
  const displayTopic = poemTopic || "Verse Vision";
  
  const poemWithAuthor = authorName.trim() 
    ? `${displayPoemText}\n\n— ${authorName.trim()}` 
    : displayPoemText;


  const previewBaseWidth = 280;
  let calculatedHeight: string | number = 'auto';

  if (selectedAspectRatio === "4:5") {
    calculatedHeight = (previewBaseWidth * 5) / 4;
  } else if (selectedAspectRatio === "original-fit") {
     // handled by auto and min/max height in style
  } else { 
    calculatedHeight = previewBaseWidth;
  }


  const previewStyle: React.CSSProperties = {
    color: selectedTextColor,
    width: `${previewBaseWidth}px`,
    height: typeof calculatedHeight === 'number' ? `${calculatedHeight}px` : calculatedHeight,
    minHeight: selectedAspectRatio === "original-fit" ? `${previewBaseWidth * 0.8}px` : (previewBaseWidth * 1),
    maxHeight: selectedAspectRatio === "original-fit" ? `${previewBaseWidth * 2.5}px` : undefined, 
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden', 
  };


  return (
    <section className="w-full py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <Card className="max-w-4xl mx-auto shadow-xl">
          <CardHeader className="text-center">
            <Smartphone className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="font-headline text-4xl">Image Preview</CardTitle>
            <CardDescription className="text-lg">
              Customize how your poem will look. Get ready to share!
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div>
                <label htmlFor="author-name-input" className="font-medium text-foreground/80 mb-1 block flex items-center">
                  <UserIcon className="mr-2 h-5 w-5 text-accent"/> Author Name (Optional)
                </label>
                <Input
                  id="author-name-input"
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g., Your Name, Anonymous"
                  className="text-base"
                  aria-label="Author name input"
                />
              </div>
              <div>
                <label htmlFor="font-select" className="font-medium text-foreground/80 mb-1 block flex items-center">
                  <TypeIcon className="mr-2 h-5 w-5 text-accent"/> Font Style
                </label>
                <Select value={selectedFont} onValueChange={setSelectedFont}>
                  <SelectTrigger id="font-select" aria-label="Select font style">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map(font => (
                      <SelectItem key={font.value} value={font.value} className={font.value} style={{fontFamily: font.label.split('(')[0].trim() === 'Alegreya' ? undefined : font.label.split('(')[0].trim() }}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="color-select" className="font-medium text-foreground/80 mb-1 block flex items-center">
                  <PaletteIcon className="mr-2 h-5 w-5 text-accent"/> Text Color
                </label>
                <Select value={selectedTextColor} onValueChange={setSelectedTextColor}>
                  <SelectTrigger id="color-select" aria-label="Select text color">
                     <div className="flex items-center">
                       <span className="w-4 h-4 rounded-full mr-2 border border-border" style={{backgroundColor: selectedTextColor}}></span>
                       {colorOptions.find(c => c.value === selectedTextColor)?.label || selectedTextColor}
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map(color => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center">
                           <span className="w-4 h-4 rounded-full mr-2 border border-border" style={{backgroundColor: color.value}}></span>
                           {color.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="aspect-ratio-select" className="font-medium text-foreground/80 mb-1 block flex items-center">
                  <AspectRatioIcon className="mr-2 h-5 w-5 text-accent"/> Aspect Ratio
                </label>
                <Select value={selectedAspectRatio} onValueChange={setSelectedAspectRatio}>
                  <SelectTrigger id="aspect-ratio-select" aria-label="Select aspect ratio">
                    <SelectValue placeholder="Select aspect ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    {aspectRatioOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleDownloadImage} disabled={isDownloading || isTranslating} className="w-full font-headline text-lg bg-accent hover:bg-accent/90">
                {isDownloading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
                    Download as Image
                  </>
                )}
              </Button>
              <div className="flex items-center space-x-2">
                <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                    <SelectTrigger id="language-select" aria-label="Select target language for translation" className="flex-grow">
                        <SelectValue placeholder="Translate to..." />
                    </SelectTrigger>
                    <SelectContent>
                        {languageOptions.map(lang => (
                            <SelectItem key={lang.value} value={lang.value}>
                                {lang.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button onClick={handleTranslatePoem} disabled={isTranslating || isDownloading || !poem} variant="outline" className="shrink-0">
                    {isTranslating ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Translating
                    </>
                    ) : (
                    <>
                        <Languages className="mr-2 h-4 w-4" />
                        Translate
                    </>
                    )}
                </Button>
              </div>
            </div>

            <div className="mt-8 md:mt-0 flex justify-center items-center p-4 bg-muted/20 rounded-lg">
              <div
                className={`poem-preview-area ${selectedTheme} ${selectedFont} shadow-xl`}
                style={previewStyle}
              >
                {selectedTheme === 'theme-glassmorphism-glow' ? (
                  <div>
                    <div className="text-xs opacity-70 break-words self-start w-full p-1 shrink-0">{displayTopic}</div>
                    <div className="text-sm leading-relaxed break-words self-start w-full flex-grow overflow-y-auto min-h-0 p-1">
                      {poemWithAuthor.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-xs opacity-70 break-words self-start w-full p-1 shrink-0">{displayTopic}</div>
                    <div className="text-sm leading-relaxed break-words self-start w-full flex-grow overflow-y-auto min-h-0 p-1">
                      {poemWithAuthor.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default InstagramPreviewSection;
