// @ts-nocheck
"use client";

import Script from "next/script";

const BASE =
  process.env.NEXT_PUBLIC_CODEGYM_URL || "https://app.garrison365.com";
const SLUG = process.env.NEXT_PUBLIC_GYM_SLUG;

export function TemplateSiteAdapter() {
  if (!SLUG) return null;

  return (
    <Script
      src={`${BASE}/widgets/loader.js`}
      strategy="afterInteractive"
      data-gym={SLUG}
      data-template-site="true"
      data-floating-only="true"
    />
  );
}
