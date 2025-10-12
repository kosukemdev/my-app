import BlogAppSessionProvider from "./providers/SessionProvider";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BlogAppSessionProvider>{children}</BlogAppSessionProvider>;
}
