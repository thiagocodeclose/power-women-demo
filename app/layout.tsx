// @ts-nocheck
import type { Metadata } from "next";

import { Garrison365LivePreview } from "@/components/Garrison365LivePreview";
import { TemplateSiteAdapter } from "@/components/TemplateSiteAdapter";
import { buildCssVars, getGarrison365Config } from "@/lib/garrison365-config";
export const metadata: Metadata = {
  title: "POWER Women's Gym — Strength & Empowerment Training | Brooklyn, NY",
  description:
    "Brooklyn's premier women's strength gym. Train strong, build confidence, and join a community of women who lift each other up — literally.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cfg = await getGarrison365Config();
  const vars = buildCssVars(cfg?.brand);
  return (
    <html lang="en" style={vars as React.CSSProperties}>
      <body>
        {children}
        <TemplateSiteAdapter />
        <Garrison365LivePreview />
      </body>
    </html>
  );
}
