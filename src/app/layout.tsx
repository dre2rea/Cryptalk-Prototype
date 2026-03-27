import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cryptalk",
  description: "Korean cryptocurrency insights platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}` }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if("scrollRestoration" in history){history.scrollRestoration="manual"}var n=performance.getEntriesByType&&performance.getEntriesByType("navigation");if(n&&n[0]&&n[0].type==="reload"){window.scrollTo(0,0)}}catch(e){}`,
          }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sarpanch:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
