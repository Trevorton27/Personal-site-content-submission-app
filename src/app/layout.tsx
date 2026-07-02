import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppProviders } from "@/components/AppProviders";
import TopBar from "@/components/TopBar";
import FooterBar from "@/components/FooterBar";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Personal Website Builder",
  description:
    "Fill in your content and design preferences to generate a customized AI prompt for your personal website.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider  afterSignUpUrl="/">
      <html lang="en" suppressHydrationWarning>
        <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased min-h-screen">
          <AppProviders>
            <TopBar />
            {children}
            <FooterBar />
          </AppProviders>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
