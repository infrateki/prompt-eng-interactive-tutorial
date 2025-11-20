'use client';

import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Target, Zap, Award, ArrowRight } from 'lucide-react';
import ChapterCard from '@/components/ChapterCard';
import { chapters } from '@/lib/chapters';
import { useProgressStore } from '@/lib/store';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const completedChapters = useProgressStore((state) => state.completedChapters);
  const apiKey = useProgressStore((state) => state.apiKey);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const beginnerChapters = chapters.filter((c) => c.difficulty === 'beginner');
  const intermediateChapters = chapters.filter((c) => c.difficulty === 'intermediate');
  const advancedChapters = chapters.filter((c) => c.difficulty === 'advanced');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-purple-200 dark:border-purple-800"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Interactive Tutorial
              </span>
            </motion.div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-extrabold">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Master Prompt Engineering
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Learn to craft perfect prompts for Claude AI with hands-on exercises and real-time validation
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 pt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
              >
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {chapters.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Chapters</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
              >
                <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                  <Target className="w-5 h-5 text-pink-600" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {chapters.reduce((sum, c) => sum + c.exercises.length, 0)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Exercises</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
              >
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {completedChapters.size}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
                </div>
              </motion.div>
            </div>

            {/* CTA */}
            {!apiKey && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-8"
              >
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-100 dark:bg-amber-900/30 border-2 border-amber-300 dark:border-amber-700 rounded-xl">
                  <Zap className="w-5 h-5 text-amber-600" />
                  <span className="text-sm font-semibold text-amber-800 dark:text-amber-400">
                    Set your API key in Settings to start learning!
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl w-fit mb-4">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Interactive Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Test your prompts in real-time with Claude AI and get instant feedback on your solutions.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl w-fit mb-4">
              <Target className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Guided Exercises
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Practice with carefully crafted exercises that build your skills progressively.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl w-fit mb-4">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Track Progress
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor your learning journey with automatic progress tracking and achievements.
            </p>
          </div>
        </motion.div>

        {/* Beginner Chapters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-6 mb-16"
        >
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Beginner
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beginnerChapters.map((chapter, index) => (
              <ChapterCard key={chapter.id} chapter={chapter} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Intermediate Chapters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-6 mb-16"
        >
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Intermediate
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {intermediateChapters.map((chapter, index) => (
              <ChapterCard key={chapter.id} chapter={chapter} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Advanced Chapters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Advanced
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedChapters.map((chapter, index) => (
              <ChapterCard key={chapter.id} chapter={chapter} index={index} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="mb-2">
              Based on Anthropic's official Prompt Engineering Tutorial
            </p>
            <p className="text-sm">
              Built with Next.js, Tailwind CSS, and powered by Claude AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
