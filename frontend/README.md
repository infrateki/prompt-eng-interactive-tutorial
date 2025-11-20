# Prompt Engineering Interactive Tutorial - Frontend

A modern, interactive web application for learning prompt engineering with Anthropic's Claude. This frontend transforms the original Jupyter notebook-based course into an accessible, user-friendly web experience.

## Features

- **Interactive Learning**: Hands-on exercises with real-time Claude API integration
- **Progress Tracking**: Track your completion status and learning progress
- **Exercise Grading**: Automatic evaluation with helpful feedback
- **Example Playground**: Experiment freely with prompts and parameters
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Mode**: Toggle between light and dark themes
- **Offline Support**: Learn even without constant internet connection

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **API Integration**: Anthropic SDK
- **Code Editor**: Monaco Editor (planned)
- **Markdown**: react-markdown with syntax highlighting

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- An Anthropic API key ([Get one here](https://console.anthropic.com/))

### Installation

1. **Clone the repository**

```bash
cd prompt-eng-interactive-tutorial/frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
# Anthropic API Configuration
ANTHROPIC_API_KEY=your_api_key_here

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ENABLE_DEMO_MODE=true

# Model Configuration
NEXT_PUBLIC_DEFAULT_MODEL=claude-3-haiku-20240307
NEXT_PUBLIC_MAX_TOKENS=2000
NEXT_PUBLIC_TEMPERATURE=0.0
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── api/               # API routes
│   │   │   └── claude/        # Claude API proxy
│   │   ├── chapters/          # Chapter pages (to be added)
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/               # UI components (shadcn)
│   │   └── theme-provider.tsx
│   ├── lib/                   # Utility libraries
│   │   ├── utils.ts          # General utilities
│   │   ├── storage.ts        # LocalStorage management
│   │   ├── claude-client.ts  # Claude API client
│   │   ├── store.ts          # Zustand state management
│   │   ├── content.ts        # Content loading utilities
│   │   └── grading.ts        # Exercise grading logic
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts
│   └── content/               # Course content
│       └── chapters/          # Chapter MDX files (to be added)
├── public/                    # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

## Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type checking
npm run type-check
```

## Configuration

### API Key Management

Users can provide their API key in two ways:

1. **Environment Variable** (recommended for development):
   - Set `ANTHROPIC_API_KEY` in `.env`
   - This key is used as a fallback for all users

2. **User Input** (recommended for production):
   - Users enter their API key in the application
   - Stored securely in localStorage (encrypted)
   - Used for API calls through the proxy

### Demo Mode

Enable demo mode to allow users to explore the tutorial without an API key:

```env
NEXT_PUBLIC_ENABLE_DEMO_MODE=true
```

When enabled, users can view lessons and exercises but with limited API interactions.

## Development Guide

### Adding New Chapters

1. **Create chapter content** in `src/lib/content.ts`:

```typescript
{
  id: 'chapter-slug',
  number: X,
  title: 'Chapter Title',
  slug: 'chapter-slug',
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  description: 'Brief description',
  lessonContent: 'Markdown content here',
  examples: [...],
  exercises: [...],
  estimatedTime: 15,
  learningObjectives: [...],
}
```

2. **Create chapter page** in `src/app/chapters/[slug]/page.tsx`

3. **Update navigation** to include the new chapter

### Adding UI Components

We use shadcn/ui for components. To add a new component:

```bash
# Example: adding a dialog component
npx shadcn-ui@latest add dialog
```

### Customizing Styles

- **Global styles**: Edit `src/app/globals.css`
- **Theme colors**: Edit CSS variables in `globals.css`
- **Tailwind config**: Edit `tailwind.config.ts`

## API Routes

### POST /api/claude

Call Claude API with user prompts.

**Request:**
```json
{
  "prompt": "Your prompt here",
  "systemPrompt": "Optional system prompt",
  "model": "claude-3-haiku-20240307",
  "maxTokens": 2000,
  "temperature": 0.0,
  "userApiKey": "Optional user API key"
}
```

**Response:**
```json
{
  "id": "msg_xxx",
  "content": "Claude's response",
  "model": "claude-3-haiku-20240307",
  "usage": {
    "inputTokens": 10,
    "outputTokens": 50
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## State Management

The app uses Zustand for state management with the following stores:

- **useUserStore**: User authentication and API key management
- **useProgressStore**: Learning progress and completed chapters
- **usePreferencesStore**: User preferences (theme, font size, etc.)
- **usePlaygroundStore**: Playground state and history

### Example Usage

```typescript
import { useProgressStore } from '@/lib/store';

function MyComponent() {
  const { completedChapters, completeChapter } = useProgressStore();

  // Use the state
  console.log(completedChapters);

  // Update the state
  completeChapter('chapter-1');
}
```

## Content Migration

To migrate content from Jupyter notebooks to the frontend:

1. **Extract lesson content**: Copy markdown cells from notebooks
2. **Format examples**: Transform code examples into the Example interface
3. **Convert exercises**: Transform exercise cells into Exercise objects
4. **Adapt grading**: Convert Python grading functions to TypeScript

See `src/lib/content.ts` for the data structure.

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Configure environment variables

3. **Deploy**
   - Vercel will automatically deploy on push to main

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Netlify**: Use the Netlify CLI or web interface
- **AWS Amplify**: Follow AWS Amplify Next.js guide
- **CloudFlare Pages**: Use CloudFlare Pages dashboard
- **Self-hosted**: Build and run with `npm run build && npm start`

### Environment Variables

Make sure to set these in your deployment platform:

- `ANTHROPIC_API_KEY` (optional, for fallback)
- `NEXT_PUBLIC_APP_URL` (your production URL)
- `NEXT_PUBLIC_ENABLE_DEMO_MODE`

## Testing

Testing setup coming soon. Planned:

- Unit tests with Jest
- Component tests with React Testing Library
- E2E tests with Playwright
- API tests for Claude integration

## Performance

- **Code splitting**: Automatic with Next.js App Router
- **Image optimization**: Next.js Image component
- **Font optimization**: Next.js Font optimization
- **Bundle analysis**: Run `npm run build` to see bundle sizes

## Security

- **API Key Protection**: Keys encrypted in localStorage
- **Rate Limiting**: Implemented at API route level
- **Input Sanitization**: All user inputs sanitized
- **CSP Headers**: Content Security Policy configured
- **HTTPS Only**: Enforced in production

## Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast mode support
- Focus indicators on all interactive elements

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## Troubleshooting

### API Key Issues

**Error: "Invalid API key"**
- Verify your API key is correct
- Check it starts with `sk-ant-`
- Ensure it's set in `.env` or entered in the app

### Build Issues

**Error: "Module not found"**
- Run `rm -rf node_modules && npm install`
- Clear Next.js cache: `rm -rf .next`

**TypeScript Errors**
- Run `npm run type-check` to see all type errors
- Ensure all dependencies are installed

### Runtime Issues

**API calls failing**
- Check browser console for errors
- Verify API key is set correctly
- Check network tab for API responses
- Ensure CORS is configured correctly

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

See the main repository LICENSE file.

## Resources

- [Anthropic Documentation](https://docs.anthropic.com/)
- [Claude API Reference](https://docs.anthropic.com/claude/reference)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

## Support

For issues or questions:

- Open an issue in the GitHub repository
- Check existing documentation
- Review the FAQ section

## Roadmap

- [ ] Complete all 9 chapters
- [ ] Add Monaco code editor
- [ ] Implement full playground features
- [ ] Add user authentication
- [ ] Add achievement system
- [ ] Add social sharing
- [ ] Add export/import progress
- [ ] Add mobile app (React Native)
- [ ] Add offline mode with service workers
- [ ] Add video tutorials
- [ ] Add community features

---

Built with ❤️ by the Anthropic community
