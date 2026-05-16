"use client";

import { installMockInterceptor } from "@/shared/lib/mock-interceptor";
import { useEffect } from "react";

/**
 * Client-side component that initializes the mock API interceptor.
 * Only used in the gh-pages-demo branch for static site deployment.
 */
export function MockInit() {
  useEffect(() => {
    installMockInterceptor();
  }, []);

  return null;
}
