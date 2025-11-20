import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Target, Award, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Prompt Engineering Interactive Tutorial
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Master the art of prompt engineering with Claude through hands-on exercises and interactive lessons
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/chapters/01-basic-prompt-structure">
              <Button size="lg" className="gap-2">
                <Sparkles className="w-5 h-5" />
                Start Learning
              </Button>
            </Link>
            <Link href="/chapters">
              <Button size="lg" variant="outline">
                View All Chapters
              </Button>
            </Link>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <BookOpen className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Prompt Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Master the basic structure of a good prompt and understand how to format your requests effectively
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Target className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Best Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Learn the '80/20' techniques to address common failure modes and optimize your prompts
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Sparkles className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Claude's Capabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Understand Claude's strengths and weaknesses to leverage them effectively in your applications
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Real-World Use Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Build strong prompts from scratch for common industry use cases and practical applications
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Course Structure */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Course Structure</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600 dark:text-green-400">Beginner</CardTitle>
                <CardDescription>Chapters 1-3</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Basic Prompt Structure</li>
                  <li>• Being Clear and Direct</li>
                  <li>• Assigning Roles</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-yellow-600 dark:text-yellow-400">Intermediate</CardTitle>
                <CardDescription>Chapters 4-7</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Separating Data from Instructions</li>
                  <li>• Formatting Output</li>
                  <li>• Thinking Step by Step</li>
                  <li>• Using Examples</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600 dark:text-red-400">Advanced</CardTitle>
                <CardDescription>Chapters 8-9 + Appendix</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Avoiding Hallucinations</li>
                  <li>• Complex Prompts</li>
                  <li>• Advanced Techniques</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Ready to Get Started?</CardTitle>
              <CardDescription>
                This course features 9 chapters with hands-on exercises and an interactive playground
                to practice your prompt engineering skills.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/chapters/01-basic-prompt-structure">
                <Button size="lg" className="w-full">
                  Begin Chapter 1: Basic Prompt Structure
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
