'use client';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export type ThemeChoice = 'light' | 'dark' | 'system';
export function applySiteTheme(choice: ThemeChoice) {
  const resolved =
    choice === 'system'
      ? matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : choice;
  document.documentElement.dataset.siteThemeChoice = choice;
  document.documentElement.dataset.siteTheme = resolved;
  try {
    localStorage.setItem('rossenaar-theme', choice);
  } catch {
    /* The control still works without storage. */
  }
}
export function useSiteTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [choice, setChoice] = useState<ThemeChoice>('system');
  useEffect(() => {
    const sync = () => {
      const root = document.documentElement;
      setTheme(root.dataset.siteTheme === 'dark' ? 'dark' : 'light');
      const preference = root.dataset.siteThemeChoice;
      setChoice(
        preference === 'dark' || preference === 'light' ? preference : 'system',
      );
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-site-theme', 'data-site-theme-choice'],
    });
    return () => observer.disconnect();
  }, []);
  return { theme, choice, setChoice: applySiteTheme };
}
export function ThemeToggle() {
  const { theme, setChoice } = useSiteTheme();
  const dark = theme === 'dark';
  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)');
    const followSystem = () => {
      if (document.documentElement.dataset.siteThemeChoice === 'system')
        applySiteTheme('system');
    };
    const followStorage = (event: StorageEvent) => {
      if (event.key !== 'rossenaar-theme') return;
      applySiteTheme(
        event.newValue === 'light' || event.newValue === 'dark'
          ? event.newValue
          : 'system',
      );
    };
    media.addEventListener('change', followSystem);
    window.addEventListener('storage', followStorage);
    return () => {
      media.removeEventListener('change', followSystem);
      window.removeEventListener('storage', followStorage);
    };
  }, []);
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={
        dark ? 'Lichte weergave inschakelen' : 'Donkere weergave inschakelen'
      }
      aria-pressed={dark}
      onClick={() => setChoice(dark ? 'light' : 'dark')}
      title={dark ? 'Lichte weergave' : 'Donkere weergave'}
    >
      <Sun size={17} className="theme-sun" />
      <Moon size={16} className="theme-moon" />
    </button>
  );
}
