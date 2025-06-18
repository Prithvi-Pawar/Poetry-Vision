
"use client";

import type React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InstagramIcon, TwitterIcon } from "./icons"; // Using custom icons
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';

const FooterSection: React.FC = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    // Placeholder for actual newsletter subscription
    console.log("Newsletter subscription for:", email);
    toast({
      title: "Subscribed!",
      description: `Thank you for subscribing, ${email}! You'll receive daily poems. (This is a demo)`,
    });
    setEmail('');
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
              <Link href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <TwitterIcon size={28} />
              </Link>
            </div>
          </div>

          <div className="space-y-4 md:col-span-1">
            <h4 className="font-headline text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
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
              />
              <Button type="submit" variant="default" className="bg-accent hover:bg-accent/90 shrink-0">
                <Mail className="mr-2 h-4 w-4" /> Subscribe
              </Button>
            </form>
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
