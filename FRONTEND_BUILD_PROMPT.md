# Comprehensive Prompt: Build Frontend for Anthropic's Prompt Engineering Interactive Tutorial

## Project Overview

Build a modern, interactive web application frontend for Anthropic's Prompt Engineering Interactive Tutorial. The application should transform the existing Jupyter notebook-based course into an accessible, user-friendly web experience that maintains all interactive learning features while being more approachable for beginners.

## Current State

The tutorial currently exists as:
- 9 chapters with exercises covering prompt engineering techniques
- Jupyter notebooks (in both Anthropic 1P and Amazon Bedrock versions)
- A Google Sheets version (referenced as more user-friendly)
- Interactive exercises with auto-grading functionality
- Example playgrounds for experimentation

## Core Requirements

### 1. User Experience & Navigation

**Course Structure:**
- Homepage with course introduction, goals, and learning outcomes
- Clear navigation between chapters:
  - **Beginner:** Chapters 1-3
  - **Intermediate:** Chapters 4-7
  - **Advanced:** Chapters 8-9
  - **Appendix:** Advanced topics
- Progress tracking showing completed chapters and exercises
- Table of contents with chapter status indicators (locked/unlocked/completed)
- "Previous" and "Next" navigation buttons

**Key Features:**
- Responsive design (mobile, tablet, desktop)
- Dark/light mode toggle
- Accessibility compliant (WCAG 2.1 AA)
- Fast page transitions and smooth scrolling
- Ability to bookmark and resume from last position

### 2. Chapter Structure

Each chapter should contain:

**A. Lesson Section:**
- Clear, readable lesson content with syntax highlighting for code
- Interactive code examples with "Run" buttons
- Real-time Claude API integration to show responses
- Visual formatting for:
  - Code blocks with copy functionality
  - Important callouts and tips
  - Links to documentation
  - Examples with clear before/after states

**B. Exercises Section:**
- Interactive exercise interface with:
  - Exercise description and requirements
  - Code editor (Monaco Editor or CodeMirror recommended)
  - "Submit" button to check answer
  - Real-time feedback with grading
  - Hint system (expandable hints)
  - Solution reveal option (after attempts)
- Visual indicators for:
  - Correct solutions (green checkmark)
  - Incorrect attempts (red X with feedback)
  - Partially correct (yellow warning)

**C. Example Playground:**
- Sandbox environment for free experimentation
- Prompt input area (expandable textarea)
- Optional system prompt field
- Temperature and max_tokens parameter controls
- "Run Prompt" button
- Response display area with:
  - Token count
  - Response time
  - Copy response button
- Save/load custom examples
- History of recent prompts

### 3. Technical Architecture

**Frontend Stack (Recommendations):**
- **Framework:** Next.js 14+ (App Router) or React with Vite
- **Styling:** Tailwind CSS with shadcn/ui components or Chakra UI
- **Code Editor:** Monaco Editor (VS Code editor) or CodeMirror
- **State Management:** Zustand or React Context + hooks
- **API Integration:** tRPC or REST API with fetch/axios
- **Markdown Rendering:** MDX or react-markdown with syntax highlighting
- **Authentication:** NextAuth.js or Clerk (for API key management)

**Backend Requirements:**
- API proxy to handle Anthropic API calls securely
- User progress persistence (database or localStorage)
- Rate limiting and error handling
- API key validation and secure storage

**Data Models:**

```typescript
interface User {
  id: string;
  apiKey?: string; // encrypted, optional for demo mode
  progress: UserProgress;
  preferences: UserPreferences;
}

interface UserProgress {
  completedChapters: string[];
  completedExercises: string[];
  currentChapter: string;
  exerciseAttempts: Record<string, ExerciseAttempt[]>;
}

interface Chapter {
  id: string;
  number: number;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'appendix';
  lessonContent: string; // MDX content
  examples: Example[];
  exercises: Exercise[];
  estimatedTime: number; // minutes
}

interface Exercise {
  id: string;
  title: string;
  description: string;
  starterCode?: string;
  hints: string[];
  solution?: string;
  gradingFunction: string; // function to validate solution
  testCases?: TestCase[];
}

interface Example {
  id: string;
  description: string;
  prompt: string;
  systemPrompt?: string;
  expectedResponse?: string;
  editable: boolean;
}
```

