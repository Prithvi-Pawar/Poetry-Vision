
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline text-4xl">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p><strong>Last Updated: June 20, 2024</strong></p>
            <p>Welcome to Poetry Vision! This Privacy Policy explains how we handle your information when you use our application.</p>
            
            <h2 className="font-headline text-2xl text-foreground pt-4">1. Information We Collect</h2>
            <p>We are committed to your privacy. Poetry Vision is a demo application and we do not collect, store, or share any personal information, poems, or images you generate. All processing happens in real-time, and your creations are not saved on our servers.</p>
            
            <h2 className="font-headline text-2xl text-foreground pt-4">2. How We Use Information</h2>
            <p>Since we do not collect any personal information, we do not use it for any purpose. The text and images you input are sent to a third-party AI service (Google's Gemini) to generate poems and images. We recommend reviewing Google's privacy policy for information on how they handle data.</p>
            
            <h2 className="font-headline text-2xl text-foreground pt-4">3. Data Security</h2>
            <p>We do not store your data, so there is no risk of your data being breached from our systems. All generated content exists only in your browser session and is lost upon refresh unless you download it.</p>

            <h2 className="font-headline text-2xl text-foreground pt-4">4. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

            <h2 className="font-headline text-2xl text-foreground pt-4">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, you can contact us through the links provided in the footer of our main page. (This is a demo contact.)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
