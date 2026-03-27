"use client";

import React, { useRef, useCallback, useState, useEffect } from "react";
import { cn } from "@/shared/utils/cn";

/* ─────────────────────────────────────────────────────────── */
/*  EditableText — inline WYSIWYG text editing on CV preview  */
/*                                                             */
/*  CARET-JUMP FIX: The DOM is the source of truth while the  */
/*  element is focused. We only sync from `value` prop → DOM   */
/*  when the element is NOT focused, preventing React from     */
/*  resetting the caret position on every keystroke.           */
/*                                                             */
/*  IME FIX (Vietnamese, Chinese, Japanese, Korean):           */
/*  We track composition state and suppress ALL external       */
/*  updates while the IME is composing. onChange is only       */
/*  called on blur, never during composition.                  */
/* ─────────────────────────────────────────────────────────── */

export interface EditableTextProps {
    /** Current text value */
    value: string;
    /** Called when user finishes editing (blur / Enter for single-line) */
    onChange: (newValue: string) => void;
    /** Allow multi-line editing? (uses div instead of span) */
    multiline?: boolean;
    /** Placeholder shown when value is empty */
    placeholder?: string;
    /** Extra class names — the component inherits the template's styling */
    className?: string;
    /** HTML tag to render. Defaults to span (single-line) or div (multiline) */
    as?: React.ElementType;
}

export const EditableText = React.memo(function EditableText({
    value,
    onChange,
    multiline = false,
    placeholder = "Click to edit…",
    className,
    as,
}: EditableTextProps) {
    const ref = useRef<HTMLElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    // ── IME Composition tracking ──
    // True while the browser's IME is composing (Vietnamese, CJK, etc.)
    // We MUST NOT touch the DOM or fire onChange during this window.
    const isComposingRef = useRef(false);

    // Track whether this is the first render to set initial text
    const initializedRef = useRef(false);

    // Keep latest onChange in a ref so we never stale-close over it
    const onChangeRef = useRef(onChange);

    // Keep latest value in a ref for blur comparison
    const valueRef = useRef(value);

    useEffect(() => {
        onChangeRef.current = onChange;
        valueRef.current = value;
    }, [onChange, value]);

    // Determine which HTML tag to render
    const Tag = (as ?? (multiline ? "div" : "span")) as React.ElementType;

    /* ── Sync value → DOM only when NOT focused & NOT composing ── */
    useEffect(() => {
        if (!ref.current) return;
        if (isFocused) return;          // Never touch the DOM while user is typing
        if (isComposingRef.current) return; // Never touch the DOM during IME

        const current = ref.current.innerText.trim();
        const incoming = (value ?? "").trim();

        // Only update if value actually changed (avoids flicker)
        if (current !== incoming) {
            ref.current.innerText = value || "";
        }
    }, [value, isFocused]);

    /* ── Set initial content on mount ─────────────────────── */
    useEffect(() => {
        if (initializedRef.current) return;
        if (!ref.current) return;
        initializedRef.current = true;
        ref.current.innerText = value || "";
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    /* ── IME composition handlers ─────────────────────────── */
    const handleCompositionStart = useCallback(() => {
        isComposingRef.current = true;
    }, []);

    const handleCompositionEnd = useCallback(() => {
        isComposingRef.current = false;
        // After composition finishes, the final text is in the DOM.
        // We do NOT call onChange here — we wait for blur to commit.
    }, []);

    /* ── Commit text on blur ──────────────────────────────── */
    const handleBlur = useCallback(() => {
        isComposingRef.current = false; // Safety reset
        setIsFocused(false);
        if (!ref.current) return;
        const newText = ref.current.innerText.trim();
        if (newText !== valueRef.current) {
            onChangeRef.current(newText);
        }
    }, []);

    /* ── Keyboard handling ────────────────────────────────── */
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            // Never intercept keys during IME composition
            if (isComposingRef.current) return;

            if (e.key === "Enter" && !multiline) {
                e.preventDefault();
                ref.current?.blur();
            }
            if (e.key === "Escape") {
                // Revert on Escape
                if (ref.current) ref.current.innerText = valueRef.current;
                ref.current?.blur();
            }
        },
        [multiline],
    );

    const handleFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const isEmpty = !value || value.trim().length === 0;

    return (
        <Tag
            ref={ref}
            contentEditable
            suppressContentEditableWarning
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            className={cn(
                // Base — transparent, inherits font styles
                "outline-none transition-all duration-150 cursor-text",
                // Hover indicator: subtle dashed border
                "hover:ring-2 hover:ring-blue-300/60 hover:ring-offset-1 rounded-sm",
                // Focus: solid ring
                isFocused && "ring-2 ring-blue-500/70 ring-offset-1 bg-blue-50/30",
                // Empty placeholder styling
                isEmpty && !isFocused && "text-gray-400 italic",
                // Multiline padding
                multiline && "whitespace-pre-wrap",
                className,
            )}
            style={{ minWidth: "2rem", minHeight: "1em" }}
            data-placeholder={isEmpty && !isFocused ? placeholder : undefined}
        >
            {/* 
              Empty initial children — content is managed via useEffect
              and innerText. This prevents React from fighting with
              contentEditable for DOM ownership.
            */}
        </Tag>
    );
});
