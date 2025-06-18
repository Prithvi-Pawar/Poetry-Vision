// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview Generates a poem based on a textual input.
 *
 * - generatePoemFromText - A function that generates a poem from user provided text.
 * - GeneratePoemFromTextInput - The input type for the generatePoemFromText function.
 * - GeneratePoemFromTextOutput - The return type for the generatePoemFromText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePoemFromTextInputSchema = z.object({
  text: z.string().describe('A word, emotion, or topic to base the poem on.'),
});
export type GeneratePoemFromTextInput = z.infer<typeof GeneratePoemFromTextInputSchema>;

const GeneratePoemFromTextOutputSchema = z.object({
  poem: z.string().describe('The generated poem.'),
});
export type GeneratePoemFromTextOutput = z.infer<typeof GeneratePoemFromTextOutputSchema>;

export async function generatePoemFromText(input: GeneratePoemFromTextInput): Promise<GeneratePoemFromTextOutput> {
  return generatePoemFromTextFlow(input);
}

const generatePoemPrompt = ai.definePrompt({
  name: 'generatePoemPrompt',
  input: {schema: GeneratePoemFromTextInputSchema},
  output: {schema: GeneratePoemFromTextOutputSchema},
  prompt: `You are a poet. Generate a poem based on the following input:\n\nInput: {{{text}}}`,
});

const generatePoemFromTextFlow = ai.defineFlow(
  {
    name: 'generatePoemFromTextFlow',
    inputSchema: GeneratePoemFromTextInputSchema,
    outputSchema: GeneratePoemFromTextOutputSchema,
  },
  async input => {
    const {output} = await generatePoemPrompt(input);
    return output!;
  }
);
