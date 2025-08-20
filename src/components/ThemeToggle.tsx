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
    <div className="inline-flex items-center gap-0.5 rounded-md border border-slate-200 bg-white/70 p-0.5 text-xs shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/60">
      <button
        className={`inline-flex items-center rounded px-1.5 py-1 transition-colors ${
          theme === 'light'
            ? 'bg-slate-100 text-primary dark:bg-slate-800'
            : 'hover:bg-slate-100 dark:hover:bg-slate-800'
        }`}
        title="Light"
        onClick={() => handleChange('light')}
        aria-pressed={theme === 'light'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0-1.414 1.414M7.05 16.95l-1.414 1.414M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"
          />
        </svg>
      </button>
      <button
        className={`inline-flex items-center rounded px-1.5 py-1 transition-colors ${
          theme === 'system'
            ? 'bg-slate-100 text-primary dark:bg-slate-800'
            : 'hover:bg-slate-100 dark:hover:bg-slate-800'
        }`}
        title="System"
        aria-label="Theme: System"
        onClick={() => handleChange('system')}
        aria-pressed={theme === 'system'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <circle cx="12" cy="12" r="4" strokeWidth="1.8" />
        </svg>
      </button>
      <button
        className={`inline-flex items-center rounded px-1.5 py-1 transition-colors ${
          theme === 'dark'
            ? 'bg-slate-100 text-primary dark:bg-slate-800'
            : 'hover:bg-slate-100 dark:hover:bg-slate-800'
        }`}
        title="Dark"
        onClick={() => handleChange('dark')}
        aria-pressed={theme === 'dark'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
          />
        </svg>
      </button>
    </div>
  );
}
