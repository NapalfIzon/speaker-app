import "./globals.css";

export const metadata = {
  title: "Speaker app - test",
  description: "This is a speaker app. Have fun!",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
