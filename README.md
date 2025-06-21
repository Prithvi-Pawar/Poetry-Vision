Poetry-Vision
=============

Poetry-Vision is a creative AI project that generates poetic content and visuals based on text prompts. It fuses natural language understanding with visual imagination to deliver immersive and expressive poems and images.

Features
--------

- 🧠 AI-generated poetry from textual prompts
- 🖼️ AI-generated visuals based on poems
- 🌅 Daily dispatch-style poem generation
- ⚡ Built with Next.js, Tailwind CSS, and Genkit AI flows

Project Structure
-----------------

Poetry-Vision/
├── src/
│   ├── ai/                              
│   │   └── flows/                       
│   └── tailwind.config.ts              
├── docs/                                
├── public/                              
├── .vscode/                             
├── package.json                       
├── tailwind.config.ts                  
├── next.config.ts                       
├── apphosting.yaml                      

Getting Started
---------------

Prerequisites:
- Node.js ≥ 18
- npm or yarn

Installation:
1. Clone the repository
   git clone https://github.com/your-username/Poetry-Vision.git
2. Navigate into the project directory
   cd Poetry-Vision
3. Install the dependencies
   npm install

Running the Development Server:
   npm run dev

Build for Production:
   npm run build

AI Flows
--------

AI capabilities are implemented with Genkit flows:

- generate-poem-from-text.ts
- generate-poem-image-flow.ts
- generate-daily-dispatch.ts

Located in: `src/ai/flows/`

Hosting
-------

Includes `apphosting.yaml` — likely for Google Cloud App Engine deployment. Customize it as needed for your cloud platform.

License
-------

MIT License

Contributing
------------

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit and push your changes
4. Open a pull request

Contact
-------

Made with ❤️ by [Your Name or Team Name]
