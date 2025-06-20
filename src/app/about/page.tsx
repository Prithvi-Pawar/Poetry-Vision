
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Wand2 } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Card className="shadow-xl overflow-hidden">
          <div className="relative h-48 w-full animated-gradient flex items-center justify-center">
             <h1 className="font-headline text-5xl text-primary-foreground drop-shadow-lg">About Poetry Vision</h1>
          </div>
          <CardContent className="p-6 space-y-6 text-muted-foreground leading-relaxed">
            <div className="flex items-center text-primary">
                <Wand2 className="h-8 w-8 mr-4"/>
                <p className="font-headline text-2xl text-foreground">
                    Crafting poetry from your imagination.
                </p>
            </div>
            <p>Poetry Vision is an innovative web application designed to bridge the gap between human emotion and artificial intelligence. Our mission is to provide a tool that empowers everyone—from seasoned poets to curious newcomers—to transform their thoughts, feelings, and ideas into beautiful, shareable verses.</p>
            
            <h2 className="font-headline text-2xl text-foreground pt-4">How It Works</h2>
            <p>Using the power of Google's Gemini generative AI, Poetry Vision takes your text prompts and interprets them to create unique poems. But it doesn't stop there. We believe poetry is a visual art form, which is why our application also allows you to style your creation with various themes, fonts, and colors, and then generate a beautiful image perfect for sharing on social media or keeping as a personal memento.</p>

            <h2 className="font-headline text-2xl text-foreground pt-4">A Note on this App</h2>
            <p>This application is a demonstration project built with Next.js, Genkit, and ShadCN UI. It showcases how modern web technologies and generative AI can be combined to create engaging and creative user experiences. As a demo, we do not store any of your data, ensuring your creative process remains entirely your own.</p>
            
            <p>Thank you for visiting. We hope you find inspiration with Poetry Vision!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