### 4. Core Features Detail

**API Key Management:**
- Onboarding flow explaining API key requirement
- Secure input field for API key
- Option to use demo mode with limited pre-cached responses
- Link to Anthropic Console for key generation
- Validation on entry
- Encrypted storage (environment variable or user profile)

**Interactive Code Execution:**
- Syntax highlighting for Python (original notebook code) and prompt text
- Real-time API calls to Claude
- Loading states during API calls
- Error handling with helpful messages
- Rate limit warnings
- Token usage display

**Progress Tracking:**
- Visual progress bar for overall course completion
- Per-chapter completion indicators
- Exercise completion badges
- Streak tracking (days in a row)
- Time spent learning statistics
- Export progress as PDF certificate (optional)

**Exercise Grading System:**
- Client-side validation where possible
- Server-side validation for Claude responses
- Multiple submission attempts allowed
- Feedback messages:
  - What's wrong
  - What to try next
  - Hints (progressive disclosure)
- Success animations and celebrations

### 5. Additional Features

**Nice-to-Have Features:**
- Search functionality across all chapters
- Code snippet library (save favorite prompts)
- Community features (share prompts, optional)
- Export/import course progress
- Keyboard shortcuts for power users
- Print-friendly view for offline reference
- Integration with Claude.ai for advanced users
- Video tutorials (embed if available)
- Glossary of terms
- FAQ section

**Gamification (Optional):**
- Points for completing exercises
- Badges for milestones
- Leaderboard (optional, privacy-respecting)
- Achievement system
- Social sharing of completion

### 6. Content Migration Strategy

The frontend should support content from existing notebooks:

**Automated Extraction:**
- Parse existing .ipynb files
- Extract lesson content (markdown cells)
- Extract code examples (code cells)
- Extract exercise definitions
- Convert grading functions from Python to TypeScript/JavaScript
- Preserve formatting and structure

**Content Structure:**
```
/content
  /chapters
    /01-basic-prompt-structure
      - lesson.mdx
      - exercises.json
      - examples.json
    /02-being-clear-and-direct
      - lesson.mdx
      - exercises.json
      - examples.json
    ...
```

### 7. UI/UX Specifications

**Design Principles:**
- Clean, minimal interface focusing on content
- Consistent spacing and typography
- Clear visual hierarchy
- Generous white space
- Professional color palette (Anthropic brand colors)
- Smooth animations and transitions
- Immediate feedback for all interactions

**Component Specifications:**

**Homepage:**
- Hero section with course title and description
- Learning outcomes (4 bullet points)
- "Start Course" CTA button
- Course structure overview
- Testimonials or stats (optional)
- FAQ accordion

**Chapter Page Layout:**
```
[Sidebar Navigation]  [Main Content Area]  [Progress Panel]
- Course TOC          - Lesson content      - Chapter progress
- Current position    - Code examples       - Next steps
- Progress %          - Exercises           - Helpful links
                      - Playground
```

**Mobile Responsive:**
- Hamburger menu for navigation
- Collapsible sections
- Touch-friendly buttons
- Optimized code editor for mobile
- Swipe gestures for navigation

### 8. Performance Requirements

- Initial page load: < 2 seconds
- Code execution feedback: < 3 seconds (API dependent)
- Smooth 60fps animations
- Optimized images and assets
- Lazy loading for chapters
- Service worker for offline access (optional)
- SEO optimized with proper meta tags

### 9. Security & Privacy

