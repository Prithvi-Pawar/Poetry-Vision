
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
  poemTopic: z.string().describe('The topic or title of the poem, to be displayed prominently on the image.'),
  theme: z.string().describe('A description of the visual theme for the image background (e.g., "a vibrant sunset with warm oranges, yellows, and reds").'),
  fontFamily: z.string().describe('A description of the desired font style (e.g., "a classic, readable serif font like Alegreya").'),
  textColorHex: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color code").describe('The hex color code for the poem text (e.g., "#FFFFFF").'),
  aspectRatio: z.string().describe('A description of the desired aspect ratio and sizing (e.g., "4:5 portrait aspect ratio", or "dynamic, prioritize fitting all poem text legibly without compression. Image canvas should expand as needed, prefer portrait for long poems, otherwise square.").'),
  authorName: z.string().optional().describe('The name of the poet/author to be displayed on the image, typically prefixed with "— ".'),
});
export type GeneratePoemImageInput = z.infer<typeof GeneratePoemImageInputSchema>;

const GeneratePoemImageOutputSchema = z.object({
  imageDataUri: z.string().describe("The generated image as a data URI (e.g., 'data:image/png;base64,<encoded_data>')."),
});
export type GeneratePoemImageOutput = z.infer<typeof GeneratePoemImageOutputSchema>;

export async function generatePoemImage(input: GeneratePoemImageInput): Promise<GeneratePoemImageOutput> {
  return generatePoemImageFlow(input);
}

const promptDefinition = ai.definePrompt({
  name: 'generatePoemImagePrompt',
  input: {schema: GeneratePoemImageInputSchema},
  prompt: `You are a creative graphic design AI. Your task is to generate an image suitable for sharing on social media, featuring a poem and its title.

Poem Title:
---
{{{poemTopic}}}
---

Poem Text:
---
{{{poemText}}}
---

Visual Style Guidelines:
- Title Display: The "Poem Title" ("{{{poemTopic}}}") MUST be rendered prominently at the top of the image, above the poem text. Use a font size and style that makes it clearly distinguishable as the main title.
- Background Theme: Create a background that visually represents: "{{{theme}}}". The background should be aesthetically pleasing and complement the poem.
- Text Appearance:
    - Font Style: Render the poem text (and title) using a font that matches this description: "{{{fontFamily}}}". Prioritize legibility for both.
    - Text Color: The poem text (and title) must be in the color specified by this hex code: {{{textColorHex}}}. Ensure good contrast with the background.
- Layout & Sizing: Artistically place the poem title and text onto the background. The title and poem text should be the main focus but well-integrated. The final image dimensions and aspect ratio should be guided by the following instruction: "{{{aspectRatio}}}". Ensure the entire poem and title are legible and not overly compressed or shrunk to fit. The image canvas should expand as needed to accommodate the full text if the instruction implies dynamic sizing.
{{#if authorName}}
- Author Attribution: Display the author's name: "{{{authorName}}}" subtly beneath the poem. You can prefix it with "by" or use an em-dash, e.g., "— {{{authorName}}}". Ensure it is less prominent than the poem title or text.
{{/if}}

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
    const renderedRequest = await promptDefinition.render(input);

    let promptText = "";
    if (
      renderedRequest.messages &&
      renderedRequest.messages.length > 0 &&
      renderedRequest.messages[0].content &&
      renderedRequest.messages[0].content.length > 0
    ) {
      const contentPart = renderedRequest.messages[0].content[0];
      if ('text' in contentPart && typeof contentPart.text === 'string') {
        promptText = contentPart.text;
      }
    }

    if (!promptText) {
      throw new Error("Failed to render prompt text for image generation.");
    }

    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp', 
      prompt: promptText, 
      config: {
        responseModalities: ['TEXT', 'IMAGE'], 
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

