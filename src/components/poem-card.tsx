import type React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface PoemCardProps {
  title: string;
  poemSnippet: string;
  imageUrl: string;
  imageHint: string;
  onViewPoem?: () => void;
}

const PoemCard: React.FC<PoemCardProps> = ({ title, poemSnippet, imageUrl, imageHint, onViewPoem }) => {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="font-headline text-2xl mb-2 text-primary">{title}</CardTitle>
        <CardDescription className="text-muted-foreground line-clamp-3 mb-4">
          {poemSnippet}
        </CardDescription>
        {onViewPoem && (
          <Button variant="outline" onClick={onViewPoem} className="w-full border-primary text-primary hover:bg-primary/10">
            <Eye className="mr-2 h-4 w-4" /> View Full Poem
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PoemCard;
