"use client";

/**
 * ═══════════════════════════════════════════════════════════
 *  useJobFilters — URL ↔ state two-way sync with debounce
 *
 *  Reads initial state from URL search params.
 *  Pushes state changes back to URL via router.replace().
 *  Debounces text inputs (keyword / location) by 400ms.
 * ═══════════════════════════════════════════════════════════
 */

import { useState, useCallback, useRef, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export interface JobFiltersState {
  keyword: string;
  location: string;
  tags: string[]; // UI filter chips (e.g. "Full-time", "Senior")
  page: number; // 1-based for display
}

const DEBOUNCE_MS = 400;

export function useJobFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // ── Initialize from URL ──────────────────────────────
  const [keyword, setKeywordState] = useState(
    () => searchParams.get("q") ?? ""
  );
  const [location, setLocationState] = useState(
    () => searchParams.get("location") ?? ""
  );
  const [tags, setTagsState] = useState<string[]>(() => {
    const raw = searchParams.get("tags");
    return raw ? raw.split(",").filter(Boolean) : [];
  });
  const [page, setPageState] = useState(() => {
    const p = searchParams.get("page");
    return p ? Math.max(1, parseInt(p, 10) || 1) : 1;
  });

  // ── URL push helper ──────────────────────────────────
  const pushToUrl = useCallback(
    (overrides: Partial<JobFiltersState>) => {
      const next = {
        keyword: overrides.keyword ?? keyword,
        location: overrides.location ?? location,
        tags: overrides.tags ?? tags,
        page: overrides.page ?? page,
      };

      const params = new URLSearchParams();
      if (next.keyword) params.set("q", next.keyword);
      if (next.location) params.set("location", next.location);
      if (next.tags.length > 0) params.set("tags", next.tags.join(","));
      if (next.page > 1) params.set("page", String(next.page));

      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [keyword, location, tags, page, pathname, router]
  );

  // ── Debounce timer for text inputs ───────────────────
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedPush = useCallback(
    (overrides: Partial<JobFiltersState>) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        pushToUrl({ ...overrides, page: 1 });
      }, DEBOUNCE_MS);
    },
    [pushToUrl]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  // ── Public setters ───────────────────────────────────
  const setKeyword = useCallback(
    (val: string) => {
      setKeywordState(val);
      setPageState(1);
      debouncedPush({ keyword: val });
    },
    [debouncedPush]
  );

  const setLocation = useCallback(
    (val: string) => {
      setLocationState(val);
      setPageState(1);
      debouncedPush({ location: val });
    },
    [debouncedPush]
  );

  const toggleTag = useCallback(
    (tag: string) => {
      setTagsState((prev) => {
        const next = prev.includes(tag)
          ? prev.filter((t) => t !== tag)
          : [...prev, tag];
        setPageState(1);
        pushToUrl({ tags: next, page: 1 });
        return next;
      });
    },
    [pushToUrl]
  );

  const setPage = useCallback(
    (p: number) => {
      setPageState(p);
      pushToUrl({ page: p });
    },
    [pushToUrl]
  );

  const resetFilters = useCallback(() => {
    setKeywordState("");
    setLocationState("");
    setTagsState([]);
    setPageState(1);
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  return {
    keyword,
    location,
    tags,
    page,
    setKeyword,
    setLocation,
    toggleTag,
    setPage,
    resetFilters,
  } as const;
}
