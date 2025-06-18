
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Smartphone, Type as TypeIcon, Palette as PaletteIcon, Crop as AspectRatioIcon, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { generatePoemImage } from '@/ai/flows/generate-poem-image-flow';

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
}

const fontOptions = [
  { value: "font-body", label: "Alegreya (Serif)" },
  { value: "font-headline", label: "Belleza (Sans-Serif)" },
  { value: "font-code", label: "Courier Prime (Monospace)" },
  { value: "font-playfair", label: "Playfair Display (Serif)" },
  { value: "font-lato", label: "Lato (Sans-Serif)" },
  { value: "font-dancing", label: "Dancing Script (Script)" },
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
];

const aspectRatioOptions = [
  { value: "original-fit", label: "Fit Text (Variable Height)" },
  { value: "4:5", label: "4:5 (Portrait)" },
];

// Mappings for LLM prompt
const themeDescriptions: Record<string, string> = {
  'theme-default': 'a clean, default light background with high contrast text',
  'theme-sunset': 'a vibrant sunset with warm oranges, yellows, and reds, text color should be contrasting (e.g., white or very dark)',
  'theme-minimalist': 'a minimalist, clean light grey or white background with dark, crisp text',
  'theme-dark': 'a dark, elegant background (e.g., deep space, night sky, or dark charcoal) with light-colored, legible text',
  'theme-floral': 'a background with a subtle and elegant floral pattern, ensure text is clearly readable over it',
  'theme-vintage-paper': 'a textured vintage paper or parchment background, text should look like ink on old paper',
  'theme-oceanic-calm': 'a calm oceanic scene with blues, teals, and sandy tones, text should evoke serenity, possibly light colored',
  'theme-galaxy-dream': 'a dreamy galaxy or nebula background with purples, deep blues, and star-like speckles, text should be light and ethereal',
};

const fontDescriptions: Record<string, string> = {
  "font-body": "a classic, readable serif font like Alegreya",
  "font-headline": "a clean, modern sans-serif font like Belleza",
  "font-code": "a typewriter-style monospace font like Courier Prime",
  "font-playfair": "an elegant and slightly formal serif font like Playfair Display",
  "font-lato": "a clear and friendly sans-serif font like Lato",
  "font-dancing": "a flowing, cursive script font like Dancing Script",
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
}) => {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadImage = async () => {
    if (!poem) {
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
      aspectRatioForAI = "1:1 square aspect ratio"; // Fallback, though UI should prevent this
    }

    try {
      const result = await generatePoemImage({
        poemText: poem,
        poemTopic: poemTopic || "Untitled Poem",
        theme: themeDescription,
        fontFamily: fontDescription,
        textColorHex: selectedTextColor,
        aspectRatio: aspectRatioForAI,
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

  const displayPoem = poem || "Your beautiful poem will appear here once generated.\n\nTry different themes and styles!";
  const displayTopic = poemTopic || "Verse Vision";

  const previewBaseWidth = 280; // pixels
  let calculatedHeight: string | number = 'auto';

  if (selectedAspectRatio === "4:5") {
    calculatedHeight = (previewBaseWidth * 5) / 4;
  }

  const previewStyle: React.CSSProperties = {
    color: selectedTextColor,
    width: `${previewBaseWidth}px`,
    height: typeof calculatedHeight === 'number' ? `${calculatedHeight}px` : calculatedHeight,
    minHeight: selectedAspectRatio === "original-fit" ? `${previewBaseWidth}px` : undefined,
    maxHeight: selectedAspectRatio === "original-fit" ? `${previewBaseWidth * 1.8}px` : undefined,
    display: 'flex',
    flexDirection: 'column',
  };


  return (
    <section className="w-full py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <Card className="max-w-4xl mx-auto shadow-xl">
          <CardHeader className="text-center">
            <Smartphone className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="font-headline text-4xl">Instagram Preview</CardTitle>
            <CardDescription className="text-lg">
              Customize how your poem will look. Get ready to share!
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
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
                      <SelectItem key={font.value} value={font.value} style={{fontFamily: font.label.split('(')[0].trim()}}>
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
              <Button onClick={handleDownloadImage} disabled={isDownloading} className="w-full font-headline text-lg bg-accent hover:bg-accent/90">
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
            </div>

            <div className="mt-8 md:mt-0 flex justify-center items-center p-4 bg-muted/20 rounded-lg">
              <div
                className={`poem-preview-area ${selectedTheme} ${selectedFont} shadow-xl`}
                style={previewStyle}
              >
                <div className="text-xs opacity-70 break-words self-start w-full p-1 shrink-0">{displayTopic}</div>
                <div className="text-sm leading-relaxed break-words self-start w-full flex-grow overflow-y-auto min-h-0 p-1">
                  {displayPoem.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default InstagramPreviewSection;
