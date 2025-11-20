import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prompt Engineering Interactive Tutorial | Anthropic",
  description: "Learn how to engineer optimal prompts within Claude through interactive lessons and exercises.",
  keywords: ["prompt engineering", "Claude", "Anthropic", "AI", "tutorial", "interactive learning"],
  authors: [{ name: "Anthropic" }],
  openGraph: {
    title: "Prompt Engineering Interactive Tutorial",
    description: "Master the art of prompt engineering with Claude through hands-on exercises",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
