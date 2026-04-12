"use client";

import { useEffect } from "react";
import { installMockInterceptor } from "@/shared/lib/mock-interceptor";

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
