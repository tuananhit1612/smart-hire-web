"use client";

import { installMockInterceptor } from "@/shared/lib/mock-interceptor";
import { useEffect } from "react";

/**
 * Client-side component that initializes the mock API interceptor.
 * Only enable this for static/demo deployments. Production and normal local
 * development should call the real backend API.
 */
export function MockInit() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENABLE_MOCK_API !== "true") {
      return;
    }

    installMockInterceptor();
  }, []);

  return null;
}
