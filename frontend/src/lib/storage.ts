/**
 * Local storage utilities for persisting user data
 */

import { UserProgress, UserPreferences, PlaygroundHistoryEntry } from '@/types';
import { safeJSONParse } from './utils';

const STORAGE_KEYS = {
  API_KEY: 'pet_api_key',
  PROGRESS: 'pet_progress',
  PREFERENCES: 'pet_preferences',
  PLAYGROUND_HISTORY: 'pet_playground_history',
} as const;

/**
 * Storage class with encryption and error handling
 */
class Storage {
  private isAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Simple encryption/decryption (base64 encoding)
   * Note: In production, use a proper encryption library
   */
  private encrypt(value: string): string {
    return btoa(value);
  }

  private decrypt(value: string): string {
    try {
      return atob(value);
    } catch {
      return '';
    }
  }

  // API Key Management
  setApiKey(apiKey: string): void {
    if (!this.isAvailable()) return;
    const encrypted = this.encrypt(apiKey);
    localStorage.setItem(STORAGE_KEYS.API_KEY, encrypted);
  }

  getApiKey(): string | null {
    if (!this.isAvailable()) return null;
    const encrypted = localStorage.getItem(STORAGE_KEYS.API_KEY);
    if (!encrypted) return null;
    return this.decrypt(encrypted);
  }

  clearApiKey(): void {
    if (!this.isAvailable()) return;
    localStorage.removeItem(STORAGE_KEYS.API_KEY);
  }

  hasApiKey(): boolean {
    return this.getApiKey() !== null;
  }

  // User Progress
  setProgress(progress: UserProgress): void {
    if (!this.isAvailable()) return;
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  }

  getProgress(): UserProgress | null {
    if (!this.isAvailable()) return null;
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (!data) return null;
    return safeJSONParse<UserProgress>(data, null as unknown as UserProgress);
  }

  clearProgress(): void {
    if (!this.isAvailable()) return;
    localStorage.removeItem(STORAGE_KEYS.PROGRESS);
  }

  // User Preferences
  setPreferences(preferences: UserPreferences): void {
    if (!this.isAvailable()) return;
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
  }

  getPreferences(): UserPreferences | null {
    if (!this.isAvailable()) return null;
    const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    if (!data) return null;
    return safeJSONParse<UserPreferences>(data, this.getDefaultPreferences());
  }

  getDefaultPreferences(): UserPreferences {
    return {
      theme: 'system',
      fontSize: 'medium',
      autoSavePrompts: true,
      showHintsAutomatically: false,
      enableSoundEffects: true,
      enableAnimations: true,
    };
  }

  // Playground History
  addToPlaygroundHistory(entry: PlaygroundHistoryEntry): void {
    if (!this.isAvailable()) return;
    const history = this.getPlaygroundHistory();
    const updated = [entry, ...history].slice(0, 50); // Keep last 50 entries
    localStorage.setItem(STORAGE_KEYS.PLAYGROUND_HISTORY, JSON.stringify(updated));
  }

  getPlaygroundHistory(): PlaygroundHistoryEntry[] {
    if (!this.isAvailable()) return [];
    const data = localStorage.getItem(STORAGE_KEYS.PLAYGROUND_HISTORY);
    if (!data) return [];
    return safeJSONParse<PlaygroundHistoryEntry[]>(data, []);
  }

  clearPlaygroundHistory(): void {
    if (!this.isAvailable()) return;
    localStorage.removeItem(STORAGE_KEYS.PLAYGROUND_HISTORY);
  }

  // Clear all data
  clearAll(): void {
    if (!this.isAvailable()) return;
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
}

export const storage = new Storage();
