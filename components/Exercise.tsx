'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Loader2, CheckCircle2, XCircle, Lightbulb, Award } from 'lucide-react';
import { useProgressStore } from '@/lib/store';
import { Exercise as ExerciseType } from '@/types/tutorial';

interface ExerciseProps {
  exercise: ExerciseType;
}

export default function Exercise({ exercise }: ExerciseProps) {
  const [prompt, setPrompt] = useState(exercise.initialPrompt || '');
  const [systemPrompt, setSystemPrompt] = useState(exercise.initialSystemPrompt || '');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [validationResult, setValidationResult] = useState<boolean | null>(null);

  const apiKey = useProgressStore((state) => state.apiKey);
  const completedExercises = useProgressStore((state) => state.completedExercises);
  const toggleExerciseComplete = useProgressStore((state) => state.toggleExerciseComplete);

  const isCompleted = completedExercises.has(exercise.id);

  const runExercise = async () => {
    if (!apiKey) {
      setError('Please set your API key in the settings first!');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');
    setValidationResult(null);

    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          systemPrompt: systemPrompt || undefined,
          apiKey,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      setResponse(data.response);

      // Validate the response
      try {
        const validateFn = eval(exercise.validateFunction);
        const isValid = validateFn(data.response);
        setValidationResult(isValid);

        if (isValid && !isCompleted) {
          toggleExerciseComplete(exercise.id);
        }
      } catch (err) {
        console.error('Validation error:', err);
        setValidationResult(false);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    hard: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-6 border-2 transition-all ${
        isCompleted
          ? 'border-green-400 dark:border-green-600'
          : 'border-gray-200 dark:border-gray-700'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {exercise.title}
            </h3>
            {isCompleted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full"
              >
                <Award className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                  Completed
                </span>
              </motion.div>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-300">{exercise.description}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            difficultyColors[exercise.difficulty]
          }`}
        >
          {exercise.difficulty}
        </span>
      </div>

      {/* System Prompt Field */}
      {exercise.initialSystemPrompt !== undefined && (
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            System Prompt
          </label>
          <textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="Enter system prompt..."
            className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 font-mono text-sm"
            rows={3}
          />
        </div>
      )}

      {/* Prompt Field */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 font-mono text-sm"
          rows={6}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={runExercise}
          disabled={loading || !prompt}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Test Solution
            </>
          )}
        </button>

        {exercise.hint && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-6 py-3 bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50 text-amber-800 dark:text-amber-400 font-semibold rounded-xl transition-all flex items-center gap-2"
          >
            <Lightbulb className="w-5 h-5" />
            {showHint ? 'Hide' : 'Show'} Hint
          </button>
        )}
      </div>

      {/* Hint Display */}
      <AnimatePresence>
        {showHint && exercise.hint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-amber-900 dark:text-amber-300 text-sm leading-relaxed">
                {exercise.hint}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-4"
        >
          <p className="text-red-800 dark:text-red-300 font-medium">{error}</p>
        </motion.div>
      )}

      {/* Response and Validation */}
      {response && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          {/* Validation Result */}
          {validationResult !== null && (
            <div
              className={`flex items-center gap-3 p-4 rounded-xl ${
                validationResult
                  ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800'
              }`}
            >
              {validationResult ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-green-800 dark:text-green-300">
                      Excellent! Exercise completed! 🎉
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-400">
                      Your solution passed all validation checks.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-red-800 dark:text-red-300">
                      Not quite right yet
                    </p>
                    <p className="text-sm text-red-700 dark:text-red-400">
                      Try adjusting your prompt and run it again.
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Response */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Claude's Response
            </label>
            <div className="bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
                {response}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
