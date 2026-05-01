import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "POWER Women's Gym — Strength & Empowerment Training | Brooklyn, NY",
  description:
    "Brooklyn's premier women's strength gym. Train strong, build confidence, and join a community of women who lift each other up — literally.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
