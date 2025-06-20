
"use client";

import type React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InstagramIcon, GithubIcon, LinkedinIcon } from "./icons";
import { Mail, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';
import { generateDailyDispatch } from '@/ai/flows/generate-daily-dispatch';

const FooterSection: React.FC = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubscribing(true);

    try {
      // This is a placeholder for a real subscription flow.
      // In a real app, you would save the email to a database.
      // Then a scheduled function would generate and send the email.
      console.log("Newsletter subscription for:", email);

      // For this demo, we'll generate a sample dispatch to show the user.
      const dispatch = await generateDailyDispatch();
      
      toast({
        title: "Subscribed! (Demo)",
        description: `Thank you for subscribing! As a demo, we don't store emails or send them automatically. Here is a sample of what you would receive: "${dispatch.poem.substring(0, 50)}..." - "${dispatch.quote.substring(0, 50)}..."`,
        duration: 9000,
      });
      setEmail('');

    } catch (error) {
      console.error("Failed to generate sample dispatch:", error);
      toast({
        title: "Subscription Failed",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="w-full py-12 md:py-16 bg-muted/50 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="space-y-4">
            <h3 className="font-headline text-2xl text-primary">Poetry Vision</h3>
            <p className="text-muted-foreground">
              Crafting poetry from your imagination.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <InstagramIcon size={28} />
              </Link>
              <Link href="#" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <GithubIcon size={28} />
              </Link>
              <Link href="#" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <LinkedinIcon size={28} />
              </Link>
            </div>
          </div>

          <div className="space-y-4 md:col-span-1">
            <h4 className="font-headline text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div className="space-y-4 md:col-span-1">
            <h4 className="font-headline text-lg font-semibold">Daily Poems Newsletter</h4>
            <p className="text-sm text-muted-foreground">Get a fresh poem delivered to your inbox every day.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow"
                aria-label="Email for newsletter"
                disabled={isSubscribing}
              />
              <Button type="submit" variant="default" className="bg-accent hover:bg-accent/90 shrink-0" disabled={isSubscribing}>
                {isSubscribing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" /> Subscribe
                  </>
                )}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground">
                Demo only. We don't store your email or send automated messages. The scheduling and email delivery would require a backend database and cron job service.
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Poetry Vision. All rights reserved. Made with ♡.
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
