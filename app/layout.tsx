import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@radix-ui/themes/styles.css';
import "./globals.css";
import NavBar from "@/app/NavBar";
import {Container, Theme, ThemePanel} from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Issue Tracker project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Theme appearance="light" accentColor="violet">
        <NavBar/>
        <Container>
          <main className="p-5">
            {children}
          </main>
        </Container>
      </Theme>
      </body>
    </html>
  );
}
