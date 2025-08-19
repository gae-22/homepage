'use client';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const stored = (localStorage.getItem('theme') as Theme) || 'system';
    setTheme(stored);
    applyTheme(stored);
  }, []);

  function applyTheme(next: Theme) {
    const root = document.documentElement;
    const isDark =
      next === 'dark' ||
      (next === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    root.classList.toggle('dark', isDark);
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }

  function handleChange(next: Theme) {
    setTheme(next);
    localStorage.setItem('theme', next);
    applyTheme(next);
  }

  return (
    <div className="inline-flex items-center rounded-md border border-slate-200 bg-white p-0.5 text-xs dark:border-slate-700 dark:bg-slate-900">
      <button
        className={`rounded px-2 py-1 ${theme === 'light' ? 'bg-slate-100 dark:bg-slate-800' : ''}`}
        onClick={() => handleChange('light')}
        aria-pressed={theme === 'light'}
      >
        Light
      </button>
      <button
        className={`rounded px-2 py-1 ${theme === 'system' ? 'bg-slate-100 dark:bg-slate-800' : ''}`}
        onClick={() => handleChange('system')}
        aria-pressed={theme === 'system'}
      >
        Auto
      </button>
      <button
        className={`rounded px-2 py-1 ${theme === 'dark' ? 'bg-slate-100 dark:bg-slate-800' : ''}`}
        onClick={() => handleChange('dark')}
        aria-pressed={theme === 'dark'}
      >
        Dark
      </button>
    </div>
  );
}
