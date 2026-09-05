'use client';

import { useEffect, useRef, useState } from 'react';

// 站内搜索：构建时生成的 public/search-index.json 由前端拉取，按当前语言过滤。
interface SearchEntry {
  title: string;
  description: string;
  category: string;
  type: string;
  locale: string;
  url: string;
}

export function Search({ locale, placeholder }: { locale: string; placeholder: string }) {
  const [query, setQuery] = useState('');
  const [entries, setEntries] = useState<SearchEntry[]>([]);
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/search-index.json')
      .then((r) => r.json())
      .then((data: SearchEntry[]) => setEntries(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults([]);
      return;
    }
    const hits = entries
      .filter((e) => e.locale === locale)
      .filter((e) => `${e.title} ${e.description} ${e.category}`.toLowerCase().includes(q))
      .slice(0, 8);
    setResults(hits);
  }, [query, entries, locale]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div className="search" ref={boxRef}>
      <input
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
      />
      {open && results.length > 0 ? (
        <ul className="search-results">
          {results.map((r) => (
            <li key={r.url}>
              <a href={r.url} onClick={() => setOpen(false)}>
                <span className="sr-title">{r.title}</span>
                <span className="sr-desc">{r.description}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
