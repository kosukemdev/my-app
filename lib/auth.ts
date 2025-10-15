import { NextAuthOptions } from "next-auth";
import githubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    githubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],  
}

export default authOptions;