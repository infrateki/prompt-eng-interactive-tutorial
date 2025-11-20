'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
import { chapters } from '@/lib/chapters';
import Playground from '@/components/Playground';
import Exercise from '@/components/Exercise';
import { useProgressStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ChapterPage() {
  const params = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const slug = params.slug as string;
  const chapter = chapters.find((c) => c.slug === slug);

  const completedChapters = useProgressStore((state) => state.completedChapters);
  const toggleChapterComplete = useProgressStore((state) => state.toggleChapterComplete);
  const setCurrentChapter = useProgressStore((state) => state.setCurrentChapter);

  useEffect(() => {
    setMounted(true);
    if (chapter) {
      setCurrentChapter(chapter.id);
    }
  }, [chapter, setCurrentChapter]);

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Chapter not found
          </h1>
          <Link
            href="/"
            className="text-purple-600 hover:text-purple-700 font-semibold"
          >
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  if (!mounted) return null;

  const isCompleted = completedChapters.has(chapter.id);
  const nextChapter = chapter.nextChapter
    ? chapters.find((c) => c.id === chapter.nextChapter)
    : null;
  const previousChapter = chapter.previousChapter
    ? chapters.find((c) => c.id === chapter.previousChapter)
    : null;

  const difficultyColors = {
    beginner: 'from-green-500 to-emerald-500',
    intermediate: 'from-yellow-500 to-orange-500',
    advanced: 'from-red-500 to-pink-500',
    appendix: 'from-purple-500 to-indigo-500',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          {/* Breadcrumb */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-6 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Chapters
          </Link>

          {/* Title Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                Chapter {chapter.id}
              </span>
              <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-800 dark:text-purple-400 rounded-full text-xs font-semibold uppercase">
                {chapter.difficulty}
              </span>
              {isCompleted && (
                <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    Completed
                  </span>
                </div>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
              {chapter.title}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {chapter.description}
            </p>
          </div>

          {/* Progress Bar */}
          <div className={`h-2 w-full bg-gradient-to-r ${difficultyColors[chapter.difficulty]} rounded-full mt-6`} />
        </motion.div>

        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <BookOpen className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Introduction
              </h2>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {chapter.content.introduction}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Key Points */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Key Points
          </h2>
          <div className="grid gap-4">
            {chapter.content.keyPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 flex-1">{point}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Examples */}
        {chapter.content.examples.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Examples
            </h2>
            <div className="space-y-6">
              {chapter.content.examples.map((example, index) => (
                <Playground
                  key={example.id}
                  title={example.title}
                  initialPrompt={example.prompt}
                  initialSystemPrompt={example.systemPrompt}
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* Exercises */}
        {chapter.exercises.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Exercises
            </h2>
            <div className="space-y-8">
              {chapter.exercises.map((exercise, index) => (
                <Exercise key={exercise.id} exercise={exercise} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Mark Complete Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <button
            onClick={() => toggleChapterComplete(chapter.id)}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3 ${
              isCompleted
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border-2 border-green-400 dark:border-green-600'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg'
            }`}
          >
            <CheckCircle2 className="w-6 h-6" />
            {isCompleted ? 'Chapter Completed!' : 'Mark Chapter as Complete'}
          </button>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {previousChapter ? (
            <Link
              href={`/chapter/${previousChapter.slug}`}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              <div className="text-left">
                <div className="text-xs text-gray-500 dark:text-gray-400">Previous</div>
                <div className="text-sm">{previousChapter.title}</div>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextChapter && (
            <Link
              href={`/chapter/${nextChapter.slug}`}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              <div className="text-right">
                <div className="text-xs text-purple-100">Next</div>
                <div className="text-sm">{nextChapter.title}</div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
}
