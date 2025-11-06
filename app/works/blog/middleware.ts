export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/new/:path*", "/edit/:path*", "/delete/:path*", "/drafts/:path*"],
};
