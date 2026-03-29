"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to the console just in case
    console.error("CV Render Error:", error);
  }, [error]);

  return (
    <div style={{ padding: "40px", fontFamily: "monospace", color: "red", backgroundColor: "white", width: "100%", height: "100vh" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Something went wrong during CV Render!</h2>
      <div style={{ marginBottom: "10px" }}>
        <strong>Message:</strong> {error.message}
      </div>
      {error.digest && (
        <div style={{ marginBottom: "10px" }}>
          <strong>Digest:</strong> {error.digest}
        </div>
      )}
      <div style={{ marginTop: "20px" }}>
        <strong>Stack Trace:</strong>
        <pre style={{ 
          marginTop: "10px", 
          padding: "15px", 
          backgroundColor: "#f5f5f5", 
          color: "#333", 
          overflowX: "auto",
          whiteSpace: "pre-wrap",
          wordBreak: "break-all"
        }}>
          {error.stack}
        </pre>
      </div>
    </div>
  );
}
