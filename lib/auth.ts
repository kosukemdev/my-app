import { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import githubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    githubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
};

export default authOptions;

// Safe wrapper for getServerSession used in server components/pages.
export async function safeGetServerSession(options = authOptions) {
  try {
    // Note: getServerSession can throw if providers are misconfigured in some setups.
    return await getServerSession(options as NextAuthOptions);
  } catch (err) {
    console.error("safeGetServerSession: failed to get session", err);
    return null;
  }
}