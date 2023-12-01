export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col bg-bgcolor text-txtcolor flex-1 h-full">
        <div className="flex flex-col container mx-auto flex-1">
          <div className="mt-10 mb-6 h-12 bg-slate-800">
            header
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
