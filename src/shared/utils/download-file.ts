/**
 * ═══════════════════════════════════════════════════════════
 *  Download File Utility
 *
 *  Trigger browser download given a Blob payload.
 * ═══════════════════════════════════════════════════════════
 */

export function downloadBlob(blob: Blob, filename: string) {
    // Create a temporary URL
    const url = window.URL.createObjectURL(new Blob([blob]));
    
    // Create a hidden link
    const link = document.createElement("a");
    link.href = url;
    
    // Set the filename
    link.setAttribute("download", filename);
    
    // Add to body, click, and clean up
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
}
