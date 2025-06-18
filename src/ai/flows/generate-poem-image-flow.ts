
'use server';
/**
 * @fileOverview Generates an image for a poem with specified styling.
 *
 * - generatePoemImage - A function that generates an image for a poem.
 * - GeneratePoemImageInput - The input type for the generatePoemImage function.
 * - GeneratePoemImageOutput - The return type for the generatePoemImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePoemImageInputSchema = z.object({
  poemText: z.string().describe('The full text of the poem.'),
  poemTopic: z.string().describe('The topic or title of the poem.'),
  theme: z.string().describe('A description of the visual theme for the image background (e.g., "a vibrant sunset with warm oranges, yellows, and reds").'),
  fontFamily: z.string().describe('A description of the desired font style (e.g., "a classic, readable serif font like Alegreya").'),
  textColorHex: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color code").describe('The hex color code for the poem text (e.g., "#FFFFFF").'),
  aspectRatio: z.string().describe('The desired aspect ratio for the image (e.g., "1:1" for square, "4:5" for portrait).'),
});
export type GeneratePoemImageInput = z.infer<typeof GeneratePoemImageInputSchema>;

const GeneratePoemImageOutputSchema = z.object({
  imageDataUri: z.string().describe("The generated image as a data URI (e.g., 'data:image/png;base64,<encoded_data>')."),
});
export type GeneratePoemImageOutput = z.infer<typeof GeneratePoemImageOutputSchema>;

export async function generatePoemImage(input: GeneratePoemImageInput): Promise<GeneratePoemImageOutput> {
  return generatePoemImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePoemImagePrompt',
  input: {schema: GeneratePoemImageInputSchema},
  // Output schema is not strictly needed here as we primarily care about the media output
  // but it's good practice if we wanted to extract structured text.
  // Forcing image modality implies the output structure.
  prompt: `You are a creative graphic design AI. Your task is to generate an image suitable for sharing on social media, featuring a poem.

Poem Text:
---
{{{poemText}}}
---

Poem Topic/Title: {{{poemTopic}}}

Visual Style Guidelines:
- Background Theme: Create a background that visually represents: "{{{theme}}}". The background should be aesthetically pleasing and complement the poem.
- Text Appearance:
    - Font Style: Render the poem text using a font that matches this description: "{{{fontFamily}}}". Prioritize legibility.
    - Text Color: The poem text must be in the color specified by this hex code: {{{textColorHex}}}. Ensure good contrast with the background.
- Layout: Artistically place the poem text onto the background. The text should be the main focus but well-integrated.
- Aspect Ratio: The final image should be designed for a {{{aspectRatio}}} aspect ratio.

Generate an image that embodies these characteristics. The image should be beautiful, clear, and shareable.
`,
});

const generatePoemImageFlow = ai.defineFlow(
  {
    name: 'generatePoemImageFlow',
    inputSchema: GeneratePoemImageInputSchema,
    outputSchema: GeneratePoemImageOutputSchema,
  },
  async (input) => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp', // Ensure this model supports image generation
      prompt: await prompt.render(input), // Render the prompt with input
      config: {
        responseModalities: ['IMAGE'], // Request only IMAGE modality
         // Safety settings can be adjusted if needed, defaults are generally okay
        safetySettings: [
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ],
      },
    });

    if (!media || !media.url) {
      throw new Error('Image generation failed or did not return a media URL.');
    }

    return { imageDataUri: media.url };
  }
);
