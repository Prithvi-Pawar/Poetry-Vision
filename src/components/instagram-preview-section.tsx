
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Smartphone, Type as TypeIcon, Palette as PaletteIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface InstagramPreviewSectionProps {
  poem: string | null;
  poemTopic: string | null;
  selectedTheme: string;
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  selectedTextColor: string;
  setSelectedTextColor: (color: string) => void;
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
  { value: "#FFFFFF", label: "White", style: { background: '#FFFFFF', color: '#000000'} },
  { value: "#000000", label: "Black", style: { background: '#000000', color: '#FFFFFF'}  },
  { value: "#333333", label: "Dark Grey", style: { background: '#333333', color: '#FFFFFF'}  },
  { value: "#A098D3", label: "Primary Purple", style: { background: '#A098D3', color: '#FFFFFF'}  },
  { value: "#D398A0", label: "Accent Pink", style: { background: '#D398A0', color: '#FFFFFF'}  },
  { value: "#0D47A1", label: "Deep Blue", style: { background: '#0D47A1', color: '#FFFFFF'}  },
  { value: "#2E7D32", label: "Forest Green", style: { background: '#2E7D32', color: '#FFFFFF'}  },
  { value: "#F57C00", label: "Warm Orange", style: { background: '#F57C00', color: '#FFFFFF'}  },
  { value: "#D4AF37", label: "Soft Gold", style: { background: '#D4AF37', color: '#000000'}  },
  { value: "#36454F", label: "Charcoal", style: { background: '#36454F', color: '#FFFFFF'}  },
  { value: "#5D4037", label: "Sepia Brown", style: { background: '#5D4037', color: '#FFFFFF'} },
  { value: "#E0F7FA", label: "Light Cyan", style: { background: '#E0F7FA', color: '#000000'} },
  { value: "#E1BEE7", label: "Light Lavender", style: { background: '#E1BEE7', color: '#000000'} },
];


const InstagramPreviewSection: React.FC<InstagramPreviewSectionProps> = ({
  poem,
  poemTopic,
  selectedTheme,
  selectedFont,
  setSelectedFont,
  selectedTextColor,
  setSelectedTextColor,
}) => {
  const { toast } = useToast();

  const handleDownloadImage = () => {
    toast({
      title: "Feature Coming Soon!",
      description: "Downloading poems as images will be available in a future update.",
    });
    console.log("Attempted to download image with current settings:", { poem, poemTopic, selectedTheme, selectedFont, selectedTextColor });
  };

  const displayPoem = poem || "Your beautiful poem will appear here once generated.\n\nTry different themes and styles!";
  const displayTopic = poemTopic || "Verse Vision";

  // The selectedFont (e.g. "font-body") is applied as a Tailwind class to the div.
  // The selectedTextColor is applied via inline style.
  const previewStyle = {
    color: selectedTextColor,
  } as React.CSSProperties;


  return (
    <section className="w-full py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <Card className="max-w-4xl mx-auto shadow-xl">
          <CardHeader className="text-center">
            <Smartphone className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="font-headline text-4xl">Instagram Preview</CardTitle>
            <CardDescription className="text-lg">
              See how your poem will look on an Instagram post. Customize and get ready to share!
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
              <Button onClick={handleDownloadImage} className="w-full font-headline text-lg bg-accent hover:bg-accent/90">
                <Download className="mr-2 h-5 w-5" />
                Download as Image
              </Button>
            </div>
            
            {/* Phone Mockup */}
            <div className="mt-8 md:mt-0 flex justify-center items-center">
              <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[10px] rounded-[2.5rem] h-[550px] w-[270px] shadow-xl">
                <div className="w-[100px] h-[12px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[13px] top-[60px] rounded-l-lg"></div>
                <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[13px] top-[110px] rounded-l-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -right-[13px] top-[90px] rounded-r-lg"></div>
                <div className={`rounded-[2rem] overflow-hidden w-full h-full bg-background poem-preview-area ${selectedTheme} ${selectedFont}`} style={previewStyle}>
                  <div className="p-1 text-xs opacity-70 break-words">{displayTopic}</div>
                  <div className="text-sm leading-relaxed p-1 break-words">
                    {displayPoem.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
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
