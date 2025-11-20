'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle2, Lock } from 'lucide-react';
import { Chapter } from '@/types/tutorial';
import { useProgressStore } from '@/lib/store';

interface ChapterCardProps {
  chapter: Chapter;
  index: number;
}

export default function ChapterCard({ chapter, index }: ChapterCardProps) {
  const completedChapters = useProgressStore((state) => state.completedChapters);
  const completedExercises = useProgressStore((state) => state.completedExercises);

  const isCompleted = completedChapters.has(chapter.id);
  const completedExCount = chapter.exercises.filter((ex) =>
    completedExercises.has(ex.id)
  ).length;

  const difficultyColors = {
    beginner: 'from-green-500 to-emerald-500',
    intermediate: 'from-yellow-500 to-orange-500',
    advanced: 'from-red-500 to-pink-500',
    appendix: 'from-purple-500 to-indigo-500',
  };

  const difficultyBadgeColors = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    appendix: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Link href={`/chapter/${chapter.slug}`}>
        <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 border-2 ${
          isCompleted ? 'border-green-400 dark:border-green-600' : 'border-gray-200 dark:border-gray-700'
        }`}>
          {/* Header with gradient */}
          <div className={`h-2 w-full bg-gradient-to-r ${difficultyColors[chapter.difficulty]} rounded-full mb-4`} />

          <div className="space-y-4">
            {/* Title and Badge */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                    Chapter {chapter.id}
                  </span>
                  {isCompleted && (
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {chapter.title}
                </h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyBadgeColors[chapter.difficulty]}`}>
                {chapter.difficulty}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {chapter.description}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {chapter.exercises.length} exercise{chapter.exercises.length !== 1 ? 's' : ''}
                </span>
                {completedExCount > 0 && (
                  <span className="text-green-600 dark:text-green-400 font-semibold">
                    {completedExCount}/{chapter.exercises.length} completed
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold group-hover:gap-3 transition-all">
                <span className="text-sm">Start</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
