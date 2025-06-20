
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
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
            <CardTitle className="font-headline text-4xl">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p><strong>Last Updated: June 20, 2024</strong></p>
            <p>By using Poetry Vision ("the Service"), you agree to be bound by these Terms of Service.</p>
            
            <h2 className="font-headline text-2xl text-foreground pt-4">1. Use of the Service</h2>
            <p>The Service is provided for creative and personal use. You agree not to use the Service for any illegal or unauthorized purpose. You are responsible for any content you create and share using the Service.</p>
            
            <h2 className="font-headline text-2xl text-foreground pt-4">2. Intellectual Property</h2>
            <p>You retain ownership of the original ideas and prompts you provide. The generated poems and images are created by a generative AI model. Your rights to the output are subject to the policies of the underlying AI provider (Google). We grant you a license to use, share, and modify the generated content for personal and commercial purposes, subject to those third-party terms.</p>
            
            <h2 className="font-headline text-2xl text-foreground pt-4">3. Disclaimer of Warranties</h2>
            <p>The Service is provided "as is," without warranty of any kind. We do not warrant that the Service will be uninterrupted, error-free, or that the generated content will meet your requirements. The AI may sometimes produce inaccurate or offensive content that does not represent our views.</p>

            <h2 className="font-headline text-2xl text-foreground pt-4">4. Limitation of Liability</h2>
            <p>In no event shall Poetry Vision be liable for any indirect, incidental, or consequential damages arising out of your use of the Service.</p>

            <h2 className="font-headline text-2xl text-foreground pt-4">5. Governing Law</h2>
            <p>These Terms shall be governed by the laws of the jurisdiction in which the company is based, without regard to its conflict of law provisions. (This is a demo statement).</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
