
'use server';

/**
 * @fileOverview Generates a daily poem and motivational quote.
 *
 * - generateDailyDispatch - A function that generates a poem and quote.
 * - GenerateDailyDispatchOutput - The return type for the generateDailyDispatch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDailyDispatchOutputSchema = z.object({
  poem: z.string().describe('A short, inspiring poem for a daily newsletter.'),
  quote: z.string().describe('A motivational quote for a daily newsletter.'),
});
export type GenerateDailyDispatchOutput = z.infer<typeof GenerateDailyDispatchOutputSchema>;

export async function generateDailyDispatch(): Promise<GenerateDailyDispatchOutput> {
  return generateDailyDispatchFlow();
}

const dailyDispatchPrompt = ai.definePrompt({
  name: 'dailyDispatchPrompt',
  output: {schema: GenerateDailyDispatchOutputSchema},
  prompt: `You are an editor for a "Daily Poems" newsletter. Your task is to generate content for today's dispatch.

Please provide:
1. A short, uplifting, and inspiring poem (around 4-6 lines).
2. A classic motivational quote.

The tone should be positive and thoughtful.
`,
});

const generateDailyDispatchFlow = ai.defineFlow(
  {
    name: 'generateDailyDispatchFlow',
    outputSchema: GenerateDailyDispatchOutputSchema,
  },
  async () => {
    const {output} = await dailyDispatchPrompt({});
    return output!;
  }
);
