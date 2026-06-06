// @ts-nocheck
import type { Metadata } from "next";

import { Garrison365LivePreview } from "@/components/Garrison365LivePreview";
import { TemplateSiteAdapter } from "@/components/TemplateSiteAdapter";
import { buildCssVars, getGarrison365Config } from "@/lib/garrison365-config";
export const metadata: Metadata = {
  title: "POWER Pilates — Athletic Reformer Pilates Studio",
  description:
    "A high-energy reformer Pilates studio template built for athletic sculpt classes, intro offers, booking CTAs, and premium local conversion.",
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