- API keys never logged or exposed
- HTTPS only
- Input sanitization
- Rate limiting per user
- CORS properly configured
- CSP headers
- No tracking without consent
- Optional anonymous usage analytics

### 10. Testing Requirements

- Unit tests for components
- Integration tests for API calls
- E2E tests for critical user flows
- Accessibility testing
- Cross-browser testing
- Mobile device testing
- Performance testing

### 11. Documentation Needs

- README with setup instructions
- Component documentation
- API documentation
- Deployment guide
- User guide
- Contribution guidelines
- Architecture decision records

### 12. Deployment

**Hosting Recommendations:**
- Vercel or Netlify (for Next.js)
- CloudFlare Pages
- AWS Amplify

**Environment Variables:**
```
ANTHROPIC_API_KEY_PROXY_SECRET=xxx
DATABASE_URL=xxx
NEXT_PUBLIC_APP_URL=xxx
NEXT_PUBLIC_ENABLE_DEMO_MODE=true
```

**CI/CD:**
- Automated testing on PR
- Preview deployments
- Automated deployment on main branch
- Performance monitoring

## Success Criteria

The frontend is considered successful when:

1. **Functionality:**
   - All 9 chapters are accessible and interactive
   - All exercises can be completed and graded
   - Playground works for experimentation
   - API integration is reliable
   - Progress is saved and persistent

2. **Usability:**
   - Users can complete the course without confusion
   - Navigation is intuitive
   - Feedback is immediate and helpful
   - Mobile experience is smooth
   - Accessibility score is 90+

3. **Performance:**
   - Page loads are fast
   - No blocking interactions
   - API responses are handled gracefully
   - No memory leaks

4. **Quality:**
   - Code is maintainable and documented
   - Tests cover critical paths
   - No security vulnerabilities
   - Error handling is comprehensive

## Phase 1 Implementation Priority

For MVP (Minimum Viable Product), focus on:

1. **Core Navigation:**
   - Homepage
   - Chapter list
   - Basic chapter navigation

2. **Single Chapter Template:**
   - Lesson display (markdown rendering)
   - 1-2 interactive examples
   - 1-2 exercises with grading
   - Basic playground

3. **Essential Features:**
   - API key input and storage
   - Claude API integration
   - Basic progress tracking (localStorage)
   - Responsive layout

4. **Chapter 1 Complete:**
   - Full content migration of Chapter 1
   - All exercises working
   - All examples interactive

## Reference Materials

- **Current Tutorial:** Jupyter notebooks in `/Anthropic 1P/` directory
- **Google Sheets Version:** https://docs.google.com/spreadsheets/d/19jzLgRruG9kjUQNKtCg1ZjdD6l6weA6qRXG5zLIAhC8/
- **Anthropic API Docs:** https://docs.anthropic.com/
- **Claude System Prompts:** https://docs.anthropic.com/claude/docs/how-to-use-system-prompts
- **Messages API:** https://docs.anthropic.com/claude/reference/messages_post

## Questions to Clarify

Before starting implementation, clarify:

1. **Authentication:** User accounts required or just API key storage?
2. **Hosting:** Preferred hosting platform?
3. **Branding:** Access to Anthropic brand guidelines and assets?
4. **Analytics:** Preferred analytics tool?
5. **Budget:** Any constraints on third-party services?
6. **Timeline:** Expected completion date?
7. **Team:** How many developers? Frontend only or full-stack?
8. **Content Updates:** Will content be updated frequently? Need CMS?

## Next Steps

1. Review and approve this specification
2. Set up project repository with chosen stack
3. Create design mockups/wireframes
4. Implement Phase 1 MVP
5. User testing with pilot group
6. Iterate based on feedback
7. Launch remaining chapters
8. Continuous improvement based on usage data

---

**Note:** This specification is comprehensive and covers all aspects of building a production-ready frontend. Start with Phase 1 MVP and iterate based on user feedback and priorities.
