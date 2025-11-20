# 🚀 Prompt Engineering Interactive Tutorial

An immersive, world-class Next.js application for mastering prompt engineering with Claude AI. Built with cutting-edge technologies and featuring real-time validation, interactive exercises, and beautiful animations.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)
![Claude AI](https://img.shields.io/badge/Claude-AI-FF6B6B?style=for-the-badge)

## ✨ Features

### 🎯 **Interactive Learning**
- **Live Code Playground**: Test your prompts in real-time with Claude AI
- **Instant Validation**: Get immediate feedback on your exercise solutions
- **Real-time Token Usage**: Monitor input and output tokens for each request

### 📚 **Comprehensive Curriculum**
- **9 Progressive Chapters**: From beginner to advanced techniques
- **20+ Hands-on Exercises**: Practice what you learn immediately
- **Detailed Examples**: Learn from carefully crafted demonstrations
- **Hints System**: Get unstuck with helpful hints for each exercise

### 🎨 **Beautiful User Experience**
- **Modern Design**: Gradient-rich, animated interface built with Framer Motion
- **Dark Mode Support**: Full dark/light theme switching
- **Responsive Layout**: Perfect on desktop, tablet, and mobile
- **Progress Tracking**: Automatic progress saving with visual indicators

### 🔐 **Privacy First**
- **Local Storage**: Your API key never leaves your browser
- **No Backend**: All API calls go directly to Anthropic
- **No Tracking**: No analytics or data collection

## 🏗️ What's Inside

### Chapters Covered:

#### Beginner
1. **Basic Prompt Structure** - Learn the fundamentals of the Messages API
2. **Being Clear and Direct** - Master the art of clear communication
3. **Assigning Roles** - Use role prompting to improve responses

#### Intermediate
4. **Separating Data from Instructions** - Use XML tags for clarity
5. **Formatting Output** - Control response structure with prefilling
6. **Precognition (Thinking Step by Step)** - Guide Claude through complex reasoning
7. **Using Examples (Few-Shot Prompting)** - Teach by demonstration

#### Advanced
8. **Avoiding Hallucinations** - Techniques to ensure factual accuracy
9. **Complex Prompts from Scratch** - Build production-ready prompts

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Anthropic API key ([Get one here](https://console.anthropic.com/))

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd prompt-eng-interactive-tutorial
```

2. **Navigate to the app directory**
```bash
cd prompt-engineering-app
```

3. **Install dependencies**
```bash
npm install
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

6. **Configure your API key**
Click "Settings" in the navigation bar and enter your Anthropic API key

### Building for Production

```bash
npm run build
npm run start
```

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **AI Integration**: [@anthropic-ai/sdk](https://www.npmjs.com/package/@anthropic-ai/sdk)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📁 Project Structure

```
prompt-engineering-app/
├── app/
│   ├── api/
│   │   └── claude/
│   │       └── route.ts          # Claude API endpoint
│   ├── chapter/
│   │   └── [slug]/
│   │       └── page.tsx           # Chapter detail page
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home page
├── components/
│   ├── ChapterCard.tsx            # Chapter preview card
│   ├── Exercise.tsx               # Interactive exercise component
│   ├── Navigation.tsx             # Navigation bar
│   ├── Playground.tsx             # Code playground
│   └── SettingsModal.tsx          # Settings modal
├── lib/
│   ├── chapters.ts                # Chapter data and content
│   └── store.ts                   # Zustand store
└── types/
    └── tutorial.ts                # TypeScript interfaces
```

## 🎓 Learning Path

1. **Start with Chapter 1**: Learn the basic structure of prompts
2. **Complete Exercises**: Each chapter has hands-on exercises
3. **Experiment in Playground**: Test variations of examples
4. **Track Your Progress**: Watch your completion percentage grow
5. **Review Hints**: If stuck, use the hint system
6. **Build Complex Prompts**: Apply everything in Chapter 9

## 🌟 Key Features Explained

### Interactive Playground
Every chapter includes a live playground where you can:
- Modify prompts and system prompts
- Run them against Claude AI
- See responses in real-time
- View token usage statistics

### Exercise Validation
Exercises feature automatic validation:
- Run your solution against Claude
- Get instant pass/fail feedback
- Earn completion badges
- Track progress across all exercises

### Progress Tracking
Your learning journey is automatically saved:
- Completed chapters marked with checkmarks
- Exercise completion tracked
- Overall progress percentage displayed
- Resume where you left off

## 🤝 Contributing

This project is based on [Anthropic's official Prompt Engineering Tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial). 

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Improve documentation
- Add more examples

## 📝 License

This project builds upon Anthropic's tutorial. Please refer to the original repository for licensing information.

## 🙏 Acknowledgments

- **Anthropic** for the excellent prompt engineering curriculum
- **Next.js team** for the amazing framework
- **Tailwind Labs** for Tailwind CSS
- **Framer** for Motion library

## 📧 Support

If you encounter any issues or have questions:
1. Check the Settings to ensure your API key is configured
2. Review the [Anthropic API documentation](https://docs.anthropic.com/)
3. Open an issue in the repository

---

**Built with ❤️ for the AI community**

Start your prompt engineering journey today! 🚀
