# 🎨 AI Image Generator - Unlimited Free AI Images

A beautiful, modern web application for generating unlimited AI images using multiple powerful models including GPT-Image-1 and DALL-E-3.

![AI Image Generator](https://img.shields.io/badge/AI-Image%20Generator-purple) ![Next.js](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)

## ✨ Features

### 🚀 **Unlimited Generation**
- **Free unlimited image generation** - No limits, no watermarks
- **Dual AI models** running simultaneously for comparison
- **Real-time generation progress** with timer and status updates

### 🤖 **AI Models**
- **GPT-Image-1** (Model A) - Advanced image generation
- **DALL-E-3** (Model B) - High-quality artistic images
- 🔥 **More models coming soon**: Midjourney, Stable Diffusion, and more!

### 🎯 **User Experience**
- **Beautiful UI** built with shadcn/ui components
- **Sample prompts** organized by categories (Fantasy, Nature, Portrait, etc.)
- **Generation history** with local storage
- **Download & share** generated images
- **Responsive design** for all devices

### 📱 **Smart Features**
- **Prompt suggestions** with curated examples
- **Category filtering** for prompt discovery
- **Image comparison** side-by-side
- **Progress tracking** with realistic timing
- **Error handling** with user-friendly messages

### 🔐 **Authentication Ready**
- **StackAuth integration** for user management
- **Guest mode** for immediate access
- **Future premium features** preparation

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Notifications**: Sonner
- **State Management**: React Hooks + Local Storage
- **Authentication**: StackAuth (optional)

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd sopimg
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/generate/          # API route for image generation
│   ├── globals.css           # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── AuthPrompt.tsx       # Authentication prompt
│   ├── GenerationTimer.tsx  # Progress timer
│   ├── HistoryPanel.tsx     # Generation history
│   ├── ImageCard.tsx        # Image display card
│   └── PromptInput.tsx      # Prompt input form
├── data/
│   └── samplePrompts.ts     # Curated prompt examples
├── hooks/
│   ├── useImageGeneration.ts # Image generation logic
│   └── useLocalStorage.ts   # Local storage utilities
└── types/
    └── index.ts             # TypeScript interfaces
```

## 🎨 Sample Prompts

The application includes curated prompts across multiple categories:

- **Fantasy**: Dragons, magical forests, mythical creatures
- **Nature**: Landscapes, sunsets, natural phenomena
- **Portrait**: Character art, anime style, realistic portraits
- **Sci-Fi**: Futuristic scenes, space exploration, cyberpunk
- **Abstract**: Digital art, flowing patterns, geometric designs
- **Animals**: Cute pets, wildlife, fantasy creatures

## 🔧 API Usage

### Generate Images Endpoint

```typescript
GET /api/generate?prompt=your%20prompt%20here

Response:
{
  "prompt": "your prompt",
  "modelAImage": {
    "image": "https://...",
    "mimeType": "image/png"
  },
  "modelBImage": {
    "image": "https://...",
    "mimeType": "image/png"
  }
}
```

## 🎯 Features in Detail

### Generation Timer
- Real-time progress tracking
- Realistic progress curve simulation
- Status messages for different generation phases
- Time elapsed counter

### History Management
- Automatic saving to local storage
- Thumbnail previews
- Quick prompt reuse
- Download from history
- Clear history option

### Image Cards
- High-quality image display
- Model identification badges
- Download functionality
- Open in new tab
- Responsive design

### Authentication System
- Optional StackAuth integration
- Guest mode for immediate access
- Future premium features support
- Beautiful onboarding experience

## 🚀 Deployment

This application can be deployed on:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Any Node.js hosting platform**

### Environment Variables

For StackAuth integration (optional):
```env
NEXT_PUBLIC_STACK_PROJECT_ID=your_stack_project_id
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [LM Arena](https://lmarena.ai) for the AI model API
- [shadcn/ui](https://ui.shadcn.com) for beautiful components
- [Lucide](https://lucide.dev) for icons
- [Tailwind CSS](https://tailwindcss.com) for styling

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

**Made with ❤️ by the AI Image Generator team**

🎨 **Unlimited AI Image Generation - Forever Free**
