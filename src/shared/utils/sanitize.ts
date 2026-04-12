/**
 * ═══════════════════════════════════════════════════════════
 *  HTML Sanitizer — wraps DOMPurify for safe rendering
 *
 *  Use this whenever you need to render user-generated HTML
 *  via dangerouslySetInnerHTML to prevent XSS attacks.
 * ═══════════════════════════════════════════════════════════
 */

import DOMPurify from "dompurify";

/**
 * Sanitize an HTML string, removing any potentially dangerous
 * elements/attributes (scripts, event handlers, iframes, etc.)
 *
 * Allowed: standard formatting tags (p, b, i, ul, ol, li, a, h1–h6, br, span, div, strong, em, table, etc.)
 * Blocked: script, iframe, object, embed, form, input, on* attributes
 */
export function sanitizeHtml(dirty: string): string {
    if (typeof window === "undefined") {
        // SSR fallback — strip all html tags on the server
        return dirty.replace(/<[^>]*>/g, "");
    }

    return DOMPurify.sanitize(dirty, {
        ALLOWED_TAGS: [
            "p", "br", "b", "i", "u", "s", "em", "strong", "small",
            "h1", "h2", "h3", "h4", "h5", "h6",
            "ul", "ol", "li",
            "a", "span", "div", "blockquote", "pre", "code",
            "table", "thead", "tbody", "tr", "th", "td",
            "img", "hr", "sup", "sub",
        ],
        ALLOWED_ATTR: [
            "href", "target", "rel", "class", "style",
            "src", "alt", "width", "height",
            "colspan", "rowspan",
        ],
        // Force all links to open in new tab safely
        ADD_ATTR: ["target"],
        FORBID_TAGS: ["script", "iframe", "object", "embed", "form", "input", "textarea", "select", "button"],
        FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "onfocus", "onblur"],
    });
}
